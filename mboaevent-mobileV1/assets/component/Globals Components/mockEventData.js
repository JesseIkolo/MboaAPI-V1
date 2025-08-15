/**
 * Données mockées pour les événements
 * Ce fichier contient des exemples d'événements qui peuvent être utilisés
 * comme contexte ou données de test dans l'application
 */

/**
 * 
 * C'est ici quon va prendre les evenements via l'API
 * 
 */

export const mockEvents = {
    // Événements mis en avant
    featured: [
        {
            id: 'featured-1',
            title: "Concert de IZA, l'artiste de l'heure",
            date: '29 Dec 2023',
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
            id: 'featured-2',
            title: "Festival de la Musique Camerounaise",
            date: '15 Jan 2024',
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
    ],

    // Événements nouveautés
    nouveautes: [
        {
            id: 'new-1',
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
            id: 'new-2',
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
    ],

    // Événements de cette semaine
    cetteSemaine: [
        {
            id: 'week-1',
            title: "Concert de Muriel Blanche au Paposy",
            date: '10 Juin',
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
            id: 'week-2',
            title: "Elections du président",
            date: '10 Juin',
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
        }
    ],

    // Événements à venir
    aVenir: [
        {
            id: 'upcoming-1',
            title: "Concert de Muriel Blanche au Paposy",
            date: '10 Juin',
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
            id: 'upcoming-2',
            title: "Elections du président",
            date: '10 Mars',
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
        }
    ],

    // Événements proche de chez vous
    procheDeChezVous: [
        {
            id: 'nearby-1',
            title: "Concert de Muriel Blanche au Paposy",
            date: '26 juin',
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
            id: 'nearby-2',
            title: "Elections du président",
            date: '10 Mars',
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
        }
    ],

    // Événements par catégorie
    byNight: [
        {
            id: 'bynight-1',
            title: "Soirée Stand-up Comedy",
            date: '15 Jan 2024',
            location: 'Canal Olympia, Douala',
            author: 'Comedy Club',
            time: 'Il y a 2h',
            places: '300 places',
            price: '3,000 XAF',
            likes: '+45 J\'aime',
            comments: '+23 Commentaires',
            shares: '+12M Partages',
            image: require('./GCRessources/event-card-thumnail.png'),
            organizerAvatar: require('./GCRessources/userAvatar.png'),
            participants: [
                { avatar: require('./GCRessources/userAvatar.png') },
                { avatar: require('./GCRessources/userAvatar.png') },
                { avatar: require('./GCRessources/userAvatar.png') }
            ]
        }
    ],

    sante: [
        {
            id: 'sante-1',
            title: "Conférence sur la Santé Mentale",
            date: '22 Jan 2024',
            location: 'Centre Médical, Yaoundé',
            author: 'Dr. Marie Claire',
            time: 'Il y a 5h',
            places: '150 places',
            price: 'Gratuit',
            likes: '+67 J\'aime',
            comments: '+34 Commentaires',
            shares: '+8M Partages',
            image: require('./GCRessources/event-card-thumnail.png'),
            organizerAvatar: require('./GCRessources/userAvatar.png'),
            participants: [
                { avatar: require('./GCRessources/userAvatar.png') },
                { avatar: require('./GCRessources/userAvatar.png') },
                { avatar: require('./GCRessources/userAvatar.png') }
            ]
        }
    ],

    professionnel: [
        {
            id: 'pro-1',
            title: "Forum de l'Emploi 2024",
            date: '25 Jan 2024',
            location: 'Palais des Congrès, Douala',
            author: 'Ministère de l\'Emploi',
            time: 'Il y a 1j',
            places: '1000 places',
            price: 'Gratuit',
            likes: '+234 J\'aime',
            comments: '+156 Commentaires',
            shares: '+45M Partages',
            image: require('./GCRessources/event-card-thumnail.png'),
            organizerAvatar: require('./GCRessources/userAvatar.png'),
            participants: [
                { avatar: require('./GCRessources/userAvatar.png') },
                { avatar: require('./GCRessources/userAvatar.png') },
                { avatar: require('./GCRessources/userAvatar.png') }
            ]
        }
    ],

    // =====================
    // Catalogues Business (comptes partenaires/organisateurs)
    // Utilisables avec styleType "CatalogCard"
    // =====================
    businessByNight: [
        {
            id: 'biz-night-1',
            title: 'Soirée Afro Vibes',
            date: 'Samedi 22:00',
            location: 'Club Eclipse, Douala',
            author: 'Club Eclipse', // business/organisateur
            likes: '+210',
            comments: '+48',
            shares: '+12K',
            image: require('./GCRessources/event-card-thumnail.png'),
            organizerAvatar: require('./GCRessources/userAvatar.png'),
            businessId: 'club-eclipse',
            businessName: 'Club Eclipse',
            businessVerified: true,
            rating: 4.6,
            categories: ['By Night']
        },
        {
            id: 'biz-night-2',
            title: 'Night Live - DJ Set',
            date: 'Vendredi 23:00',
            location: 'Sky Lounge, Yaoundé',
            author: 'Sky Lounge',
            likes: '+154',
            comments: '+30',
            shares: '+9K',
            image: require('./GCRessources/event-card-thumnail.png'),
            organizerAvatar: require('./GCRessources/userAvatar.png'),
            businessId: 'sky-lounge',
            businessName: 'Sky Lounge',
            businessVerified: true,
            rating: 4.3,
            categories: ['By Night']
        }
    ],
    businessSante: [
        {
            id: 'biz-sante-1',
            title: 'Atelier Nutrition & Bien-être',
            date: 'Dimanche 10:00',
            location: 'Centre Santé Plus, Yaoundé',
            author: 'Santé Plus',
            likes: '+89',
            comments: '+22',
            shares: '+2K',
            image: require('./GCRessources/event-card-thumnail.png'),
            organizerAvatar: require('./GCRessources/userAvatar.png'),
            businessId: 'sante-plus',
            businessName: 'Centre Santé Plus',
            businessVerified: false,
            rating: 4.1,
            categories: ['Santé']
        },
        {
            id: 'biz-sante-2',
            title: 'Yoga en plein air',
            date: 'Samedi 08:00',
            location: 'Parc Central, Douala',
            author: 'Zen Studio',
            likes: '+132',
            comments: '+18',
            shares: '+3K',
            image: require('./GCRessources/event-card-thumnail.png'),
            organizerAvatar: require('./GCRessources/userAvatar.png'),
            businessId: 'zen-studio',
            businessName: 'Zen Studio',
            businessVerified: true,
            rating: 4.7,
            categories: ['Santé']
        }
    ],
    businessProfessionnel: [
        {
            id: 'biz-pro-1',
            title: 'Afterwork Networking',
            date: 'Jeudi 18:30',
            location: 'Business Hub, Yaoundé',
            author: 'Business Hub',
            likes: '+312',
            comments: '+65',
            shares: '+15K',
            image: require('./GCRessources/event-card-thumnail.png'),
            organizerAvatar: require('./GCRessources/userAvatar.png'),
            businessId: 'business-hub',
            businessName: 'Business Hub',
            businessVerified: true,
            rating: 4.8,
            categories: ['Professionnel']
        },
        {
            id: 'biz-pro-2',
            title: 'Masterclass Marketing Digital',
            date: 'Mardi 14:00',
            location: 'Cowork X, Douala',
            author: 'Cowork X',
            likes: '+201',
            comments: '+39',
            shares: '+7K',
            image: require('./GCRessources/event-card-thumnail.png'),
            organizerAvatar: require('./GCRessources/userAvatar.png'),
            businessId: 'cowork-x',
            businessName: 'Cowork X',
            businessVerified: false,
            rating: 4.2,
            categories: ['Professionnel']
        }
    ]
};

/**
 * Fonction utilitaire pour obtenir des événements par catégorie
 * @param {string} category - Catégorie d'événements
 * @param {number} limit - Nombre maximum d'événements à retourner
 * @returns {Array} Liste d'événements
 */
export const getEventsByCategory = (category, limit = null) => {
    const events = mockEvents[category] || [];
    return limit ? events.slice(0, limit) : events;
};

/**
 * Fonction utilitaire pour obtenir tous les événements
 * @returns {Array} Tous les événements
 */
export const getAllEvents = () => {
    return Object.values(mockEvents).flat();
};

/**
 * Fonction utilitaire pour rechercher des événements
 * @param {string} query - Terme de recherche
 * @returns {Array} Événements correspondants
 */
export const searchEvents = (query) => {
    const allEvents = getAllEvents();
    const searchTerm = query.toLowerCase();
    
    return allEvents.filter(event => 
        event.title.toLowerCase().includes(searchTerm) ||
        event.location.toLowerCase().includes(searchTerm) ||
        event.author.toLowerCase().includes(searchTerm)
    );
};

export default mockEvents;
