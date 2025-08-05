
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, Alert, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useItinerary } from '@/contexts/ItineraryContext';

interface Event {
  id: number;
  title: string;
  gurdwara: string;
  location: string;
  date: string;
  time: string;
  type: 'gurpurab' | 'festival' | 'commemoration' | 'celebration';
  description: string;
  image: string;
}

const EVENTS: Event[] = [
  {
    id: 1,
    title: 'Guru Nanak Gurpurab',
    gurdwara: 'Gurdwara Janam Asthan',
    location: 'Nankana Sahib',
    date: '2024-11-15',
    time: '4:00 AM onwards',
    type: 'gurpurab',
    description: 'Celebrating the birth anniversary of Guru Nanak Dev Ji with special prayers, kirtan, and langar.',
    image: '🌟',
  },
  {
    id: 2,
    title: 'Baisakhi Celebration',
    gurdwara: 'Gurdwara Panja Sahib',
    location: 'Hasan Abdal',
    date: '2024-04-14',
    time: '5:00 AM onwards',
    type: 'festival',
    description: 'Annual harvest festival and commemoration of the formation of the Khalsa.',
    image: '🌾',
  },
  {
    id: 3,
    title: 'Martyrdom Day of Guru Arjan Dev Ji',
    gurdwara: 'Gurdwara Darbar Sahib Kartarpur',
    location: 'Kartarpur',
    date: '2024-06-16',
    time: '6:00 AM onwards',
    type: 'commemoration',
    description: 'Remembering the sacrifice of the fifth Guru with prayers and reflection.',
    image: '🙏',
  },
];

const EVENT_TYPES = {
  gurpurab: { label: 'Gurpurab', color: '#FF9933' },
  festival: { label: 'Festival', color: '#228B22' },
  commemoration: { label: 'Commemoration', color: '#000080' },
  celebration: { label: 'Celebration', color: '#FF6B6B' },
};

export default function EventsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const { addToItinerary, isInItinerary } = useItinerary();

  const filteredEvents = selectedType
    ? EVENTS.filter(event => event.type === selectedType)
    : EVENTS;

  const addEventToItinerary = (event: Event) => {
    if (isInItinerary(event.title)) {
      Alert.alert(
        'Already Added',
        `${event.title} is already in your itinerary.`,
        [{ text: 'OK' }]
      );
      return;
    }

    addToItinerary({
      name: event.title,
      location: event.location,
      image: event.image,
    });

    Alert.alert(
      'Event Added',
      `${event.title} has been added to your itinerary for ${formatDate(event.date)}.`,
      [{ text: 'OK' }]
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const isUpcoming = (dateString: string) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    return eventDate >= today;
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView 
        style={[styles.scrollView, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={true}
      >
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={{ color: colors.primary }}>
          Sacred Events & Celebrations
        </ThemedText>
        <ThemedText style={{ color: colors.text, marginTop: 8 }}>
          Join the spiritual celebrations
        </ThemedText>
      </ThemedView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        <TouchableOpacity
          style={[
            styles.filterChip,
            !selectedType && { backgroundColor: colors.primary },
            !selectedType || { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }
          ]}
          onPress={() => setSelectedType(null)}
        >
          <ThemedText style={[
            styles.filterText,
            { color: !selectedType ? colors.accent : colors.text }
          ]}>
            All Events
          </ThemedText>
        </TouchableOpacity>

        {Object.entries(EVENT_TYPES).map(([type, config]) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.filterChip,
              selectedType === type && { backgroundColor: colors.primary },
              selectedType !== type && { backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }
            ]}
            onPress={() => setSelectedType(selectedType === type ? null : type)}
          >
            <ThemedText style={[
              styles.filterText,
              { color: selectedType === type ? colors.accent : colors.text }
            ]}>
              {config.label}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {filteredEvents.map((event) => (
        <ThemedView key={event.id} style={[styles.eventCard, { backgroundColor: colors.card }]}>
          <View style={[styles.eventHeader, { borderBottomColor: colors.border }]}>
            <View style={styles.eventIcon}>
              <ThemedText style={styles.emoji}>{event.image}</ThemedText>
            </View>
            <View style={styles.eventInfo}>
              <View style={styles.eventTitleRow}>
                <ThemedText type="subtitle" style={{ color: colors.text, flex: 1 }}>
                  {event.title}
                </ThemedText>
                {isUpcoming(event.date) && (
                  <View style={[styles.upcomingBadge, { backgroundColor: colors.success }]}>
                    <ThemedText style={[styles.badgeText, { color: colors.accent }]}>
                      Upcoming
                    </ThemedText>
                  </View>
                )}
              </View>
              <ThemedText style={[styles.gurdwaraName, { color: colors.primary }]}>
                {event.gurdwara}
              </ThemedText>
              <ThemedText style={[styles.location, { color: colors.icon }]}>
                📍 {event.location}
              </ThemedText>
            </View>
          </View>

          <View style={styles.eventDetails}>
            <View style={[styles.typeTag, { backgroundColor: EVENT_TYPES[event.type].color }]}>
              <ThemedText style={[styles.typeText, { color: colors.accent }]}>
                {EVENT_TYPES[event.type].label}
              </ThemedText>
            </View>

            <View style={styles.dateTimeInfo}>
              <View style={styles.dateTimeItem}>
                <IconSymbol name="calendar" size={16} color={colors.secondary} />
                <ThemedText style={[styles.dateTimeText, { color: colors.text }]}>
                  {formatDate(event.date)}
                </ThemedText>
              </View>
              
              <View style={styles.dateTimeItem}>
                <IconSymbol name="clock" size={16} color={colors.secondary} />
                <ThemedText style={[styles.dateTimeText, { color: colors.text }]}>
                  {event.time}
                </ThemedText>
              </View>
            </View>

            <ThemedText style={[styles.description, { color: colors.text }]}>
              {event.description}
            </ThemedText>

            <TouchableOpacity
              style={[styles.addButton, { backgroundColor: colors.primary }]}
              onPress={() => addEventToItinerary(event)}
            >
              <IconSymbol name="plus" size={16} color={colors.accent} />
              <ThemedText style={[styles.addButtonText, { color: colors.accent }]}>
                Add to Itinerary
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>
      ))}
      </ScrollView>
    </SafeAreaView>
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
  filterContainer: {
    marginBottom: 20,
  },
  filterContent: {
    paddingRight: 16,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  eventCard: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  eventHeader: {
    flexDirection: 'row',
    padding: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  eventIcon: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  emoji: {
    fontSize: 32,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  upcomingBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  gurdwaraName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
  },
  eventDetails: {
    padding: 20,
    paddingTop: 16,
  },
  typeTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 16,
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  dateTimeInfo: {
    marginBottom: 16,
    gap: 8,
  },
  dateTimeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateTimeText: {
    fontSize: 14,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 6,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
