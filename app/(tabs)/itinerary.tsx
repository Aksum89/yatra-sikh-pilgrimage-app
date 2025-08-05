
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useItinerary } from '@/contexts/ItineraryContext';

export default function ItineraryScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { itinerary, removeFromItinerary, toggleCompletion, getProgress } = useItinerary();
  const progress = getProgress();

  const handleRemoveFromItinerary = (id: number) => {
    Alert.alert(
      'Remove from Itinerary',
      'Are you sure you want to remove this location from your itinerary?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            removeFromItinerary(id);
          },
        },
      ]
    );
  };

  const getDirections = (item: any) => {
    if (item.coordinates) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${item.coordinates.lat},${item.coordinates.lng}&travelmode=driving`;
      Linking.openURL(url).catch(() => {
        Alert.alert('Error', 'Unable to open maps application');
      });
    } else {
      Alert.alert('Error', 'Location coordinates not available');
    }
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

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
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
          {/* Progress Section */}
          <ThemedView style={[styles.progressSection, { backgroundColor: colors.card }]}>
            <ThemedText type="subtitle" style={{ color: colors.text, marginBottom: 8 }}>
              Your Progress
            </ThemedText>
            
            <View style={styles.progressStats}>
              <View style={styles.progressStat}>
                <ThemedText style={[styles.progressNumber, { color: colors.primary }]}>
                  {progress.completed}
                </ThemedText>
                <ThemedText style={[styles.progressLabel, { color: colors.icon }]}>
                  Completed
                </ThemedText>
              </View>
              
              <View style={styles.progressStat}>
                <ThemedText style={[styles.progressNumber, { color: colors.text }]}>
                  {progress.total - progress.completed}
                </ThemedText>
                <ThemedText style={[styles.progressLabel, { color: colors.icon }]}>
                  Remaining
                </ThemedText>
              </View>
              
              <View style={styles.progressStat}>
                <ThemedText style={[styles.progressNumber, { color: progress.percentage === 100 ? '#4CAF50' : colors.secondary }]}>
                  {progress.percentage}%
                </ThemedText>
                <ThemedText style={[styles.progressLabel, { color: colors.icon }]}>
                  Complete
                </ThemedText>
              </View>
            </View>
            
            <View style={[styles.progressBarContainer, { backgroundColor: colors.background }]}>
              <View 
                style={[
                  styles.progressBarFill, 
                  { 
                    width: `${progress.percentage}%`,
                    backgroundColor: progress.percentage === 100 ? '#4CAF50' : colors.primary
                  }
                ]} 
              />
            </View>
          </ThemedView>

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
            <ThemedView key={item.id} style={[
              styles.itineraryCard, 
              { 
                backgroundColor: colors.card,
                opacity: item.completed ? 0.7 : 1
              }
            ]}>
              <View style={styles.dayIndicator}>
                <ThemedText style={[
                  styles.dayText, 
                  { 
                    color: colors.accent, 
                    backgroundColor: item.completed ? '#4CAF50' : colors.primary 
                  }
                ]}>
                  Day {index + 1}
                </ThemedText>
                {item.completed && (
                  <ThemedText style={styles.completedBadge}>✓</ThemedText>
                )}
              </View>

              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <TouchableOpacity
                    style={[
                      styles.completionCheckbox,
                      { 
                        backgroundColor: item.completed ? '#4CAF50' : 'transparent',
                        borderColor: item.completed ? '#4CAF50' : colors.icon
                      }
                    ]}
                    onPress={() => toggleCompletion(item.id)}
                  >
                    {item.completed && (
                      <IconSymbol name="checkmark" size={14} color="white" />
                    )}
                  </TouchableOpacity>
                  
                  <View style={styles.cardIcon}>
                    <ThemedText style={styles.emoji}>{item.image}</ThemedText>
                  </View>
                  <View style={styles.cardInfo}>
                    <ThemedText 
                      type="subtitle" 
                      style={{ 
                        color: colors.text,
                        textDecorationLine: item.completed ? 'line-through' : 'none'
                      }}
                    >
                      {item.name}
                    </ThemedText>
                    <ThemedText style={[styles.location, { color: colors.icon }]}>
                      📍 {item.location}
                    </ThemedText>
                  </View>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveFromItinerary(item.id)}
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

                <TouchableOpacity
                  style={[styles.directionsButton, { backgroundColor: colors.primary }]}
                  onPress={() => getDirections(item)}
                >
                  <IconSymbol name="location.fill" size={16} color={colors.accent} />
                  <ThemedText style={[styles.directionsButtonText, { color: colors.accent }]}>
                    Get Directions
                  </ThemedText>
                </TouchableOpacity>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 20,
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
  progressSection: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  progressStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  progressStat: {
    alignItems: 'center',
  },
  progressNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  progressLabel: {
    fontSize: 11,
    textAlign: 'center',
  },
  progressBarContainer: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
    transition: 'width 0.3s ease',
  },
  completionCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  completedBadge: {
    fontSize: 16,
    color: '#4CAF50',
    marginLeft: 8,
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
  emoji: {
    fontSize: 28,
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
  directionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    gap: 8,
  },
  directionsButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
