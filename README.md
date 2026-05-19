# NoteKeeper API

Une API REST pour gérer des notes personnelles, construite avec Node.js, Express et MongoDB.

Projet réalisé dans le cadre du titre professionnel **DWWM** pour valider la compétence CP6 (composants d'accès aux données NoSQL).

---

## Stack technique

- **Node.js** + **Express** — serveur et routage
- **MongoDB Atlas** + **Mongoose** — base de données et schéma
- **express-validator** — validation des données reçues
- **dotenv** — gestion des variables d'environnement

---

## Lancer le projet

1. Cloner le dépôt et installer les dépendances :
```bash
npm install
```

2. Créer un fichier `.env` à la racine :
```
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/notekeeper
PORT=3370
```

3. Démarrer le serveur :
```bash
node server.js
```

Le serveur écoute sur `http://localhost:3370`.

---

## Endpoints

| Méthode | Route | Description |
|---|---|---|
| GET | `/api/notes` | Récupérer toutes les notes |
| GET | `/api/notes/:id` | Récupérer une note par son id |
| POST | `/api/notes` | Créer une note |
| PUT | `/api/notes/:id` | Modifier une note |
| DELETE | `/api/notes/:id` | Supprimer une note |

### Corps attendu (POST / PUT)

```json
{
  "title": "Mon titre",
  "content": "Le contenu de la note",
  "author": "Alexis",
  "tags": ["javascript", "mongodb"]
}
```

### Codes HTTP retournés

| Situation | Code |
|---|---|
| Succès | `200 OK` |
| Note créée | `201 Created` |
| Données invalides / ID malformé | `400 Bad Request` |
| Note introuvable | `404 Not Found` |
| Erreur serveur | `500 Internal Server Error` |

---

## Validation des entrées

Toutes les données reçues en POST et PUT sont validées avant tout accès à la base :

- `title` — obligatoire, entre 3 et 100 caractères
- `content` — obligatoire, non vide
- `author` — obligatoire, non vide
- `tags` — optionnel, doit être un tableau

Si la validation échoue, l'API retourne un `400` avec le détail des erreurs. Aucune donnée invalide n'est jamais stockée en base.

---

## Structure du projet

```
├── controllers/
│   └── notesController.js
├── middlewares/
│   └── errorHandler.js
├── models/
│   └── Note.js
├── routes/
│   └── notes.js
├── .env
├── .gitignore
├── package.json
└── server.js
```

---

## État du projet

### Fonctionnalités implémentées

- [x] Serveur Express connecté à MongoDB Atlas
- [x] Schéma Mongoose (titre, contenu, auteur, tags, horodatage)
- [x] CRUD complet (GET, POST, PUT, DELETE)
- [x] Validation des entrées avec `express-validator`
- [x] Gestion des erreurs (400, 404, 500) et réponses toujours en JSON
- [x] Tests Postman sur l'ensemble des endpoints

### Fonctionnalités en attente de développement

- [ ] Filtrage des notes par tag ou par auteur
- [ ] Authentification JWT
- [ ] Tests automatisés
- [ ] Déploiement
