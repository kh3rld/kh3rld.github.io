package handlers

import (
	"net/http"

	"github.com/kh3rld/portfolio/internal/utils"
)

func HomeHandler(w http.ResponseWriter, r *http.Request) {
	data := struct {
		Title string
	}{
		Title: "Kherld Hussein's Portfolio",
	}
	utils.RenderTemplate(w, "home.page.html", data)
}

func AboutHandler(w http.ResponseWriter, r *http.Request) {
	utils.RenderTemplate(w, "about.page.html", nil)
}

func BlogHandler(w http.ResponseWriter, r *http.Request) {
	utils.RenderTemplate(w, "blog.page.html", nil)
}

func ProjectHandler(w http.ResponseWriter, r *http.Request) {
	utils.RenderTemplate(w, "projects.page.html", nil)
}

func SkillsHandler(w http.ResponseWriter, r *http.Request) {
	utils.RenderTemplate(w, "skills.page.html", nil)
}

func ContactHandler(w http.ResponseWriter, r *http.Request) {
	utils.RenderTemplate(w, "contact.page.html", nil)
}

func NotFoundHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusNotFound)
	utils.RenderTemplate(w, "404.page.html", nil)
}
