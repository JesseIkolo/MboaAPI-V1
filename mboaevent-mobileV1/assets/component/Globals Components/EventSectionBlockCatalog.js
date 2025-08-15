import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Event from './EventCard';
import ArrowRightSvgComponent from "../SVG/arrowright";
import EmptyPage from './EmptyPage';

/**
 * Section verticale pour afficher des cartes de catalogue (sans scroll horizontal)
 * Prépare le terrain pour un infinite scroll vertical (via onEndReached)
 *
 * @param {Object} props
 * @param {string} props.title
 * @param {Array} props.events
 * @param {any} props.navigation
 * @param {boolean} [props.showViewAll=true]
 * @param {string} [props.viewAllText='Voir tout']
 * @param {Function} [props.onViewAllPress]
 * @param {Function} [props.onEndReached]
 * @param {number} [props.onEndReachedThreshold=0.5]
 * @param {boolean} [props.refreshing]
 * @param {Function} [props.onRefresh]
 */
const EventSectionBlockCatalog = ({
	title,
	events = [],
	navigation,
	showViewAll = true,
	viewAllText = 'Voir tout',
	onViewAllPress,
	onEndReached,
	onEndReachedThreshold = 0.5,
	refreshing,
	onRefresh,
}) => {
	const handleViewAllPress = () => {
		if (onViewAllPress) return onViewAllPress();
		navigation?.navigate('EventList', { title, events, styleType: 'CatalogCard' });
	};

	const renderItem = ({ item, index }) => (
		<View style={styles.itemWrapper}>
			<Event
				styleType="CatalogCard"
				eventId={item.id}
				eventImage={item.image}
				eventDate={item.date}
				eventLocation={item.location}
				eventTitle={item.title}
				eventAuthor={item.author}
				eventTime={item.time}
				eventPlaces={item.places}
				eventPrice={item.price}
				eventLikes={item.likes}
				eventComments={item.comments}
				eventShares={item.shares}
				eventOrganizerAvatar={item.organizerAvatar}
				participants={item.participants}
				navigation={navigation}
			/>
		</View>
	);

	return (
		<View style={styles.container}>
			<View style={styles.sectionHeader}>
				<View>
					<Text style={styles.sectionTitle}>{title}</Text>
				</View>
				{showViewAll && (
					<View>
						<TouchableOpacity style={styles.viewAllButton} onPress={handleViewAllPress}>
							<Text style={styles.viewAllText}>{viewAllText}</Text>
							<ArrowRightSvgComponent style={styles.arrowIcon} />
						</TouchableOpacity>
					</View>
				)}
			</View>

			{(!events || events.length === 0) ? (
				<EmptyPage
					title="Aucun catalogue disponible"
					lines={["Nous n'avons trouvé aucun catalogue pour l'instant.", "Essayez de modifier vos filtres ou revenez plus tard."]}
					actionText={showViewAll ? viewAllText : undefined}
					onAction={showViewAll ? handleViewAllPress : undefined}
				/>
			) : (
			<FlatList
				data={events}
				renderItem={renderItem}
				keyExtractor={(item, idx) => String(item?.id || idx)}
				ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
				contentContainerStyle={styles.listContent}
				onEndReached={onEndReached}
				onEndReachedThreshold={onEndReachedThreshold}
				refreshing={refreshing}
				onRefresh={onRefresh}
				showsVerticalScrollIndicator={false}
			/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginVertical: 10,
		paddingHorizontal: 12,
	},
	sectionHeader: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 12,
	},
	sectionTitle: {
		color: '#041578',
		fontSize: 20,
		fontFamily: 'regularBold',
	},
	viewAllButton: {
		borderWidth: 1,
		borderColor: '#041578',
		borderRadius: 8,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 10,
		paddingVertical: 6,
	},
	viewAllText: {
		color: '#041578',
		fontSize: 14,
		fontFamily: 'regularBold',
	},
	arrowIcon: {
		marginTop: 4,
	},
	listContent: {
		paddingBottom: 16,
	},
	itemWrapper: {
		// Pour isoler chaque item si besoin d'ombres/paddings
	},
});

export default EventSectionBlockCatalog;


