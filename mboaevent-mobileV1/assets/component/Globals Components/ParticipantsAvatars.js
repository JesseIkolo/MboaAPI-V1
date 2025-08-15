import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ParticipantsAvatars = ({ participants, maxDisplay = 3, showCount = true }) => {
    if (!participants || participants.length === 0) {
        return (
            <View style={styles.viewimage}>
                <View style={styles.imagesrond}>
                    <View>
                        <Image source={require('./GCRessources/userAvatar.png')} style={styles.imgerond1} />
                    </View>
                    <View>
                        <Image source={require('./GCRessources/userAvatar.png')} style={styles.imgerond2} />
                    </View>
                    <View>
                        <Image source={require('./GCRessources/userAvatar.png')} style={styles.imgerond3} />
                    </View>
                </View>
                <View>
                    <Text style={[{ fontFamily: 'regular' }, styles.texnombre]}>+20 personnes participent</Text>
                </View>
            </View>
        );
    }

    const displayParticipants = participants.slice(0, maxDisplay);
    const remainingCount = participants.length - maxDisplay;

    return (
        <View style={styles.viewimage}>
            <View style={styles.imagesrond}>
                {displayParticipants.map((participant, index) => (
                    <View key={index} style={[styles.avatarContainer, index > 0 && styles.avatarOverlap]}>
                        <Image 
                            source={participant.avatar || require('./GCRessources/userAvatar.png')} 
                            style={styles.avatar} 
                        />
                    </View>
                ))}
                {remainingCount > 0 && (
                    <View style={[styles.avatarContainer, styles.avatarOverlap, styles.remainingContainer]}>
                        <Text style={styles.remainingText}>+{remainingCount}</Text>
                    </View>
                )}
            </View>
            {showCount && (
                <View>
                    <Text style={[{ fontFamily: 'regular' }, styles.texnombre]}>
                        {participants.length} personne{participants.length > 1 ? 's' : ''} participent
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    viewimage: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    imagesrond: {
        display: 'flex',
        flexDirection: 'row',
        gap: -8
    },
    avatarContainer: {
        position: 'relative'
    },
    avatar: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#FFFFFF'
    },
    avatarOverlap: {
        marginLeft: -8
    },
    remainingContainer: {
        backgroundColor: '#666666',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        width: 24,
        height: 24
    },
    remainingText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontFamily: 'regularBold'
    },
    texnombre: {
        fontSize: 12,
        color: '#666666'
    }
});

export default ParticipantsAvatars;
