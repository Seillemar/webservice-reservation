# Projet_Web_Service

# Installation

Créer un dossier /tmp

# Usage

```
curl -i -X "POST" -H "Content-Type: application/json" --data "{\"uid\":\"1234\",\"title\":\"Pâté\"}" http://localhost:3333/cinema

curl -i http://localhost:3333/cinema

curl -i -X "POST" -H "Content-Type: application/json" --data "{\"uid\":\"1234\",\"name\":\"Salle 9 3\/4\",\"seats\":30}" http://localhost:3333/cinema/1234/rooms

curl -i -X "GET" http://localhost:3333/cinema/1234/rooms

curl -i -X "GET" http://localhost:3333/cinema/1234/rooms/1234
```