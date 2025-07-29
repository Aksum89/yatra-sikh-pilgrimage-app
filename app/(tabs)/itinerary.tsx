import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface ItineraryItem {
  id: number;
  name: string;
  location: string;
  date: string;
  time: string;
  duration: string;
  image: string;
  completed?: boolean;
}

const SAMPLE_ITINERARY: ItineraryItem[] = [
  {
    id: 1,
    name: 'Gurdwara Janam Asthan',
    location: 'Nankana Sahib',
    date: '2024-03-15',
    time: '6:00 AM',
    duration: '4 hours',
    image: '🌟',
    completed: true,
  },
  {
    id: 2,
    name: 'Gurdwara Panja Sahib',
    location: 'Hasan Abdal, Attock',
    date: '2024-03-16',
    time: '7:00 AM',
    duration: '3 hours',
    image: '✋',
  },
];

export default function ItineraryScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [itinerary, setItinerary] = useState<ItineraryItem[]>(SAMPLE_ITINERARY);

  const removeFromItinerary = (id: number) => {
    Alert.alert(
      'Remove from Itinerary',
      'Are you sure you want to remove this location from your itinerary?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setItinerary(prev => prev.filter(item => item.id !== id));
          },
        },
      ]
    );
  };

  const shareItinerary = () => {
    Alert.alert(
      'Share Itinerary',
      'Your pilgrimage itinerary has been prepared for sharing.',
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

  const toggleComplete = (id: number) => {
    setItinerary(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={{ color: colors.primary }}>
          My Pilgrimage Itinerary
        </ThemedText>
        <ThemedText style={{ color: colors.text, marginTop: 8 }}>
          Plan your spiritual journey
        </ThemedText>
      </ThemedView>

      {itinerary.length === 0 ? (
        <ThemedView style={[styles.emptyState, { backgroundColor: colors.card }]}>
          <ThemedText style={styles.emptyIcon}>🙏</ThemedText>
          <ThemedText type="subtitle" style={{ color: colors.text, textAlign: 'center' }}>
            Your itinerary is empty
          </ThemedText>
          <ThemedText style={[styles.emptyText, { color: colors.icon }]}>
            Start adding Gurdwaras from the Discover tab to begin planning your pilgrimage.
          </ThemedText>
        </ThemedView>
      ) : (
        <>
          <View style={styles.summary}>
            <ThemedView style={[styles.summaryCard, { backgroundColor: colors.card }]}>
              <ThemedText style={[styles.summaryLabel, { color: colors.icon }]}>
                Total Locations
              </ThemedText>
              <ThemedText type="subtitle" style={{ color: colors.primary }}>
                {itinerary.length}
              </ThemedText>
            </ThemedView>

            <ThemedView style={[styles.summaryCard, { backgroundColor: colors.card }]}>
              <ThemedText style={[styles.summaryLabel, { color: colors.icon }]}>
                Duration
              </ThemedText>
              <ThemedText type="subtitle" style={{ color: colors.primary }}>
                {itinerary.length} days
              </ThemedText>
            </ThemedView>
          </View>

          {itinerary.map((item, index) => (
            <ThemedView key={item.id} style={[styles.itineraryCard, { backgroundColor: colors.card }]}>
              <View style={styles.dayIndicator}>
                <ThemedText style={[styles.dayText, { color: colors.accent, backgroundColor: colors.primary }]}>
                  Day {index + 1}
                </ThemedText>
              </View>

              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <TouchableOpacity style={[styles.cardIcon, item.completed && styles.completedIcon]} onPress={() => toggleComplete(item.id)}>
                    <ThemedText style={[styles.emoji, item.completed && styles.completedEmoji]}>
                      {item.completed ? '✅' : item.image}
                    </ThemedText>
                  </TouchableOpacity>
                  <View style={styles.cardInfo}>
                    <ThemedText
                      type="subtitle"
                      style={[
                        { color: colors.text },
                        item.completed && { textDecorationLine: 'line-through', opacity: 0.7 },
                      ]}
                    >
                      {item.name}
                    </ThemedText>
                    <ThemedText style={[styles.location, { color: colors.icon }]}>
                      📍 {item.location}
                    </ThemedText>
                    {item.completed && (
                      <ThemedText style={[styles.completedText, { color: colors.success }]}>
                        ✓ Completed
                      </ThemedText>
                    )}
                  </View>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeFromItinerary(item.id)}
                  >
                    <IconSymbol name="xmark" size={20} color={colors.icon} />
                  </TouchableOpacity>
                </View>

                <View style={styles.timeDetails}>
                  <View style={styles.timeItem}>
                    <IconSymbol name="calendar" size={16} color={colors.secondary} />
                    <ThemedText style={[styles.timeText, { color: colors.text }]}>
                      {formatDate(item.date)}
                    </ThemedText>
                  </View>

                  <View style={styles.timeItem}>
                    <IconSymbol name="clock" size={16} color={colors.secondary} />
                    <ThemedText style={[styles.timeText, { color: colors.text }]}>
                      {item.time} • {item.duration}
                    </ThemedText>
                  </View>
                </View>
              </View>
            </ThemedView>
          ))}

          <TouchableOpacity
            style={[styles.shareButton, { backgroundColor: colors.primary }]}
            onPress={shareItinerary}
          >
            <IconSymbol name="square.and.arrow.up" size={20} color={colors.accent} />
            <ThemedText style={[styles.shareText, { color: colors.accent }]}>
              Share Itinerary
            </ThemedText>
          </TouchableOpacity>
        </>
      )}
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
  emptyState: {
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    marginTop: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 16,
    lineHeight: 24,
  },
  summary: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  itineraryCard: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  dayIndicator: {
    padding: 12,
    alignItems: 'flex-start',
  },
  dayText: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  cardContent: {
    padding: 20,
    paddingTop: 0,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  cardIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  completedIcon: {
    backgroundColor: 'rgba(0, 200, 0, 0.1)',
  },
  emoji: {
    fontSize: 28,
  },
  completedEmoji: {
    /* Styles for completed emoji */
  },
  cardInfo: {
    flex: 1,
  },
  location: {
    fontSize: 14,
    marginTop: 4,
  },
  removeButton: {
    padding: 4,
  },
  timeDetails: {
    gap: 8,
  },
  timeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeText: {
    fontSize: 14,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    gap: 8,
  },
  shareText: {
    fontSize: 16,
    fontWeight: '600',
  },
  completedText: {
    fontSize: 12,
    marginTop: 4,
  },
});