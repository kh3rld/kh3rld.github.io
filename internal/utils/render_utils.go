package utils

import (
	"fmt"
	"html/template"
	"net/http"
)

// TemplateCache to hold precompiled templates
var TemplateCache = make(map[string]*template.Template)

// RenderServerErrorTemplate renders an error template with a status code and message
func RenderServerErrorTemplate(w http.ResponseWriter, statusCode int, errMsg string) {
	tmpl := `
    <!DOCTYPE html>
   <html><head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../web/static/css/404.css">
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

  <script src="../web/static/js/404.js">
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
