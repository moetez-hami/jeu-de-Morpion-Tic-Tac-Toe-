# jeu-de-Morpion-Tic-Tac-Toe-

Un projet web de jeu de Morpion développé avec **Laravel** pour le backend et **Angular** pour le frontend. Ce guide vous explique comment cloner, configurer et exécuter le projet.

---

## Prérequis

Avant de commencer, assurez-vous d'avoir les outils suivants installés sur votre machine :

- **PHP** (>=8.1)
- **Composer**
- **Node.js** (18.17.0)
- **npm** ou **yarn**
- **Angular CLI** (17.3.12)
- **MySQL** ou tout autre serveur compatible avec Laravel
- **Git**

---

## Installation

### 1. Cloner le dépôt
        - git clone https://github.com/moetez-hami/jeu-de-Morpion-Tic-Tac-Toe-.git
        - cd jeu-de-Morpion-Tic-Tac-Toe

### 2. Configurer le Backend (Laravel)
       1. Accédez au répertoire backend :
            cd morpion-backend
       2. Installez les dépendances PHP avec Composer :
            composer install
       3. Créez une base de données MySQL nommée **morpion**
       4. Exécutez les migrations pour créer les tables :
            php artisan migrate
       5. Lancez le serveur Laravel 
            php artisan serve

### 3. Configurer le Frontend (Angular)
        1. Accédez au répertoire frontend :
            cd morpion-frontend
        2. Installez les dépendances npm :
            npm install
        3. Installez Angular Material :
            ng add @angular/material
        4. Lancez le serveur Angular :
            ng serve

# Auteurs
  Moetez Hami - Ingénieur et Développeur Full-Stack
