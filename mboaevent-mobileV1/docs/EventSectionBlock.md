# EventSectionBlock - Composant de Section d'Événements

Le composant `EventSectionBlock` est un composant réutilisable qui affiche une section d'événements avec un titre, une liste d'événements et un bouton "Voir tout" optionnel.

## 🎯 Objectif

Transformer les blocs d'événements répétitifs en un composant réutilisable qui prend en compte une liste d'événements obtenue du mock par contexte.

## 📁 Structure des Fichiers

```
mboaevent-mobileV1/
├── assets/component/Globals Components/
│   ├── EventSectionBlock.js          # Composant principal
│   ├── mockEventData.js              # Données mockées
│   └── Event.js                      # Composant Event existant
├── examples/
│   └── EventSectionBlockExample.js   # Exemples d'utilisation
└── docs/
    └── EventSectionBlock.md          # Cette documentation
```

## 🚀 Utilisation de Base

### Import du Composant

```javascript
import EventSectionBlock from '../../assets/component/Globals Components/EventSectionBlock';
import { getEventsByCategory } from '../../assets/component/Globals Components/mockEventData';
```

### Utilisation Simple

```javascript
<EventSectionBlock
    title="Nouveautés"
    events={getEventsByCategory('nouveautes')}
    navigation={navigation}
    styleType="Card"
/>
```

## 🔧 Propriétés (Props)

### Propriétés Requises

| Propriété | Type | Description |
|-----------|------|-------------|
| `title` | `string` | Titre de la section |
| `navigation` | `object` | Objet de navigation React Navigation |

### Propriétés Optionnelles

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `events` | `EventData[]` | `[]` | Liste des événements à afficher |
| `styleType` | `'Card' \| 'Highlight'` | `'Card'` | Type de style pour les cartes |
| `showViewAll` | `boolean` | `true` | Afficher le bouton "Voir tout" |
| `viewAllText` | `string` | `'Voir tout'` | Texte du bouton "Voir tout" |
| `onViewAllPress` | `function` | `undefined` | Gestionnaire pour le clic "Voir tout" |
| `onEventPress` | `function` | `undefined` | Gestionnaire pour le clic sur un événement |
| `containerStyle` | `object` | `undefined` | Styles personnalisés pour le conteneur |
| `titleStyle` | `object` | `undefined` | Styles personnalisés pour le titre |
| `maxEvents` | `number` | `undefined` | Nombre maximum d'événements à afficher |
| `horizontalScroll` | `boolean` | `true` | Activer le défilement horizontal |
| `showHorizontalIndicator` | `boolean` | `true` | Afficher l'indicateur de défilement |

## 📊 Structure des Données d'Événements

```javascript
/**
 * @typedef {Object} EventData
 * @property {string} id - Identifiant unique de l'événement
 * @property {string} title - Titre de l'événement
 * @property {string} date - Date de l'événement
 * @property {string} location - Lieu de l'événement
 * @property {string} author - Auteur/organisateur
 * @property {string} time - Heure relative (ex: "Il y a 3min")
 * @property {string} places - Nombre de places
 * @property {string} price - Prix du billet
 * @property {string} likes - Nombre de likes
 * @property {string} comments - Nombre de commentaires
 * @property {string} shares - Nombre de partages
 * @property {any} image - Image de l'événement
 * @property {any} organizerAvatar - Avatar de l'organisateur
 * @property {Array} participants - Liste des participants
 */
```

## 📱 Exemples d'Utilisation

### Exemple 1: Section Basique (Style Card)

```javascript
<EventSectionBlock
    title="Nouveautés"
    events={getEventsByCategory('nouveautes')}
    navigation={navigation}
    styleType="Card"
/>
```

### Exemple 1bis: Section Basique (Style Highlight)

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

### Exemple 2: Section avec Style Highlight

```javascript
<EventSectionBlock
    title="Événements Mis en Avant"
    events={getEventsByCategory('featured')}
    navigation={navigation}
    styleType="Highlight"
    showViewAll={false}
    maxEvents={2}
/>
```

**Caractéristiques du style Highlight :**
- Cartes plus larges et plus visibles
- Indicateur de pagination automatique (trois points)
- Idéal pour les événements mis en avant
- Généralement utilisé sans bouton "Voir tout"

### Exemple 3: Section avec Gestionnaires Personnalisés

```javascript
<EventSectionBlock
    title="Cette Semaine"
    events={getEventsByCategory('cetteSemaine')}
    navigation={navigation}
    styleType="Card"
    onViewAllPress={() => console.log('Voir tout cliqué')}
    onEventPress={(eventId) => console.log(`Événement ${eventId} cliqué`)}
    showViewAll={true}
    viewAllText="Voir plus"
/>
```

### Exemple 4: Section avec Limite d'Événements

```javascript
<EventSectionBlock
    title="A Venir (Max 1)"
    events={getEventsByCategory('aVenir')}
    navigation={navigation}
    styleType="Card"
    maxEvents={1}
    showViewAll={true}
/>
```

### Exemple 5: Section sans Défilement Horizontal

```javascript
<EventSectionBlock
    title="Proche de Chez Vous"
    events={getEventsByCategory('procheDeChezVous')}
    navigation={navigation}
    styleType="Card"
    horizontalScroll={false}
    showHorizontalIndicator={false}
/>
```

### Exemple 6: Section avec Styles Personnalisés

```javascript
<EventSectionBlock
    title="Événements Professionnels"
    events={getEventsByCategory('professionnel')}
    navigation={navigation}
    styleType="Card"
    containerStyle={{
        backgroundColor: '#f0f8ff',
        borderRadius: 12,
        padding: 8,
    }}
    titleStyle={{
        color: '#1e3a8a',
        fontSize: 22,
        fontWeight: 'bold',
    }}
/>
```

## 🗂️ Données Mockées Disponibles

Le fichier `mockEventData.js` contient des données organisées par catégories :

```javascript
import { 
    mockEvents, 
    getEventsByCategory, 
    getAllEvents, 
    searchEvents 
} from '../assets/component/Globals Components/mockEventData';

// Catégories disponibles
const categories = [
    'featured',           // Événements mis en avant
    'nouveautes',         // Nouveautés
    'cetteSemaine',       // Cette semaine
    'aVenir',            // A venir
    'procheDeChezVous',   // Proche de chez vous
    'byNight',           // Événements By Night
    'sante',             // Événements Santé
    'professionnel'      // Événements Professionnels
];

// Utilisation
const nouveautes = getEventsByCategory('nouveautes');
const featuredLimited = getEventsByCategory('featured', 2); // Limite à 2 événements
const allEvents = getAllEvents();
const searchResults = searchEvents('concert');
```

## 🔄 Fonctionnalités Avancées

### Navigation Personnalisée

```javascript
const handleViewAllPress = (sectionTitle) => {
    // Navigation personnalisée
    navigation.navigate('EventList', { 
        title: sectionTitle,
        category: 'nouveautes'
    });
};

const handleEventPress = (eventId) => {
    // Navigation vers le détail de l'événement
    navigation.navigate('EventDetail', { eventId });
};

<EventSectionBlock
    title="Nouveautés"
    events={getEventsByCategory('nouveautes')}
    navigation={navigation}
    onViewAllPress={() => handleViewAllPress('Nouveautés')}
    onEventPress={handleEventPress}
/>
```

### Styles Dynamiques

```javascript
const dynamicStyles = {
    container: {
        backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
        borderRadius: 12,
    },
    title: {
        color: isDarkMode ? '#ffffff' : '#041578',
        fontSize: 20,
    }
};

<EventSectionBlock
    title="Événements"
    events={events}
    navigation={navigation}
    containerStyle={dynamicStyles.container}
    titleStyle={dynamicStyles.title}
/>
```

## 🎨 Intégration dans l'Application

### Remplacement des Blocs Existants

Avant (code répétitif) :
```javascript
<View style={styles.ligne2}>
    <View>
        <Text style={[styles.textmis, { fontFamily: 'regularBold' }]}>Nouveautés</Text>
    </View>
    <View>
        <TouchableOpacity style={styles.voir}>
            <Text style={[{ fontFamily: 'regularBold' }, styles.textvoir]}>Voir tout</Text>
            <ArrowRightSvgComponent style={{ marginTop: 4 }}></ArrowRightSvgComponent>
        </TouchableOpacity>
    </View>
</View>
<View>
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={true} contentContainerStyle={styles.scrolhorizontal}>
        {/* Événements manuels */}
    </ScrollView>
</View>
```

Après (avec EventSectionBlock) :
```javascript
<EventSectionBlock
    title="Nouveautés"
    events={getEventsByCategory('nouveautes')}
    navigation={navigation}
    styleType="Card"
    showViewAll={true}
    viewAllText="Voir tout"
/>
```

## 🧪 Test et Débogage

Utilisez les composants d'exemple pour tester toutes les fonctionnalités :

```javascript
// Exemple général
import EventSectionBlockExample from '../examples/EventSectionBlockExample';
<EventSectionBlockExample navigation={navigation} />

// Exemple spécifique pour le style Highlight
import HighlightEventSectionExample from '../examples/HighlightEventSectionExample';
<HighlightEventSectionExample navigation={navigation} />
```

## 📋 Bonnes Pratiques

1. **Utilisez les catégories prédéfinies** pour organiser vos événements
2. **Limitez le nombre d'événements** avec `maxEvents` pour les performances
3. **Personnalisez les gestionnaires** pour une navigation cohérente
4. **Utilisez les styles personnalisés** pour l'adaptation au thème
5. **Testez sur différents appareils** pour valider l'affichage

## 🔧 Personnalisation

### Ajout de Nouvelles Catégories

```javascript
// Dans mockEventData.js
export const mockEvents = {
    // ... catégories existantes
    maNouvelleCategorie: [
        {
            id: 'new-1',
            title: "Mon Nouvel Événement",
            // ... autres propriétés
        }
    ]
};
```

### Modification des Styles Par Défaut

```javascript
// Dans EventSectionBlock.js
const styles = StyleSheet.create({
    sectionTitle: {
        color: '#041578',        // Couleur personnalisée
        fontSize: 20,            // Taille personnalisée
        fontFamily: 'regularBold', // Police personnalisée
    },
    // ... autres styles
});
```

## 🐛 Dépannage

### Problème : Les événements ne s'affichent pas
**Solution :** Vérifiez que la catégorie existe dans `mockEventData.js` et que les données sont correctement formatées.

### Problème : Le bouton "Voir tout" ne fonctionne pas
**Solution :** Assurez-vous que `navigation` est passé en prop et que les routes existent.

### Problème : Les styles ne s'appliquent pas
**Solution :** Vérifiez que les styles personnalisés sont correctement passés via `containerStyle` et `titleStyle`.

### Problème : Performance lente avec beaucoup d'événements
**Solution :** Utilisez `maxEvents` pour limiter le nombre d'événements affichés.
