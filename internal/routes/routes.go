package routes

import (
	"net/http"

	"log"

	"github.com/kh3rld/portfolio/internal/handlers"
	"github.com/kh3rld/portfolio/internal/utils"
)

// InitRoutes initializes the application routes.
func InitRoutes(mux *http.ServeMux) {
	dir, err := utils.FindProjectRoot("web", "static")
	if err != nil {
		log.Fatalf("Could not find project root: %v", err) // Log and exit on error
	}
	// Serve static files
	fs := http.FileServer(http.Dir(dir))
	mux.Handle("/static/", http.StripPrefix("/static/", fs))

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		handlers.HomeHandler(w, r)
	})

	mux.HandleFunc("/about", func(w http.ResponseWriter, r *http.Request) {
		handlers.AboutHandler(w, r)
	})

	mux.HandleFunc("/blog", func(w http.ResponseWriter, r *http.Request) {
		handlers.BlogHandler(w, r)
	})
	mux.HandleFunc("/projects", func(w http.ResponseWriter, r *http.Request) {
		handlers.ProjectHandler(w, r)
	})
	mux.HandleFunc("/skills", func(w http.ResponseWriter, r *http.Request) {
		handlers.SkillsHandler(w, r)
	})

	mux.HandleFunc("/contact", func(w http.ResponseWriter, r *http.Request) {
		handlers.ContactHandler(w, r)
	})
}
