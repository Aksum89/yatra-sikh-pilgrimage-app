
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';

const GURDWARAS = [
  {
    id: 1,
    name: 'Gurdwara Darbar Sahib Kartarpur',
    location: 'Kartarpur, Narowal',
    description: 'Historic Gurdwara where Guru Nanak Dev Ji spent his last years',
    significance: 'Final resting place of Guru Nanak Dev Ji',
    visitingHours: '6:00 AM - 8:00 PM',
    facilities: ['Langar Hall', 'Accommodation', 'Medical Aid', 'Parking'],
    image: '🏛️',
  },
  {
    id: 2,
    name: 'Gurdwara Panja Sahib',
    location: 'Hasan Abdal, Attock',
    description: 'Sacred site with Guru Nanak Dev Ji\'s handprint',
    significance: 'Handprint of Guru Nanak Dev Ji on a boulder',
    visitingHours: '5:00 AM - 9:00 PM',
    facilities: ['Langar Hall', 'Guest House', 'Sacred Pool', 'Parking'],
    image: '✋',
  },
  {
    id: 3,
    name: 'Gurdwara Janam Asthan',
    location: 'Nankana Sahib',
    description: 'Birthplace of Guru Nanak Dev Ji',
    significance: 'Birth site of the first Sikh Guru',
    visitingHours: '4:00 AM - 10:00 PM',
    facilities: ['Museum', 'Langar Hall', 'Library', 'Accommodation'],
    image: '🌟',
  },
];

export default function DiscoverScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGurdwara, setSelectedGurdwara] = useState<number | null>(null);

  const filteredGurdwaras = GURDWARAS.filter(gurdwara =>
    gurdwara.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    gurdwara.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToItinerary = (gurdwara: typeof GURDWARAS[0]) => {
    Alert.alert(
      'Added to Itinerary',
      `${gurdwara.name} has been added to your pilgrimage itinerary.`,
      [{ text: 'OK' }]
    );
  };

  const openDirections = (gurdwara: typeof GURDWARAS[0]) => {
    Alert.alert(
      'Directions',
      `Opening directions to ${gurdwara.name} in maps...`,
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={{ color: colors.primary }}>
          Discover Sacred Gurdwaras
        </ThemedText>
        <ThemedText style={{ color: colors.text, marginTop: 8 }}>
          Explore holy sites across Pakistan
        </ThemedText>
      </ThemedView>

      <ThemedView style={[styles.searchContainer, { backgroundColor: colors.card }]}>
        <IconSymbol name="magnifyingglass" size={20} color={colors.icon} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search Gurdwaras or locations..."
          placeholderTextColor={colors.disabled}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </ThemedView>

      {filteredGurdwaras.map((gurdwara) => (
        <ThemedView key={gurdwara.id} style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.cardHeader}>
            <View style={styles.cardIcon}>
              <ThemedText style={styles.emoji}>{gurdwara.image}</ThemedText>
            </View>
            <View style={styles.cardInfo}>
              <ThemedText type="subtitle" style={{ color: colors.text }}>
                {gurdwara.name}
              </ThemedText>
              <ThemedText style={[styles.location, { color: colors.icon }]}>
                📍 {gurdwara.location}
              </ThemedText>
            </View>
          </View>

          <ThemedText style={[styles.description, { color: colors.text }]}>
            {gurdwara.description}
          </ThemedText>

          <ThemedView style={[styles.significanceBox, { backgroundColor: colors.background }]}>
            <ThemedText style={[styles.significanceLabel, { color: colors.primary }]}>
              Historical Significance:
            </ThemedText>
            <ThemedText style={[styles.significanceText, { color: colors.text }]}>
              {gurdwara.significance}
            </ThemedText>
          </ThemedView>

          <View style={styles.details}>
            <ThemedText style={[styles.detailLabel, { color: colors.secondary }]}>
              Visiting Hours:
            </ThemedText>
            <ThemedText style={[styles.detailText, { color: colors.text }]}>
              {gurdwara.visitingHours}
            </ThemedText>
          </View>

          <View style={styles.facilities}>
            <ThemedText style={[styles.detailLabel, { color: colors.secondary }]}>
              Facilities:
            </ThemedText>
            <View style={styles.facilityTags}>
              {gurdwara.facilities.map((facility, index) => (
                <View key={index} style={[styles.facilityTag, { backgroundColor: colors.primary }]}>
                  <ThemedText style={[styles.facilityText, { color: colors.accent }]}>
                    {facility}
                  </ThemedText>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.cardActions}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: colors.primary }]}
              onPress={() => addToItinerary(gurdwara)}
            >
              <IconSymbol name="plus" size={16} color={colors.accent} />
              <ThemedText style={[styles.actionText, { color: colors.accent }]}>
                Add to Itinerary
              </ThemedText>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.actionButton, styles.secondaryButton, { borderColor: colors.primary }]}
              onPress={() => openDirections(gurdwara)}
            >
              <IconSymbol name="location" size={16} color={colors.primary} />
              <ThemedText style={[styles.actionText, { color: colors.primary }]}>
                Directions
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 20,
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardIcon: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  emoji: {
    fontSize: 32,
  },
  cardInfo: {
    flex: 1,
  },
  location: {
    fontSize: 14,
    marginTop: 4,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  significanceBox: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  significanceLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  significanceText: {
    fontSize: 14,
    lineHeight: 20,
  },
  details: {
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
  },
  facilities: {
    marginBottom: 20,
  },
  facilityTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  facilityTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  facilityText: {
    fontSize: 12,
    fontWeight: '500',
  },
  cardActions: {
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
    gap: 6,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
