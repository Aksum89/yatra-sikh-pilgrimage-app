
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, Alert, Linking, Platform, StatusBar } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useItinerary } from '@/contexts/ItineraryContext';

interface Gurdwara {
  id: number;
  name: string;
  location: string;
  city: string;
  province: string;
  significance: string;
  distance: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  image: string;
  description: string;
}

const GURDWARAS: Gurdwara[] = [
  {
    id: 1,
    name: 'Gurdwara Janam Asthan',
    location: 'Nankana Sahib',
    city: 'Nankana Sahib',
    province: 'Punjab',
    significance: 'Birthplace of Guru Nanak Dev Ji',
    distance: '75 km from Lahore',
    coordinates: { lat: 31.4504, lng: 73.7056 },
    image: '🏛️',
    description: 'The most sacred Gurdwara marking the birthplace of Guru Nanak Dev Ji, the founder of Sikhism.',
  },
  {
    id: 2,
    name: 'Gurdwara Panja Sahib',
    location: 'Hasan Abdal',
    city: 'Hasan Abdal',
    province: 'Punjab',
    significance: 'Sacred handprint of Guru Nanak',
    distance: '45 km from Islamabad',
    coordinates: { lat: 33.8199, lng: 72.6890 },
    image: '✋',
    description: 'Famous for the sacred handprint of Guru Nanak Dev Ji on a boulder.',
  },
  {
    id: 3,
    name: 'Gurdwara Dera Sahib',
    location: 'Lahore',
    city: 'Lahore',
    province: 'Punjab',
    significance: 'Martyrdom place of Guru Arjan Dev Ji',
    distance: 'In Lahore city',
    coordinates: { lat: 31.5804, lng: 74.3287 },
    image: '🕊️',
    description: 'Sacred site where Guru Arjan Dev Ji, the fifth Sikh Guru, was martyred.',
  },
  {
    id: 4,
    name: 'Gurdwara Kartarpur Sahib',
    location: 'Kartarpur',
    city: 'Kartarpur',
    province: 'Punjab',
    significance: 'Where Guru Nanak spent his final years',
    distance: '120 km from Lahore',
    coordinates: { lat: 32.1373, lng: 74.9009 },
    image: '🌾',
    description: 'The place where Guru Nanak Dev Ji spent the last 18 years of his life.',
  },
  {
    id: 5,
    name: 'Gurdwara Sacha Sauda',
    location: 'Farooqabad',
    city: 'Sheikhupura',
    province: 'Punjab',
    significance: 'True bargain of Guru Nanak',
    distance: '50 km from Lahore',
    coordinates: { lat: 31.7167, lng: 73.9500 },
    image: '💰',
    description: 'Associated with Guru Nanak Dev Ji\'s philosophy of honest trade and fair dealing.',
  },
  {
    id: 6,
    name: 'Gurdwara Rohri Sahib',
    location: 'Rohri',
    city: 'Sukkur',
    province: 'Sindh',
    significance: 'Visit of Guru Nanak Dev Ji',
    distance: '470 km from Karachi',
    coordinates: { lat: 27.6689, lng: 68.8956 },
    image: '🏔️',
    description: 'Historic Gurdwara in Sindh province visited by Guru Nanak Dev Ji.',
  },
];

export default function GurdwarasScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [selectedGurdwara, setSelectedGurdwara] = useState<number | null>(null);
  const { addToItinerary, isInItinerary } = useItinerary();

  const getDirections = (gurdwara: Gurdwara) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${gurdwara.coordinates.lat},${gurdwara.coordinates.lng}&travelmode=driving`;
    Linking.openURL(url).catch(() => {
      Alert.alert('Error', 'Unable to open maps application');
    });
  };

  const handleAddToItinerary = (gurdwara: Gurdwara) => {
    if (isInItinerary(gurdwara.name)) {
      Alert.alert('Already Added', `${gurdwara.name} is already in your itinerary.`);
      return;
    }

    Alert.alert(
      'Add to Itinerary',
      `Would you like to add ${gurdwara.name} to your pilgrimage itinerary?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Add',
          onPress: () => {
            addToItinerary({
              name: gurdwara.name,
              location: gurdwara.location,
              image: gurdwara.image,
              coordinates: gurdwara.coordinates,
            });
            Alert.alert('Added!', `${gurdwara.name} has been added to your itinerary.`);
          },
        },
      ]
    );
  };

  const toggleDetails = (gurdwaraId: number) => {
    setSelectedGurdwara(selectedGurdwara === gurdwaraId ? null : gurdwaraId);
  };

  return (
    <ThemedView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView 
        style={[styles.scrollView, { backgroundColor: colors.background }]}
        contentContainerStyle={[styles.container, { paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 20 : 50 }]}
        showsVerticalScrollIndicator={true}
        bounces={false}
      >
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={{ color: colors.primary }}>
          Sacred Gurdwaras
        </ThemedText>
        <ThemedText style={{ color: colors.text, marginTop: 8 }}>
          Discover holy sites across Pakistan
        </ThemedText>
      </ThemedView>

      {/* Search and Filter */}
      <ThemedView style={[styles.searchContainer, { backgroundColor: colors.card }]}>
        <View style={styles.searchHeader}>
          <IconSymbol name="magnifyingglass" size={20} color={colors.icon} />
          <ThemedText style={[styles.searchPlaceholder, { color: colors.icon }]}>
            Search Gurdwaras by name or location
          </ThemedText>
        </View>
        <View style={styles.filterTags}>
          <View style={[styles.filterTag, { backgroundColor: colors.primary + '20' }]}>
            <ThemedText style={[styles.filterTagText, { color: colors.primary }]}>
              All Provinces
            </ThemedText>
          </View>
          <View style={[styles.filterTag, { backgroundColor: colors.background }]}>
            <ThemedText style={[styles.filterTagText, { color: colors.text }]}>
              Punjab
            </ThemedText>
          </View>
          <View style={[styles.filterTag, { backgroundColor: colors.background }]}>
            <ThemedText style={[styles.filterTagText, { color: colors.text }]}>
              Sindh
            </ThemedText>
          </View>
        </View>
      </ThemedView>

      {/* Gurdwaras List */}
      <ThemedView style={styles.gurdwarasList}>
        {GURDWARAS.map((gurdwara) => (
          <ThemedView key={gurdwara.id} style={[styles.gurdwaraCard, { backgroundColor: colors.card }]}>
            <TouchableOpacity
              style={styles.gurdwaraHeader}
              onPress={() => toggleDetails(gurdwara.id)}
            >
              <View style={[styles.gurdwaraIcon, { backgroundColor: colors.primary + '15' }]}>
                <ThemedText style={[styles.iconText, { color: colors.primary }]}>
                  {gurdwara.image}
                </ThemedText>
              </View>
              
              <View style={styles.gurdwaraInfo}>
                <ThemedText style={[styles.gurdwaraName, { color: colors.text }]}>
                  {gurdwara.name}
                </ThemedText>
                <ThemedText style={[styles.gurdwaraLocation, { color: colors.icon }]}>
                  📍 {gurdwara.location}, {gurdwara.province}
                </ThemedText>
                <ThemedText style={[styles.gurdwaraDistance, { color: colors.secondary }]}>
                  🚗 {gurdwara.distance}
                </ThemedText>
              </View>

              <IconSymbol 
                name={selectedGurdwara === gurdwara.id ? "chevron.up" : "chevron.down"} 
                size={16} 
                color={colors.icon} 
              />
            </TouchableOpacity>

            {selectedGurdwara === gurdwara.id && (
              <View style={styles.gurdwaraDetails}>
                <ThemedText style={[styles.significanceTitle, { color: colors.text }]}>
                  Significance
                </ThemedText>
                <ThemedText style={[styles.significance, { color: colors.primary }]}>
                  {gurdwara.significance}
                </ThemedText>
                
                <ThemedText style={[styles.descriptionTitle, { color: colors.text }]}>
                  Description
                </ThemedText>
                <ThemedText style={[styles.description, { color: colors.icon }]}>
                  {gurdwara.description}
                </ThemedText>

                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.directionsButton, { backgroundColor: colors.primary }]}
                    onPress={() => getDirections(gurdwara)}
                  >
                    <IconSymbol name="location.fill" size={16} color={colors.accent} />
                    <ThemedText style={[styles.actionButtonText, { color: colors.accent }]}>
                      Get Directions
                    </ThemedText>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.actionButton, styles.itineraryButton, { backgroundColor: colors.secondary }]}
                    onPress={() => handleAddToItinerary(gurdwara)}
                  >
                    <IconSymbol name="plus" size={16} color={colors.accent} />
                    <ThemedText style={[styles.actionButtonText, { color: colors.accent }]}>
                      Add to Itinerary
                    </ThemedText>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </ThemedView>
        ))}
      </ThemedView>

      {/* Additional Info */}
      <ThemedView style={[styles.infoCard, { backgroundColor: colors.card }]}>
        <IconSymbol name="info.circle" size={24} color={colors.primary} />
        <View style={styles.infoContent}>
          <ThemedText style={[styles.infoTitle, { color: colors.text }]}>
            Pilgrimage Tips
          </ThemedText>
          <ThemedText style={[styles.infoText, { color: colors.icon }]}>
            • Respect local customs and dress modestly{'\n'}
            • Remove shoes before entering Gurdwaras{'\n'}
            • Photography restrictions may apply{'\n'}
            • Best visiting hours are early morning or evening
          </ThemedText>
        </View>
      </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  searchContainer: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  searchPlaceholder: {
    fontSize: 14,
  },
  filterTags: {
    flexDirection: 'row',
    gap: 8,
  },
  filterTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  filterTagText: {
    fontSize: 12,
    fontWeight: '500',
  },
  gurdwarasList: {
    gap: 16,
  },
  gurdwaraCard: {
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  gurdwaraHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gurdwaraIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconText: {
    fontSize: 24,
  },
  gurdwaraInfo: {
    flex: 1,
  },
  gurdwaraName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  gurdwaraLocation: {
    fontSize: 14,
    marginBottom: 2,
  },
  gurdwaraDistance: {
    fontSize: 13,
    fontWeight: '500',
  },
  gurdwaraDetails: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
  },
  significanceTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  significance: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12,
  },
  descriptionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  directionsButton: {},
  itineraryButton: {},
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  infoCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    marginTop: 20,
    marginBottom: 20,
  },
  infoContent: {
    flex: 1,
    marginLeft: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
