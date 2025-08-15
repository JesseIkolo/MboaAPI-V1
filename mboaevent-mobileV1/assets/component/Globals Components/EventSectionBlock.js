import React, { useRef, useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { useScreenDimensions, calculateCardWidthByPercentage } from '../../../hooks/useScreenDimensions';
import Event from './EventCard';
import ArrowRightSvgComponent from "../SVG/arrowright";

/**
 * Composant pour l'indicateur de pagination (trois points)
 */
const PaginationIndicator = ({ totalItems, currentIndex = 0, activeColor = '#041578', inactiveColor = '#767A90' }) => {
    if (totalItems <= 1) return null;
    
    return (
        <View style={styles.paginationContainer}>
            {Array.from({ length: totalItems }, (_, index) => (
                <View
                    key={index}
                    style={[
                        styles.paginationDot,
                        {
                            backgroundColor: index === currentIndex ? activeColor : inactiveColor,
                            width: index === currentIndex ? 39 : 8,
                            height: 8,
                        }
                    ]}
                />
            ))}
        </View>
    );
};

/**
 * @typedef {Object} EventData
 * @property {string} id - Identifiant unique de l'événement
 * @property {string} title - Titre de l'événement
 * @property {string} description - Description de l'événement
 * @property {string} shortDescription - Description courte
 * @property {Object} location - Informations de localisation
 * @property {string} location.name - Nom du lieu
 * @property {string} location.address - Adresse
 * @property {string} location.city - Ville
 * @property {number} capacity - Capacité de l'événement
 * @property {Array} ticketTypes - Types de billets disponibles
 * @property {string} date - Date de l'événement
 * @property {string} time - Heure de l'événement
 * @property {string} author - Auteur/organisateur
 * @property {string} price - Prix du billet
 * @property {string} likes - Nombre de likes
 * @property {string} comments - Nombre de commentaires
 * @property {string} shares - Nombre de partages
 * @property {any} image - Image de l'événement
 * @property {any} organizerAvatar - Avatar de l'organisateur
 * @property {Array} participants - Liste des participants
 */

/**
 * @typedef {Object} EventSectionBlockProps
 * @property {string} title - Titre de la section
 * @property {EventData[]} events - Liste des événements à afficher
 * @property {string} [styleType='Card'] - Type de style pour les cartes d'événements ('Card' ou 'Highlight')
 * @property {boolean} [showViewAll=true] - Afficher le bouton "Voir tout"
 * @property {string} [viewAllText='Voir tout'] - Texte du bouton "Voir tout"
 * @property {Function} [onViewAllPress] - Fonction appelée lors du clic sur "Voir tout"
 * @property {Function} [onEventPress] - Fonction appelée lors du clic sur un événement
 * @property {Object} navigation - Objet de navigation React Navigation
 * @property {Object} [containerStyle] - Styles personnalisés pour le conteneur
 * @property {Object} [titleStyle] - Styles personnalisés pour le titre
 * @property {number} [maxEvents] - Nombre maximum d'événements à afficher
 * @property {boolean} [horizontalScroll=true] - Activer le défilement horizontal
 * @property {boolean} [showHorizontalIndicator=true] - Afficher l'indicateur de défilement horizontal
 */

/**
 * Composant EventSectionBlock - Affiche une section d'événements avec titre et liste
 * @param {EventSectionBlockProps} props - Propriétés du composant
 */
const EventSectionBlock = ({
    title,
    events = [],
    styleType = 'Card',
    showViewAll = true,
    viewAllText = 'Voir tout',
    onViewAllPress,
    onEventPress,
    navigation,
    containerStyle,
    titleStyle,
    maxEvents,
    horizontalScroll = true,
    showHorizontalIndicator = true
}) => {
    const screenDimensions = useScreenDimensions();
    
    // Limiter le nombre d'événements si maxEvents est défini
    const eventsToDisplay = maxEvents ? events.slice(0, maxEvents) : events;
    
    // Données mockées par défaut si aucun événement n'est fourni
    const defaultEvents = [
        {
            id: '1',
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
            image: require('./GCRessources/event-card-thumnail.png'),
            organizerAvatar: require('./GCRessources/userAvatar.png'),
            participants: [
                { avatar: require('./GCRessources/userAvatar.png') },
                { avatar: require('./GCRessources/userAvatar.png') },
                { avatar: require('./GCRessources/userAvatar.png') }
            ]
        },
        {
            id: '2',
            title: "Festival de la Musique Camerounaise",
            date: '20 Jan 2024',
            location: 'Palais des Sports, Yaoundé',
            author: 'Festival Organizers',
            time: 'Il y a 1h',
            places: '5000 places',
            price: '5,000 XAF',
            likes: '+156 J\'aime',
            comments: '+89 Commentaires',
            shares: '+23M Partages',
            image: require('./GCRessources/event-card-thumnail.png'),
            organizerAvatar: require('./GCRessources/userAvatar.png'),
            participants: [
                { avatar: require('./GCRessources/userAvatar.png') },
                { avatar: require('./GCRessources/userAvatar.png') },
                { avatar: require('./GCRessources/userAvatar.png') }
            ]
        }
    ];
    
    const eventsToShow = eventsToDisplay.length > 0 ? eventsToDisplay : defaultEvents;

    // Dimensions et snapping
    const ITEM_GAP = 16;
    const CARD_WIDTH = useMemo(() => {
        // Aligner avec la largeur définie dans Event.js (98% - 16 de gap)
        return calculateCardWidthByPercentage(98, 0);
    }, [screenDimensions.width]);
    const SNAP_INTERVAL = useMemo(() => CARD_WIDTH + ITEM_GAP, [CARD_WIDTH]);

    // Animation du scroll et index courant pour l'indicateur
    const scrollX = useRef(new Animated.Value(0)).current;
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleMomentumEnd = (e) => {
        const offsetX = e.nativeEvent.contentOffset?.x || 0;
        const index = Math.round(offsetX / SNAP_INTERVAL);
        setCurrentIndex(Math.max(0, Math.min(index, eventsToShow.length - 1)));
    };

    const handleViewAllPress = () => {
        if (onViewAllPress) {
            onViewAllPress();
        } else {
            // Navigation par défaut vers une page de liste complète
            navigation?.navigate('EventList', { 
                title, 
                events: eventsToDisplay,
                styleType 
            });
        }
    };

    const handleEventPress = (eventId) => {
        if (onEventPress) {
            onEventPress(eventId);
        } else {
            // Navigation par défaut vers la page de détail de l'événement
            navigation?.navigate('EventDetail', { eventId });
        }
    };

    return (
        <View style={[styles.container, containerStyle]}>
            {/* Header de la section */}
            <View style={styles.sectionHeader}>
                <View>
                    <Text style={[styles.sectionTitle, titleStyle]}>
                        {title}
                    </Text>
                </View>
                {showViewAll && (
                    <View>
                        <TouchableOpacity 
                            style={styles.viewAllButton}
                            onPress={handleViewAllPress}
                        >
                            <Text style={styles.viewAllText}>
                                {viewAllText}
                            </Text>
                            <ArrowRightSvgComponent style={styles.arrowIcon} />
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            {/* Contenu de la section */}
            <View style={styles.sectionContent}>
                {horizontalScroll ? (
                    <Animated.ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={showHorizontalIndicator}
                        contentContainerStyle={styles.scrollContainer}
                        snapToInterval={SNAP_INTERVAL}
                        snapToAlignment="start"
                        decelerationRate="fast"
                        disableIntervalMomentum
                        onMomentumScrollEnd={handleMomentumEnd}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            { useNativeDriver: true }
                        )}
                        scrollEventThrottle={16}
                    >
                        {eventsToShow.map((event, index) => {
                            const inputRange = [
                                (index - 1) * SNAP_INTERVAL,
                                index * SNAP_INTERVAL,
                                (index + 1) * SNAP_INTERVAL,
                            ];
                            const scale = scrollX.interpolate({
                                inputRange,
                                outputRange: [0.95, 1, 0.95],
                                extrapolate: 'clamp',
                            });
                            return (
                                <Animated.View
                                    key={event.id || index}
                                    style={{ width: CARD_WIDTH, marginRight: -24, transform: [{ scale }] }}
                                >
                                    <Event
                                        styleType={styleType}
                                        eventId={event.id}
                                        eventImage={event.image}
                                        eventDate={event.date}
                                        eventLocation={event.location}
                                        eventTitle={event.title}
                                        eventAuthor={event.author}
                                        eventTime={event.time}
                                        eventPlaces={event.places}
                                        eventPrice={event.price}
                                        eventLikes={event.likes}
                                        eventComments={event.comments}
                                        eventShares={event.shares}
                                        eventOrganizerAvatar={event.organizerAvatar}
                                        participants={event.participants}
                                        navigation={navigation}
                                    />
                                </Animated.View>
                            );
                        })}
                    </Animated.ScrollView>
                ) : (
                    <View style={styles.verticalContainer}>
                        {eventsToShow.map((event, index) => (
                            <View key={event.id || index} style={styles.verticalEventContainer}>
                                <Event
                                    styleType={styleType}
                                    eventId={event.id}
                                    eventImage={event.image}
                                    eventDate={event.date}
                                    eventLocation={event.location}
                                    eventTitle={event.title}
                                    eventAuthor={event.author}
                                    eventTime={event.time}
                                    eventPlaces={event.places}
                                    eventPrice={event.price}
                                    eventLikes={event.likes}
                                    eventComments={event.comments}
                                    eventShares={event.shares}
                                    eventOrganizerAvatar={event.organizerAvatar}
                                    participants={event.participants}
                                    navigation={navigation}
                                />
                            </View>
                        ))}
                    </View>
                )}
            </View>

            {/* Indicateur de pagination pour les événements Highlight */}
            {styleType === 'Highlight' && eventsToShow.length > 1 && (
                <PaginationIndicator 
                    totalItems={eventsToShow.length}
                    currentIndex={currentIndex}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

        
    },
    sectionHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        paddingHorizontal: 8,
    },
    sectionTitle: {
        color: '#041578',
        fontSize: 20,
        fontFamily: 'regularBold',
    },
    viewAllButton: {
        width: 'auto',
        height: 'auto',
        borderWidth: 1,
        borderColor: '#989FC8',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4,
        gap: 8,
    },
    viewAllText: {
        color: '#041578',
        fontSize: 14,
        fontFamily: 'regularBold',
    },
    arrowIcon: {

    },
    sectionContent: {
        // Le contenu sera géré par le ScrollView ou le conteneur vertical
         
    },
    scrollContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 10,
        paddingHorizontal: 12,
        overflow: 'visible',
    },
    verticalContainer: {
        paddingHorizontal: 8,
        gap: 15,
    },
    verticalEventContainer: {
        width: '100%',
    },
    // Styles pour l'indicateur de pagination
    paginationContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
        marginTop: 15,
    },
    paginationDot: {
        borderRadius: 100,
    },
});

export default EventSectionBlock;
