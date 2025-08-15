import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import EventSectionBlock from '../assets/component/Globals Components/EventSectionBlock';
import { mockEvents, getEventsByCategory } from '../assets/component/Globals Components/mockEventData';

/**
 * Exemple d'utilisation du composant EventSectionBlock
 * Ce composant montre différentes façons d'utiliser EventSectionBlock
 */
const EventSectionBlockExample = ({ navigation }) => {
    
    // Exemple de gestionnaire personnalisé pour "Voir tout"
    const handleViewAllPress = (sectionTitle) => {
        console.log(`Voir tout pour la section: ${sectionTitle}`);
        // Navigation personnalisée ou autre logique
    };

    // Exemple de gestionnaire personnalisé pour les événements
    const handleEventPress = (eventId) => {
        console.log(`Événement cliqué: ${eventId}`);
        // Navigation personnalisée ou autre logique
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Exemples EventSectionBlock</Text>

            {/* Exemple 1: Section avec données mockées par défaut */}
            <Text style={styles.sectionTitle}>1. Section avec données par défaut</Text>
            <EventSectionBlock
                title="Événements Populaires"
                navigation={navigation}
                styleType="Card"
            />

            {/* Exemple 2: Section avec données spécifiques */}
            <Text style={styles.sectionTitle}>2. Section avec données spécifiques</Text>
            <EventSectionBlock
                title="Nouveautés"
                events={getEventsByCategory('nouveautes')}
                navigation={navigation}
                styleType="Card"
                showViewAll={true}
                viewAllText="Voir tout"
            />

            {/* Exemple 3: Section avec style Highlight */}
            <Text style={styles.sectionTitle}>3. Section avec style Highlight</Text>
            <EventSectionBlock
                title="Événements Mis en Avant"
                events={getEventsByCategory('featured')}
                navigation={navigation}
                styleType="Highlight"
                showViewAll={false}
            />

            {/* Exemple 4: Section avec gestionnaires personnalisés */}
            <Text style={styles.sectionTitle}>4. Section avec gestionnaires personnalisés</Text>
            <EventSectionBlock
                title="Cette Semaine"
                events={getEventsByCategory('cetteSemaine')}
                navigation={navigation}
                styleType="Card"
                onViewAllPress={() => handleViewAllPress('Cette Semaine')}
                onEventPress={handleEventPress}
                showViewAll={true}
                viewAllText="Voir plus"
            />

            {/* Exemple 5: Section avec limite d'événements */}
            <Text style={styles.sectionTitle}>5. Section avec limite d'événements</Text>
            <EventSectionBlock
                title="A Venir (Max 1)"
                events={getEventsByCategory('aVenir')}
                navigation={navigation}
                styleType="Card"
                maxEvents={1}
                showViewAll={true}
            />

            {/* Exemple 6: Section sans défilement horizontal */}
            <Text style={styles.sectionTitle}>6. Section sans défilement horizontal</Text>
            <EventSectionBlock
                title="Proche de Chez Vous"
                events={getEventsByCategory('procheDeChezVous')}
                navigation={navigation}
                styleType="Card"
                horizontalScroll={false}
                showHorizontalIndicator={false}
            />

            {/* Exemple 7: Section avec styles personnalisés */}
            <Text style={styles.sectionTitle}>7. Section avec styles personnalisés</Text>
            <EventSectionBlock
                title="Événements Professionnels"
                events={getEventsByCategory('professionnel')}
                navigation={navigation}
                styleType="Card"
                containerStyle={styles.customContainer}
                titleStyle={styles.customTitle}
            />

            {/* Exemple 8: Section avec événements par catégorie */}
            <Text style={styles.sectionTitle}>8. Événements By Night</Text>
            <EventSectionBlock
                title="By Night"
                events={getEventsByCategory('byNight')}
                navigation={navigation}
                styleType="Card"
                showViewAll={true}
            />

            {/* Exemple 9: Section Santé */}
            <Text style={styles.sectionTitle}>9. Événements Santé</Text>
            <EventSectionBlock
                title="Santé"
                events={getEventsByCategory('sante')}
                navigation={navigation}
                styleType="Card"
                showViewAll={true}
            />

            {/* Exemple 10: Section avec tous les événements */}
            <Text style={styles.sectionTitle}>10. Tous les Événements</Text>
            <EventSectionBlock
                title="Tous les Événements"
                events={mockEvents.nouveautes.concat(mockEvents.cetteSemaine)}
                navigation={navigation}
                styleType="Card"
                showViewAll={true}
                viewAllText="Voir la liste complète"
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#041578',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: '#333',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
    },
    customContainer: {
        backgroundColor: '#f0f8ff',
        borderRadius: 12,
        padding: 8,
        marginVertical: 5,
    },
    customTitle: {
        color: '#1e3a8a',
        fontSize: 22,
        fontWeight: 'bold',
    },
});

export default EventSectionBlockExample;
