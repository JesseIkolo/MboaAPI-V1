import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import EventSectionBlock from '../assets/component/Globals Components/EventSectionBlock';
import { mockEvents, getEventsByCategory } from '../assets/component/Globals Components/mockEventData';

/**
 * Exemple spécifique pour les événements de type Highlight
 * Ce composant montre comment utiliser EventSectionBlock avec le style Highlight
 */
const HighlightEventSectionExample = ({ navigation }) => {
    
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Exemples EventSectionBlock - Style Highlight</Text>

            {/* Exemple 1: Section Highlight basique */}
            <Text style={styles.sectionTitle}>1. Section Highlight Basique</Text>
            <EventSectionBlock
                title="Événements Mis en Avant"
                events={getEventsByCategory('featured')}
                navigation={navigation}
                styleType="Highlight"
                showViewAll={false}
            />

            {/* Exemple 2: Section Highlight avec limite */}
            <Text style={styles.sectionTitle}>2. Section Highlight avec Limite (Max 1)</Text>
            <EventSectionBlock
                title="Événement Principal"
                events={getEventsByCategory('featured')}
                navigation={navigation}
                styleType="Highlight"
                showViewAll={false}
                maxEvents={1}
            />

            {/* Exemple 3: Section Highlight avec bouton "Voir tout" */}
            <Text style={styles.sectionTitle}>3. Section Highlight avec "Voir tout"</Text>
            <EventSectionBlock
                title="Événements Premium"
                events={getEventsByCategory('featured')}
                navigation={navigation}
                styleType="Highlight"
                showViewAll={true}
                viewAllText="Voir tous les événements"
            />

            {/* Exemple 4: Section Highlight avec gestionnaires personnalisés */}
            <Text style={styles.sectionTitle}>4. Section Highlight avec Gestionnaires</Text>
            <EventSectionBlock
                title="Événements Spéciaux"
                events={getEventsByCategory('featured')}
                navigation={navigation}
                styleType="Highlight"
                onViewAllPress={() => console.log('Voir tous les événements spéciaux')}
                onEventPress={(eventId) => console.log(`Événement spécial cliqué: ${eventId}`)}
                showViewAll={true}
                viewAllText="Découvrir plus"
            />

            {/* Exemple 5: Section Highlight avec styles personnalisés */}
            <Text style={styles.sectionTitle}>5. Section Highlight avec Styles Personnalisés</Text>
            <EventSectionBlock
                title="Événements VIP"
                events={getEventsByCategory('featured')}
                navigation={navigation}
                styleType="Highlight"
                containerStyle={styles.vipContainer}
                titleStyle={styles.vipTitle}
                showViewAll={false}
            />

            {/* Exemple 6: Comparaison Highlight vs Card */}
            <Text style={styles.sectionTitle}>6. Comparaison: Highlight vs Card</Text>
            
            <Text style={styles.subtitle}>Style Highlight:</Text>
            <EventSectionBlock
                title="Style Highlight"
                events={getEventsByCategory('featured', 1)}
                navigation={navigation}
                styleType="Highlight"
                showViewAll={false}
            />

            <Text style={styles.subtitle}>Style Card:</Text>
            <EventSectionBlock
                title="Style Card"
                events={getEventsByCategory('featured', 1)}
                navigation={navigation}
                styleType="Card"
                showViewAll={false}
            />

            {/* Exemple 7: Section Highlight avec données dynamiques */}
            <Text style={styles.sectionTitle}>7. Section Highlight avec Données Dynamiques</Text>
            <EventSectionBlock
                title="Événements du Moment"
                events={[
                    {
                        id: 'dynamic-1',
                        title: "Concert de Maalhox le Viber",
                        date: '15 Jan 2024',
                        location: 'Au PaPoSy de Yaoundé',
                        author: 'Eric Fotso',
                        time: 'Il y a 3min',
                        places: '250 places',
                        price: '25,000 XAF',
                        likes: '+23 J\'aime',
                        comments: '+58 Commentaires',
                        shares: '+54M Partages',
                        image: require('../assets/component/GCRessources/event-card-thumnail.png'),
                        organizerAvatar: require('../assets/component/GCRessources/userAvatar.png'),
                        participants: [
                            { avatar: require('../assets/component/GCRessources/userAvatar.png') },
                            { avatar: require('../assets/component/GCRessources/userAvatar.png') },
                            { avatar: require('../assets/component/GCRessources/userAvatar.png') }
                        ]
                    }
                ]}
                navigation={navigation}
                styleType="Highlight"
                showViewAll={false}
            />

            {/* Exemple 8: Section Highlight sans défilement horizontal */}
            <Text style={styles.sectionTitle}>8. Section Highlight sans Défilement Horizontal</Text>
            <EventSectionBlock
                title="Événement Unique"
                events={getEventsByCategory('featured', 1)}
                navigation={navigation}
                styleType="Highlight"
                horizontalScroll={false}
                showViewAll={false}
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
    subtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 5,
        color: '#666',
        paddingHorizontal: 10,
    },
    vipContainer: {
        backgroundColor: '#1a1a1a',
        borderRadius: 12,
        padding: 8,
        marginVertical: 5,
    },
    vipTitle: {
        color: '#FFD700',
        fontSize: 22,
        fontWeight: 'bold',
    },
});

export default HighlightEventSectionExample;
