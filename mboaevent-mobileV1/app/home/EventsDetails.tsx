import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const EventsDetails = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const {
    eventId,
    title,
    date,
    location,
    author,
    price,
  } = params as Record<string, string>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={[styles.title, { fontFamily: 'regularBold' }]}>{title || 'Détails de l\'événement'}</Text>
      <View style={styles.meta}>
        {date ? <Text style={[styles.metaText, { fontFamily: 'regular' }]}>{date}</Text> : null}
        {location ? <Text style={[styles.metaText, { fontFamily: 'regular' }]}>{location}</Text> : null}
        {author ? <Text style={[styles.metaText, { fontFamily: 'regular' }]}>Par {author}</Text> : null}
        {price ? <Text style={[styles.metaText, { fontFamily: 'regular' }]}>{price}</Text> : null}
      </View>

      {/* TODO: afficher l'image, description, actions, participants, etc. */}

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={[styles.backText, { fontFamily: 'regularBold' }]}>Retour</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  title: {
    color: '#041578',
    fontSize: 22,
  },
  meta: {
    gap: 6,
  },
  metaText: {
    color: '#3C4260',
    fontSize: 14,
  },
  backButton: {
    marginTop: 12,
    backgroundColor: '#041578',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  backText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default EventsDetails;


