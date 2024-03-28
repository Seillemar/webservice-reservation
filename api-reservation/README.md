# Projet_Web_Service

# Installation

Créer un dossier /tmp

# Usage

```
curl -i http://192.168.0.18:3333/cinema ; echo ""

curl -i -X "POST" -H "Content-Type: application/json" --data '{"title":"titre","description":"description","release":"2023-01-01T00:00"}' http://192.168.0.18:3333/movies ; echo ""

curl -i http://192.168.0.18:3333/movies/titre ; echo ""
```