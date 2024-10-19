package middleware

import (
	"net/http"

	"strings"

	"github.com/kh3rld/portfolio/internal/handlers"
)

var rts = map[string]bool{
	"/":         true,
	"/about":    true,
	"/blog":     true,
	"/projects": true,
	"/skills":   true,
	"/contact":  true,
}

// RouteChecker checks if a route exists before passing the request to the next handler.
func RouteChecker(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if strings.HasPrefix(r.URL.Path, "/static/") {
			next.ServeHTTP(w, r)
			return
		}

		if _, ok := rts[r.URL.Path]; !ok {
			handlers.NotFoundHandler(w, r)
			return
		}

		next.ServeHTTP(w, r)
	})
}
