#!/bin/bash

# Script de déploiement pour MboaAPI sur VPS
# Usage: ./deploy.sh

set -e  # Arrêter en cas d'erreur

echo "🚀 Début du déploiement de MboaAPI..."

# Variables
PROJECT_NAME="mboaAPI"
GITHUB_REPO="https://github.com/JesseIkolo/MboaAPI-V1.git"
DEPLOY_DIR="/var/www/$PROJECT_NAME"
BACKUP_DIR="/var/www/backups"

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[$(date +'%Y-%m-%d %H:%M:%S')] WARNING: $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%Y-%m-%d %H:%M:%S')] ERROR: $1${NC}"
    exit 1
}

# Vérifier si on est root
if [ "$EUID" -ne 0 ]; then
    error "Ce script doit être exécuté en tant que root"
fi

# Créer le répertoire de sauvegarde
log "Création du répertoire de sauvegarde..."
mkdir -p $BACKUP_DIR

# Sauvegarder l'ancienne version si elle existe
if [ -d "$DEPLOY_DIR" ]; then
    log "Sauvegarde de l'ancienne version..."
    BACKUP_NAME="mboaAPI-backup-$(date +%Y%m%d-%H%M%S)"
    cp -r $DEPLOY_DIR $BACKUP_DIR/$BACKUP_NAME
    log "Sauvegarde créée: $BACKUP_DIR/$BACKUP_NAME"
    
    # Arrêter les services existants
    log "Arrêt des services existants..."
    pm2 stop mboa-api 2>/dev/null || true
    pm2 stop mboa-web 2>/dev/null || true
    pm2 delete mboa-api 2>/dev/null || true
    pm2 delete mboa-web 2>/dev/null || true
    
    # Supprimer l'ancien dossier
    log "Suppression de l'ancien dossier..."
    rm -rf $DEPLOY_DIR
fi

# Cloner le repository (branche main)
log "Clonage du repository (branche main)..."
git clone -b main $GITHUB_REPO $DEPLOY_DIR
log "Repository cloné dans $DEPLOY_DIR (branche main)"

# Aller dans le répertoire du projet
cd $DEPLOY_DIR

# Installer les dépendances du backend
log "Installation des dépendances backend..."
cd server
npm install --production
log "Dépendances backend installées"

# Installer les dépendances du frontend
log "Installation des dépendances frontend..."
cd ../mboawebapp
npm install
log "Dépendances frontend installées"

# Build du frontend
log "Build du frontend..."
npm run build
log "Frontend buildé avec succès"

# Retourner au répertoire principal
cd $DEPLOY_DIR

# Démarrer le backend avec PM2
log "Démarrage du backend..."
cd server
pm2 start server.js --name "mboa-api" --env production
log "Backend démarré avec PM2"

# Démarrer le frontend avec PM2
log "Démarrage du frontend..."
cd ../mboawebapp
pm2 start npm --name "mboa-web" -- start
log "Frontend démarré avec PM2"

# Sauvegarder la configuration PM2
log "Sauvegarde de la configuration PM2..."
pm2 save

# Vérifier le statut des services
log "Vérification du statut des services..."
pm2 status

# Nettoyer les anciennes sauvegardes (garder seulement les 5 plus récentes)
log "Nettoyage des anciennes sauvegardes..."
cd $BACKUP_DIR
ls -t | grep "mboaAPI-backup" | tail -n +6 | xargs -r rm -rf

log "✅ Déploiement terminé avec succès!"
log "📊 Statut des services:"
pm2 status

echo ""
echo "🌐 URLs d'accès:"
echo "   - Backend API: http://109.176.197.154:5000"
echo "   - Frontend: http://109.176.197.154:3000"
echo "   - Documentation API: http://109.176.197.154:5000/api-docs"
echo ""
echo "📝 Commandes utiles:"
echo "   - pm2 status          : Voir le statut des services"
echo "   - pm2 logs mboa-api   : Voir les logs du backend"
echo "   - pm2 logs mboa-web   : Voir les logs du frontend"
echo "   - pm2 restart all     : Redémarrer tous les services" 