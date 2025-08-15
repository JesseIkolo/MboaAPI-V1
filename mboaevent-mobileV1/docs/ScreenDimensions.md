# Gestion des Dimensions d'Écran Dynamiques

Ce document explique comment utiliser le système de gestion des dimensions d'écran pour adapter dynamiquement la largeur des cartes et autres éléments de l'interface.

## 🎯 Objectif

Récupérer la largeur totale de l'écran et la stocker dans une variable globale accessible pour gérer dynamiquement la largeur des cartes selon la taille de l'écran.

## 📁 Structure des Fichiers

```
mboaevent-mobileV1/
├── hooks/
│   └── useScreenDimensions.js          # Hook principal
├── examples/
│   └── ScreenDimensionsExample.js      # Exemple d'utilisation
└── docs/
    └── ScreenDimensions.md             # Cette documentation
```

## 🚀 Utilisation

### 1. Import du Hook

```javascript
import { 
    useScreenDimensions, 
    getScreenWidth, 
    getScreenHeight, 
    calculateCardWidth, 
    calculateCardWidthByPercentage 
} from '../hooks/useScreenDimensions';
```

### 2. Dans un Composant React

```javascript
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useScreenDimensions, calculateCardWidthByPercentage } from '../hooks/useScreenDimensions';

const MonComposant = () => {
    // Récupération des dimensions en temps réel
    const screenDimensions = useScreenDimensions();
    
    return (
        <View style={styles.container}>
            {/* Votre contenu */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: calculateCardWidthByPercentage(90, 10), // 90% de la largeur d'écran
        // ... autres styles
    },
});
```

## 🔧 Fonctions Disponibles

### `useScreenDimensions()`
Hook React qui retourne les dimensions actuelles de l'écran et se met à jour automatiquement lors des changements (rotation, redimensionnement).

**Retourne :**
```javascript
{
    width: number,   // Largeur de l'écran en pixels
    height: number   // Hauteur de l'écran en pixels
}
```

### `getScreenWidth()`
Fonction utilitaire pour obtenir la largeur de l'écran sans utiliser de hook.

**Retourne :** `number` - Largeur de l'écran en pixels

### `getScreenHeight()`
Fonction utilitaire pour obtenir la hauteur de l'écran sans utiliser de hook.

**Retourne :** `number` - Hauteur de l'écran en pixels

### `calculateCardWidth(numberOfCards, gap, padding)`
Calcule la largeur optimale pour un nombre spécifique de cartes.

**Paramètres :**
- `numberOfCards` (number) : Nombre de cartes à afficher horizontalement
- `gap` (number, défaut: 10) : Espacement entre les cartes en pixels
- `padding` (number, défaut: 16) : Padding horizontal total en pixels

**Retourne :** `number` - Largeur calculée pour chaque carte

### `calculateCardWidthByPercentage(percentage, gap)`
Calcule la largeur des cartes basée sur un pourcentage de la largeur d'écran.

**Paramètres :**
- `percentage` (number) : Pourcentage de la largeur d'écran (0-100)
- `gap` (number, défaut: 10) : Espacement entre les cartes en pixels

**Retourne :** `number` - Largeur calculée pour chaque carte

## 📱 Exemples d'Utilisation

### Exemple 1 : Carte avec 80% de la largeur d'écran

```javascript
const styles = StyleSheet.create({
    card: {
        width: calculateCardWidthByPercentage(80, 10),
        height: 200,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
});
```

### Exemple 2 : Grille de 2 cartes par ligne

```javascript
const styles = StyleSheet.create({
    card: {
        width: calculateCardWidth(2, 10, 16), // 2 cartes, 10px de gap, 16px de padding
        height: 200,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
});
```

### Exemple 3 : Utilisation dans un ScrollView horizontal

```javascript
const styles = StyleSheet.create({
    scrollView: {
        paddingHorizontal: 8,
    },
    card: {
        width: calculateCardWidthByPercentage(85, 10),
        marginRight: 10,
        height: 200,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
});
```

## 🔄 Mise à Jour Automatique

Le système se met à jour automatiquement lors de :
- Rotation de l'appareil
- Changement de taille de fenêtre (tablette)
- Redimensionnement de l'écran

## 🎨 Intégration avec les Composants Existants

### Modification du Composant Event

```javascript
// Dans Event.js
import { calculateCardWidthByPercentage } from '../../../hooks/useScreenDimensions';

const styles = StyleSheet.create({
    contelement1: {
        width: calculateCardWidthByPercentage(85, 10), // 85% de la largeur
        height: 140,
        // ... autres propriétés
    },
    contelement2: {
        width: calculateCardWidthByPercentage(90, 10), // 90% de la largeur
        height: 'auto',
        // ... autres propriétés
    },
});
```

### Modification du Composant Accueil

```javascript
// Dans accueil.tsx
import { useScreenDimensions, calculateCardWidthByPercentage } from '../../hooks/useScreenDimensions';

const Accueil = () => {
    const screenDimensions = useScreenDimensions();
    
    return (
        <View style={styles.container}>
            {/* Votre contenu */}
        </View>
    );
};

const styles = StyleSheet.create({
    contelement2: {
        width: calculateCardWidthByPercentage(90, 10),
        // ... autres propriétés
    },
});
```

## 🧪 Test et Débogage

Utilisez le composant `ScreenDimensionsExample` pour tester et visualiser les différentes largeurs de cartes :

```javascript
import ScreenDimensionsExample from '../examples/ScreenDimensionsExample';

// Dans votre navigation ou composant de test
<ScreenDimensionsExample />
```

## 📋 Bonnes Pratiques

1. **Utilisez des pourcentages** pour les cartes principales (80-90%)
2. **Utilisez `calculateCardWidth`** pour les grilles avec un nombre fixe de colonnes
3. **Testez sur différents appareils** pour valider les dimensions
4. **Évitez les largeurs fixes** en pixels pour une meilleure adaptabilité
5. **Considérez les marges et paddings** dans vos calculs

## 🔧 Personnalisation

Vous pouvez modifier les valeurs par défaut dans le fichier `useScreenDimensions.js` :

```javascript
// Valeurs par défaut personnalisables
export const calculateCardWidth = (numberOfCards = 1, gap = 10, padding = 16) => {
    // Votre logique personnalisée
};
```

## 🐛 Dépannage

### Problème : Les dimensions ne se mettent pas à jour
**Solution :** Assurez-vous d'utiliser le hook `useScreenDimensions()` dans un composant React.

### Problème : Les cartes sont trop larges/étroites
**Solution :** Ajustez le pourcentage dans `calculateCardWidthByPercentage()` ou les paramètres de `calculateCardWidth()`.

### Problème : Problèmes de performance
**Solution :** Utilisez `getScreenWidth()` et `getScreenHeight()` pour les calculs statiques, et `useScreenDimensions()` uniquement quand vous avez besoin de réactivité.
