package utils

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
	"path/filepath"
)

// TemplateCache to hold precompiled templates
var TemplateCache = make(map[string]*template.Template)
var fn = template.FuncMap{}

// RenderServerErrorTemplate renders an error template with a status code and message
func RenderServerErrorTemplate(w http.ResponseWriter, statusCode int, errMsg string) {
	tmpl := `
    <!DOCTYPE html>
   <html><head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../static/css/404.css">
<title>404 - Page Not Found | Kherld Hussein</title>
</head>
<body>
  <canvas class="matrix-bg" id="matrix"></canvas>
  <div class="container">
    <h1>404</h1>
    <p>Oops! Looks like this page got lost in the matrix...</p>
    <div class="error-code">
      <pre><code>
Traceback (most recent call last):
  File "reality.py", line 42, in <module>
    page = fetch_page(url)
  File "reality.py", line 13, in fetch_page
    return universe.get_page(url)
UniverseError: Page not found in this reality

Have you tried turning it off and on again?
      </code></pre>
    </div>
    <a href="/" class="home-button">Return to Home</a>
  </div>

  <script src="../static/js/404.js">
  </script>
</body>
</html>
	
	`

	// Parse the template
	t, err := template.New("error").Parse(tmpl)
	if err != nil {
		http.Error(w, fmt.Sprintf("Internal Server Error: %v", err), http.StatusInternalServerError)
		return
	}

	// Prepare the data to pass to the template
	data := struct {
		StatusCode int
		Error      string
	}{
		StatusCode: statusCode,
		Error:      errMsg,
	}

	// Set headers and write the response
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.WriteHeader(statusCode)

	// Execute the template
	if err := t.Execute(w, data); err != nil {
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
	}
}

// RenderTemplate renders a template with the given data
func RenderTemplate(w http.ResponseWriter, tmpl string, data interface{}) {
	// Check if the template is in the cache
	t, ok := TemplateCache[tmpl]
	if !ok {
		errMsg := fmt.Sprintf("Template %s not found", tmpl)
		log.Printf("ERROR: %s", errMsg)
		RenderServerErrorTemplate(w, http.StatusNotFound, errMsg)
		return
	}

	w.Header().Set("Content-Type", "text/html; charset=utf-8")

	// Execute the template
	err := t.Execute(w, data)
	if err != nil {
		errMsg := fmt.Sprintf("Error rendering template: %v", err)
		log.Printf("ERROR: %s", errMsg)
		RenderServerErrorTemplate(w, http.StatusInternalServerError, errMsg)
	}
}

// LoadTemplates loads and caches templates
func LoadTemplates() error {
	cache := map[string]*template.Template{}

	// Find the project root
	baseDir, err := FindProjectRoot("web", "templates")
	if err != nil {
		return fmt.Errorf("could not find project root: %v", err)
	}

	// Match all page templates
	tempDir := filepath.Join(baseDir, "*.page.html")
	pages, err := filepath.Glob(tempDir)
	if err != nil {
		return fmt.Errorf("error globbing templates: %v", err)
	}

	for _, page := range pages {
		name := filepath.Base(page)
		ts, err := template.New(name).Funcs(fn).ParseFiles(page) // Assuming 'fn' is your function map
		if err != nil {
			log.Printf("Error parsing template %s: %v", name, err)
			return fmt.Errorf("error parsing template: %s %v", name, err)
		}

		// Match layout files
		layoutPath := filepath.Join(baseDir, "*.layout.html")
		matches, err := filepath.Glob(layoutPath)
		if err != nil {
			return fmt.Errorf("error finding layout files: %v", err)
		}

		// Parse layout files if any exist
		if len(matches) > 0 {
			ts, err = ts.ParseGlob(layoutPath)
			if err != nil {
				return fmt.Errorf("error parsing layout files: %v", err)
			}
		}

		// Cache the compiled template
		cache[name] = ts
		log.Printf("Loaded template: %s", name) // Log successful load
	}

	// Assign the populated cache to the global variable
	TemplateCache = cache
	return nil
}
