# Projet Fullstack - Express + React

## Description

Application web fullstack utilisant Express.js pour le backend et React pour le frontend.

## Technologies

### Backend
- **Node.js** - Environnement d'exécution JavaScript
- **Express.js** - Framework web pour Node.js
- **JSON** - Base de données locale pour le stockage des films

### Frontend
- **React** - Bibliothèque JavaScript pour l'interface utilisateur
- **TypeScript** - Langage typé basé sur JavaScript

### BDD
- **JSON** - Utilisé pour stocker les données des movies dans le backend
- **MongoDB** - Utilisé pour stocker les données des utilisateurs dans le backend

## Installation et exécution (Ordre à suivre)

### BDD
- Docker est requis pour MongoDB. Assurez-vous d'avoir Docker installé et en cours d'exécution sur votre machine.
- Créer une image MongoDB en local avant de démarrer le backend. Vous pouvez utiliser la commande suivante pour lancer MongoDB avec Docker:
```bash
docker run -d -p 27017:27017 --name mongodb mongo
```
- Pour le démarrer :
```bash
docker start mongodb
```
- Pour voir s'il tourne toujours :
```bash
docker ps
```
- Pour arrêter MongoDB :
```bash
docker stop mongodb
```
- Pour supprimer MongoDB :
```bash
docker rm -f mongodb

### Backend
```bash
cd backend
npm install
node data/seed.js # Pour initialiser la base de données avec des données de test
npm start
```

- **Port**: 3001, http://localhost:3001

### Frontend
```bash
cd frontend
npm install
npm start
```

- **Port**: 5000, http://localhost:5000

## Tests

## Postman
- Importer le fichier `postman_crud_users.json` **à la racine de /backend** dans Postman pour tester les endpoints de l'API.
- Endpoints disponibles:
  - `GET /users` - Récupérer tous les utilisateurs
  - `GET /users/:id` - Récupérer un utilisateur par son ID
  - `POST /users` - Ajouter un nouvel utilisateur
  - `PUT /users/:id` - Mettre à jour un utilisateur
  - `DELETE /users/:id` - Supprimer un utilisateur