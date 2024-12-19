package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	wrapper, err := Config()
	if err != nil {
		log.Fatalf("Configuration failed: %v", err)
	}

	server := &http.Server{
		Addr:    ":8080",
		Handler: wrapper,
	}

	fmt.Println("Server listening on http://localhost:8080")
	if err := server.ListenAndServe(); err != nil {
		log.Fatalln(err)
	}
}
