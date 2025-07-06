// Import du plugin React pour Vite
import react from "@vitejs/plugin-react";
// Import de la fonction defineConfig de Vite
import { defineConfig } from "vite";

// Configuration de Vite exportée par défaut
export default defineConfig({
	// Tableau des plugins Vite à utiliser
	plugins: [
		react(), // Plugin React pour supporter les fichiers JSX/TSX
	],

	// Configuration spécifique au serveur de développement
	server: {
		// Configuration du proxy pour les requêtes API
		proxy: {
			/**
			 * Proxy pour les routes de login:
			 * Toutes les requêtes vers /login seront redirigées vers http://localhost:3001
			 * Exemple:
			 * - Requête frontend: /login/user
			 * - Requête réelle: http://localhost:3001/login/user
			 */
			"/login": "http://localhost:3001",

			/**
			 * Proxy pour les routes utilisateurs:
			 * Toutes les requêtes vers /users seront redirigées
			 */
			"/users": "http://localhost:3001",

			/**
			 * Proxy pour les routes associations:
			 * Toutes les requêtes vers /associations seront redirigées
			 */
			"/associations": "http://localhost:3001",

			/**
			 * Proxy pour les routes animaux:
			 * Toutes les requêtes vers /pets seront redirigées
			 */
			"/pets": "http://localhost:3001",
		},
	},
});
