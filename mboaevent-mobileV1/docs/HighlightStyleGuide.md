# Guide d'Utilisation du Style Highlight

Ce guide explique comment utiliser le style `Highlight` avec le composant `EventSectionBlock` pour les événements mis en avant.

## 🎯 Objectif

Le style `Highlight` est conçu pour mettre en valeur les événements les plus importants de l'application. Il offre une présentation plus visible et attractive que le style `Card` standard.

## 🎨 Caractéristiques du Style Highlight

### Visuelles
- **Cartes plus larges** : Utilise 98% de la largeur d'écran
- **Hauteur fixe** : 140px pour une présentation uniforme
- **Arrière-plan** : Fond bleu (#041578) par défaut
- **Texte blanc** : Contraste optimal pour la lisibilité

### Fonctionnelles
- **Indicateur de pagination** : Points de navigation automatiques
- **Défilement horizontal** : Navigation fluide entre les événements
- **Limitation d'événements** : Généralement 1-2 événements maximum
- **Pas de bouton "Voir tout"** : Focus sur l'événement principal

## 📱 Utilisation Recommandée

### Cas d'Usage Idéaux
1. **Événements mis en avant** - Les événements les plus importants
2. **Événements premium** - Événements VIP ou spéciaux
3. **Événements sponsorisés** - Contenu promotionnel
4. **Événements urgents** - Événements avec deadline proche

### Structure Recommandée
```javascript
<EventSectionBlock
    title="Mis en avant"
    events={getEventsByCategory('featured')}
    navigation={navigation}
    styleType="Highlight"
    showViewAll={false}        // Pas de bouton "Voir tout"
    maxEvents={2}              // Maximum 2 événements
/>
```

## 🔧 Configuration Optimale

### Propriétés Recommandées
```javascript
const highlightConfig = {
    styleType: "Highlight",           // Style obligatoire
    showViewAll: false,               // Pas de bouton "Voir tout"
    maxEvents: 2,                     // Limite recommandée
    horizontalScroll: true,           // Défilement horizontal
    showHorizontalIndicator: true,    // Indicateur visible
};
```

### Données Recommandées
```javascript
const featuredEvent = {
    id: 'featured-1',
    title: "Titre accrocheur et court",
    date: '29 Dec 2023',
    location: 'Lieu principal',
    // ... autres propriétés
};
```

## 📊 Comparaison des Styles

| Aspect | Style Card | Style Highlight |
|--------|------------|-----------------|
| **Largeur** | 90% de l'écran | 98% de l'écran |
| **Hauteur** | Auto | 140px fixe |
| **Arrière-plan** | Blanc | Bleu (#041578) |
| **Pagination** | Non | Oui (automatique) |
| **Bouton "Voir tout"** | Oui | Non (recommandé) |
| **Nombre d'événements** | Illimité | 1-2 recommandé |
| **Usage** | Liste générale | Mise en avant |

## 🎯 Exemples d'Implémentation

### Exemple 1: Événement Principal Unique
```javascript
<EventSectionBlock
    title="Événement Principal"
    events={getEventsByCategory('featured', 1)}
    navigation={navigation}
    styleType="Highlight"
    showViewAll={false}
    maxEvents={1}
/>
```

### Exemple 2: Deux Événements Mis en Avant
```javascript
<EventSectionBlock
    title="Mis en avant"
    events={getEventsByCategory('featured')}
    navigation={navigation}
    styleType="Highlight"
    showViewAll={false}
    maxEvents={2}
/>
```

### Exemple 3: Avec Gestionnaires Personnalisés
```javascript
<EventSectionBlock
    title="Événements Premium"
    events={getEventsByCategory('featured')}
    navigation={navigation}
    styleType="Highlight"
    onEventPress={(eventId) => {
        // Navigation spéciale pour les événements premium
        navigation.navigate('PremiumEventDetail', { eventId });
    }}
    showViewAll={false}
/>
```

### Exemple 4: Avec Styles Personnalisés
```javascript
<EventSectionBlock
    title="Événements VIP"
    events={getEventsByCategory('featured')}
    navigation={navigation}
    styleType="Highlight"
    containerStyle={{
        backgroundColor: '#1a1a1a',
        borderRadius: 12,
        padding: 8,
    }}
    titleStyle={{
        color: '#FFD700',
        fontSize: 22,
        fontWeight: 'bold',
    }}
    showViewAll={false}
/>
```

## 🎨 Personnalisation Avancée

### Indicateur de Pagination Personnalisé
Le composant `PaginationIndicator` est automatiquement inclus pour les événements `Highlight` avec plus d'un événement.

```javascript
// Le composant gère automatiquement :
// - Affichage des points selon le nombre d'événements
// - Point actif plus large (39px vs 8px)
// - Couleurs personnalisables
```

### Styles CSS Personnalisés
```javascript
const customHighlightStyles = {
    container: {
        backgroundColor: '#1a1a1a',    // Fond sombre
        borderRadius: 12,              // Coins arrondis
        padding: 8,                    // Padding supplémentaire
    },
    title: {
        color: '#FFD700',              // Titre doré
        fontSize: 22,                  // Taille plus grande
        fontWeight: 'bold',            // Gras
    }
};
```

## 📋 Bonnes Pratiques

### ✅ À Faire
- Utiliser pour les événements vraiment importants
- Limiter à 1-2 événements maximum
- Désactiver le bouton "Voir tout"
- Utiliser des titres courts et accrocheurs
- Tester sur différents appareils

### ❌ À Éviter
- Utiliser pour des listes longues d'événements
- Activer le bouton "Voir tout" (sauf cas spécial)
- Utiliser des titres trop longs
- Ignorer les tests de responsive

## 🧪 Test et Validation

### Test de Responsive
```javascript
// Tester sur différentes tailles d'écran
const screenSizes = [
    { width: 375, height: 667 },   // iPhone SE
    { width: 414, height: 896 },   // iPhone 11 Pro Max
    { width: 768, height: 1024 },  // iPad
];
```

### Test de Performance
```javascript
// Limiter le nombre d'événements pour les performances
const maxEventsForPerformance = 2;
```

## 🔄 Intégration avec l'API

### Structure de Données Attendue
```javascript
// L'API devrait retourner des données dans ce format
const apiResponse = {
    featured: [
        {
            id: 'api-event-1',
            title: 'Titre de l\'événement',
            date: '2024-01-15',
            location: 'Lieu de l\'événement',
            // ... autres propriétés
        }
    ]
};
```

### Remplacement des Données Mockées
```javascript
// Dans mockEventData.js, remplacer par :
export const getEventsFromAPI = async () => {
    try {
        const response = await fetch('/api/events/featured');
        const data = await response.json();
        return data.featured;
    } catch (error) {
        console.error('Erreur API:', error);
        return mockEvents.featured; // Fallback vers les données mockées
    }
};
```

## 🐛 Dépannage

### Problème : L'indicateur de pagination ne s'affiche pas
**Solution :** Vérifiez que vous avez plus d'un événement et que `styleType="Highlight"`.

### Problème : Les cartes sont trop larges/étroites
**Solution :** Ajustez la largeur dans le composant `Event.js` pour le style `Highlight`.

### Problème : Le texte n'est pas lisible
**Solution :** Vérifiez que le contraste est suffisant entre le texte et l'arrière-plan.

### Problème : Performance lente
**Solution :** Limitez le nombre d'événements avec `maxEvents={2}`.
