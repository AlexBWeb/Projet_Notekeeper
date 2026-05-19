# Cahier des charges — NoteKeeper API
### Projet Node.js + MongoDB · Dossier Professionnel DWWM · Alexis Foy

---

## Sommaire

1. [Présentation du projet](#1-présentation-du-projet)
2. [Contexte et objectifs](#2-contexte-et-objectifs)
3. [Stack technique](#3-stack-technique)
4. [Modèle de données](#4-modèle-de-données)
5. [Endpoints de l'API](#5-endpoints-de-lapi)
6. [CORE — Le minimum pour valider CP6](#6-core--le-minimum-pour-valider-cp6)
7. [BONUS — Pour aller plus loin](#7-bonus--pour-aller-plus-loin)
8. [Structure de fichiers recommandée](#8-structure-de-fichiers-recommandée)
9. [Ressources et documentation](#9-ressources-et-documentation)
10. [Ce que tu dois produire pour le dossier professionnel](#10-ce-que-tu-dois-produire-pour-le-dossier-professionnel)

---

## 1. Présentation du projet

**Nom du projet :** NoteKeeper API

**Description :** Une API REST permettant de gérer des notes personnelles. Chaque note peut avoir un titre, un contenu, des tags (étiquettes), et appartient à un utilisateur. L'API permet de créer, lire, modifier et supprimer des notes.

**Pourquoi ce projet ?**
MongoDB est particulièrement adapté à ce type de données : les notes peuvent avoir des structures variées (avec ou sans tags, contenu court ou long), ce qui illustre parfaitement l'avantage du format document NoSQL par rapport à une base relationnelle classique.

---

## 2. Contexte et objectifs

### Contexte pédagogique

Ce projet est réalisé dans le cadre de la validation du titre professionnel **Développeur Web et Web Mobile (DWWM)**. Il vient compléter le Dossier Professionnel en apportant un exemple concret de la **compétence CP6 : Développer des composants d'accès aux données SQL et NoSQL**.

Les projets existants (Pulsign et Formenscop) couvrent déjà le SQL. Ce projet apporte la preuve de maîtrise du **NoSQL avec MongoDB**.

### Compétence ciblée — CP6 (REAC DWWM)

Le référentiel exige que le candidat soit capable de :

- Coder les accès aux données (lecture, création, modification, suppression)
- Valider et contrôler toutes les entrées côté serveur
- Gérer les cas d'erreur et d'exception
- Maintenir l'intégrité et la confidentialité des données
- Réaliser des tests sur les composants
- Effectuer une veille sur les vulnérabilités NoSQL

### Objectifs du projet

- Créer une API REST fonctionnelle avec Node.js, Express et MongoDB
- Mettre en place un schéma de données avec Mongoose
- Implémenter le CRUD complet (GET, POST, PUT, DELETE)
- Valider les données reçues avant de les stocker
- Gérer les erreurs avec des réponses HTTP appropriées
- Tester les endpoints avec Postman
- Documenter le projet pour le dossier professionnel

---

## 3. Stack technique

| Outil | Rôle | Version conseillée |
|---|---|---|
| **Node.js** | Environnement d'exécution JavaScript | 20+ (LTS) |
| **Express** | Framework web pour créer l'API | 4.x |
| **MongoDB** | Base de données NoSQL (documents JSON) | Atlas (cloud gratuit) |
| **Mongoose** | Bibliothèque pour définir des schémas et interagir avec MongoDB | 8.x |
| **dotenv** | Gestion des variables d'environnement (secrets hors du code) | 16.x |
| **express-validator** | Validation des données reçues dans les requêtes | 7.x |
| **Postman** | Tester les endpoints de l'API manuellement | Gratuit |

> **Conseil débutant :** Utilise **MongoDB Atlas** (la version cloud gratuite) plutôt qu'une installation locale. Tu crées un compte sur [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas), tu obtiens une URL de connexion, et tu n'as rien à installer sur ta machine.

---

## 4. Modèle de données

L'API gère une seule collection MongoDB : **`notes`**.

### Schéma d'une note

```json
{
  "_id": "ObjectId généré automatiquement par MongoDB",
  "title": "Titre de la note (obligatoire)",
  "content": "Contenu de la note (obligatoire)",
  "tags": ["javascript", "mongodb"],
  "author": "Nom ou identifiant de l'auteur (obligatoire)",
  "createdAt": "Date de création (automatique)",
  "updatedAt": "Date de dernière modification (automatique)"
}
```

### Pourquoi ce schéma illustre bien le NoSQL ?

Avec une base relationnelle (MySQL, PostgreSQL), les tags nécessiteraient une table séparée et une table de jointure. Avec MongoDB, le tableau de tags est simplement **intégré dans le document**. C'est un avantage concret du modèle document à mentionner dans le dossier professionnel.

---

## 5. Endpoints de l'API

L'API expose les routes suivantes sur la ressource `/api/notes` :

| Méthode HTTP | Route | Description |
|---|---|---|
| `GET` | `/api/notes` | Récupérer toutes les notes |
| `GET` | `/api/notes/:id` | Récupérer une note par son identifiant |
| `POST` | `/api/notes` | Créer une nouvelle note |
| `PUT` | `/api/notes/:id` | Modifier une note existante |
| `DELETE` | `/api/notes/:id` | Supprimer une note |

### Exemples de réponses attendues

**Succès — GET `/api/notes/123`**
```json
{
  "success": true,
  "data": {
    "_id": "123",
    "title": "Ma première note",
    "content": "Contenu de la note",
    "tags": ["node", "mongodb"],
    "author": "Alexis",
    "createdAt": "2025-01-15T10:00:00Z"
  }
}
```

**Erreur — Note introuvable**
```json
{
  "success": false,
  "error": "Note introuvable"
}
```

**Erreur — Données invalides**
```json
{
  "success": false,
  "errors": [
    { "field": "title", "message": "Le titre est obligatoire" },
    { "field": "content", "message": "Le contenu est obligatoire" }
  ]
}
```

---

## 6. CORE — Le minimum pour valider CP6

> Ces tâches couvrent **tous les critères de performance** du REAC pour CP6. Si tu manques de temps, concentre-toi exclusivement sur cette section.

---

### CORE-1 · Mise en place de l'environnement

**Durée estimée : 1h**

- [x] Créer le dossier du projet et initialiser avec `npm init -y`
- [x] Installer les dépendances : `npm install express mongoose dotenv express-validator`
- [x] Créer un fichier `.env` à la racine contenant l'URL MongoDB Atlas et le port :
  ```
  MONGODB_URI=mongodb+srv://...
  PORT=3000
  ```
- [x] Créer un fichier `.gitignore` contenant au minimum :
  ```
  node_modules/
  .env
  ```
- [x] Créer le fichier de démarrage `server.js` qui lance Express et se connecte à MongoDB

> **Pourquoi `.gitignore` ?** C'est une bonne pratique de sécurité fondamentale : l'URL de connexion à la base de données contient un mot de passe. Elle ne doit jamais être publiée sur GitHub. C'est directement lié aux critères de confidentialité de CP6.

**Ressources :**
- [Démarrer avec Express](https://expressjs.com/fr/starter/hello-world.html)
- [Connexion Mongoose](https://mongoosejs.com/docs/connections.html)
- [MongoDB Atlas — Créer un cluster gratuit](https://www.mongodb.com/docs/atlas/getting-started/)

---

### CORE-2 · Définition du schéma Mongoose

**Durée estimée : 30 min**

- [x] Créer le dossier `models/` et le fichier `models/Note.js`
- [x] Définir le schéma Mongoose avec :
  - `title` : String, obligatoire, entre 3 et 100 caractères
  - `content` : String, obligatoire
  - `tags` : tableau de String (optionnel, vide par défaut)
  - `author` : String, obligatoire
  - Horodatage automatique avec l'option `{ timestamps: true }`

**Ressources :**
- [Définir un schéma Mongoose](https://mongoosejs.com/docs/guide.html)
- [Types de données Mongoose](https://mongoosejs.com/docs/schematypes.html)

---

### CORE-3 · CRUD complet (routes et contrôleurs)

**Durée estimée : 3h**

- [ ] Créer le dossier `routes/` et le fichier `routes/notes.js`
- [ ] Créer le dossier `controllers/` et le fichier `controllers/notesController.js`
- [ ] Implémenter les 5 fonctions du contrôleur :

**getAllNotes** — Récupère toutes les notes
```
GET /api/notes → 200 OK + liste des notes
```

**getNoteById** — Récupère une note par son `_id`
```
GET /api/notes/:id → 200 OK + la note
                   → 404 si la note n'existe pas
                   → 400 si l'id n'est pas un format valide
```

**createNote** — Crée une nouvelle note
```
POST /api/notes → 201 Created + la note créée
               → 400 si les données sont invalides
```

**updateNote** — Modifie une note existante
```
PUT /api/notes/:id → 200 OK + la note modifiée
                  → 404 si la note n'existe pas
                  → 400 si les données sont invalides
```

**deleteNote** — Supprime une note
```
DELETE /api/notes/:id → 200 OK + message de confirmation
                     → 404 si la note n'existe pas
```

**Ressources :**
- [Opérations CRUD avec Mongoose](https://mongoosejs.com/docs/queries.html)
- [Router Express](https://expressjs.com/fr/guide/routing.html)

---

### CORE-4 · Validation des entrées

**Durée estimée : 1h**

> C'est le critère le plus important de CP6 : *"Toutes les entrées sont contrôlées et validées dans les composants serveurs sécurisés."*

- [ ] Utiliser `express-validator` pour valider les données reçues dans POST et PUT :
  - `title` : présent et entre 3 et 100 caractères
  - `content` : présent et non vide
  - `author` : présent et non vide
  - `tags` : si présent, doit être un tableau (pas une chaîne de caractères)
- [ ] Si la validation échoue, retourner un `400 Bad Request` avec la liste des erreurs
- [ ] Ne jamais stocker en base des données non validées

**Ressources :**
- [express-validator — Guide de démarrage](https://express-validator.github.io/docs/guides/getting-started)

---

### CORE-5 · Gestion des erreurs

**Durée estimée : 1h**

- [ ] Gérer le cas où l'`_id` passé en paramètre n'est pas un ObjectId MongoDB valide (retourner `400`)
- [ ] Gérer le cas où la note n'est pas trouvée (retourner `404`)
- [ ] Créer un middleware de gestion d'erreur global dans `middlewares/errorHandler.js` qui intercepte toutes les erreurs non gérées et retourne un `500` propre
- [ ] Toujours retourner du JSON, jamais du HTML brut

> **Tableau des codes HTTP à utiliser :**
>
> | Situation | Code |
> |---|---|
> | Tout s'est bien passé | `200 OK` |
> | Ressource créée | `201 Created` |
> | Données invalides | `400 Bad Request` |
> | Non autorisé | `401 Unauthorized` |
> | Ressource introuvable | `404 Not Found` |
> | Erreur serveur imprévue | `500 Internal Server Error` |

**Ressources :**
- [Gestion des erreurs Express](https://expressjs.com/fr/guide/error-handling.html)

---

### CORE-6 · Tests avec Postman et jeu d'essai

**Durée estimée : 1h**

- [ ] Télécharger et installer [Postman](https://www.postman.com/downloads/)
- [ ] Tester chaque endpoint et capturer des **captures d'écran** pour le dossier professionnel
- [ ] Construire un jeu d'essai complet qui couvre au minimum :
  - Créer une note avec des données valides → vérifier `201`
  - Créer une note avec un titre manquant → vérifier `400` + message d'erreur
  - Récupérer toutes les notes → vérifier `200` + liste
  - Récupérer une note par son id → vérifier `200`
  - Récupérer une note avec un id inexistant → vérifier `404`
  - Modifier une note → vérifier `200` + données mises à jour
  - Supprimer une note → vérifier `200`

> **Conseil :** Dans Postman, tu peux sauvegarder toutes tes requêtes dans une **Collection** et l'exporter en JSON. Ce fichier peut être joint en annexe du dossier professionnel comme preuve.

---

### CORE-7 · Documentation de la veille technologique

**Durée estimée : 30 min**

Le REAC exige : *"Un système de veille permet de suivre les évolutions technologiques et les problématiques de sécurité liées aux bases de données NoSQL."*

- [ ] Rédiger un court paragraphe (une demi-page) sur :

  **Sujet 1 — Injection NoSQL**
  Contrairement au SQL, MongoDB n'est pas vulnérable aux injections SQL classiques. Mais il existe des injections spécifiques NoSQL (ex : envoyer `{ "$gt": "" }` dans un champ de login pour contourner l'authentification). La parade : toujours valider et typer les entrées, ne jamais passer des objets JSON bruts non vérifiés directement à Mongoose.

  **Sujet 2 — Exposition des données**
  Par défaut, Mongoose retourne tous les champs d'un document, y compris des champs sensibles potentiels. Bonne pratique : utiliser `.select('-champSensible')` pour exclure les champs à ne pas exposer.

**Ressources :**
- [OWASP — Injection NoSQL](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/07-Input_Validation_Testing/05.6-Testing_for_NoSQL_Injection)
- [MongoDB Security Checklist](https://www.mongodb.com/docs/manual/administration/security-checklist/)

---

## 7. BONUS — Pour aller plus loin

> Ces tâches enrichissent le projet et le dossier professionnel, mais ne sont pas indispensables pour valider CP6. À faire si tu as du temps.

---

### BONUS-1 · Filtrage et recherche

- [ ] Permettre de filtrer les notes par tag via un paramètre de requête : `GET /api/notes?tag=javascript`
- [ ] Permettre de filtrer par auteur : `GET /api/notes?author=Alexis`

Cela montre la puissance des requêtes MongoDB avec des critères sur des tableaux, impossible à faire aussi simplement en SQL.

**Ressource :** [Mongoose — Filtres de requête](https://mongoosejs.com/docs/queries.html)

---

### BONUS-2 · Authentification JWT

- [ ] Installer `jsonwebtoken` et `bcryptjs`
- [ ] Créer une collection `users` avec un schéma email + mot de passe haché
- [ ] Créer deux routes : `POST /api/auth/register` et `POST /api/auth/login`
- [ ] Générer un token JWT à la connexion
- [ ] Protéger les routes de création, modification et suppression : seul un utilisateur connecté peut les utiliser

> **Attention :** Cette tâche est plus complexe. Ne la commence que si CORE-1 à CORE-7 sont terminés.

**Ressource :** [Tutorial JWT + Express (en français)](https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs)

---

### BONUS-3 · Tests automatisés

- [ ] Installer `jest` et `supertest`
- [ ] Écrire 3 tests automatisés :
  - Test 1 : `POST /api/notes` avec données valides → doit retourner `201`
  - Test 2 : `POST /api/notes` avec titre manquant → doit retourner `400`
  - Test 3 : `GET /api/notes/:id` avec id inexistant → doit retourner `404`

Cela couvre le critère CP6 : *"Les tests unitaires et de sécurité sont associés à chaque composant."*

**Ressource :** [Supertest — Tester une API Express](https://github.com/ladjs/supertest#readme)

---

### BONUS-4 · Déploiement

- [ ] Déployer l'API gratuitement sur **Render** ou **Railway**
- [ ] Configurer les variables d'environnement (MONGODB_URI, PORT) sur la plateforme

Cela permet d'avoir une URL publique à mentionner dans le dossier professionnel.

**Ressource :** [Déployer Node.js sur Render](https://render.com/docs/deploy-node-express-app)

---

## 8. Structure de fichiers recommandée

```
notekeeper-api/
│
├── controllers/
│   └── notesController.js     ← Les fonctions CRUD (logique métier)
│
├── middlewares/
│   └── errorHandler.js        ← Gestion centralisée des erreurs
│   └── validate.js            ← Middleware de validation (express-validator)
│
├── models/
│   └── Note.js                ← Schéma Mongoose de la note
│
├── routes/
│   └── notes.js               ← Définition des routes /api/notes
│
├── .env                       ← Variables secrètes (NE PAS COMMITTER)
├── .gitignore                 ← Ignore node_modules/ et .env
├── package.json
├── README.md                  ← Documentation du projet
└── server.js                  ← Point d'entrée : Express + connexion MongoDB
```

---

## 9. Ressources et documentation

### Pour débuter

- [Node.js — Documentation officielle (FR)](https://nodejs.org/fr/docs)
- [Express.js — Guide de démarrage (FR)](https://expressjs.com/fr/starter/installing.html)
- [Mongoose — Documentation (EN)](https://mongoosejs.com/docs/guide.html)
- [MongoDB Atlas — Tutoriel de démarrage (EN)](https://www.mongodb.com/docs/atlas/getting-started/)

### Tutoriels complets recommandés

- [Build a REST API with Node, Express and MongoDB — Traversy Media (YouTube, EN)](https://www.youtube.com/watch?v=vjf774RKrLc) *(très bon pour débuter)*
- [CRUD API Node + MongoDB en français — Grafikart](https://grafikart.fr/) *(chercher "Node MongoDB")*

### Outils

- [Postman](https://www.postman.com/downloads/) — Tester les endpoints
- [MongoDB Compass](https://www.mongodb.com/products/compass) — Visualiser les données dans MongoDB (interface graphique)

---

## 10. Ce que tu dois produire pour le dossier professionnel

Une fois le projet terminé, voici les éléments à rédiger pour l'exemple AT2 du dossier professionnel :

### Éléments obligatoires

- [ ] **Contexte** : présenter brièvement le projet et son objectif (gestion de notes, MongoDB, Node.js)
- [ ] **Justification du choix NoSQL** : expliquer pourquoi MongoDB est adapté à ce cas (structure variable des notes, tableaux de tags intégrés)
- [ ] **Schéma du modèle de données** : reproduire le schéma Mongoose (une capture d'écran ou le code commenté)
- [ ] **Extraits de code commentés** : montrer au moins un exemple de chaque opération CRUD avec des explications
- [ ] **Jeu d'essai** : inclure les captures Postman (données en entrée, réponse attendue, réponse obtenue) — le jury vérifie que tu as testé des cas valides ET des cas d'erreur
- [ ] **Gestion des erreurs** : montrer un exemple de retour `400` (validation) et `404` (ressource introuvable)
- [ ] **Paragraphe de veille** : les deux points rédigés en CORE-7 (injection NoSQL + exposition des données)

### Angle à valoriser dans le dossier

Conclure par une **comparaison SQL vs NoSQL** sur ce cas d'usage : mentionner que Formenscop utilise MySQL (relationnel) et que ce projet utilise MongoDB (documentaire), et expliquer les différences de modélisation pour les tags (table de jointure SQL vs tableau intégré MongoDB). Cela montre au jury que tu comprends les deux approches et sais choisir la bonne technologie selon le contexte.
