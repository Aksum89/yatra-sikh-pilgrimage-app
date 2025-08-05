
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, Alert, Linking } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface EmergencyContact {
  id: number;
  name: string;
  number: string;
  type: 'police' | 'medical' | 'fire' | 'tourist' | 'embassy';
  description: string;
  icon: string;
}

const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 1,
    name: 'Police Emergency',
    number: '15',
    type: 'police',
    description: 'General police emergency and law enforcement',
    icon: 'shield.fill',
  },
  {
    id: 2,
    name: 'Medical Emergency',
    number: '1122',
    type: 'medical',
    description: 'Ambulance and medical emergency services',
    icon: 'cross.fill',
  },
  {
    id: 3,
    name: 'Fire Department',
    number: '16',
    type: 'fire',
    description: 'Fire emergency and rescue services',
    icon: 'flame.fill',
  },
  {
    id: 4,
    name: 'Tourist Helpline',
    number: '1422',
    type: 'tourist',
    description: 'Tourist assistance and information services',
    icon: 'info.circle.fill',
  },
  {
    id: 5,
    name: 'Indian High Commission',
    number: '+92-51-2601371',
    type: 'embassy',
    description: 'Indian diplomatic mission in Pakistan',
    icon: 'building.2.fill',
  },
  {
    id: 6,
    name: 'SGPC Helpline',
    number: '+92-321-9876543',
    type: 'tourist',
    description: 'Shiromani Gurdwara Parbandhak Committee assistance',
    icon: 'person.2.fill',
  },
  {
    id: 7,
    name: 'Pakistan Sikh Council',
    number: '+92-42-37350123',
    type: 'tourist',
    description: 'Local Sikh community support and guidance',
    icon: 'hands.sparkles.fill',
  },
  {
    id: 8,
    name: 'Evacuee Trust Property Board',
    number: '+92-51-9202456',
    type: 'tourist',
    description: 'Official body managing Sikh religious properties',
    icon: 'building.columns.fill',
  },
  {
    id: 9,
    name: 'Punjab Tourism Helpline',
    number: '1422',
    type: 'tourist',
    description: 'Punjab province tourism assistance',
    icon: 'mappin.and.ellipse',
  },
];

const CONTACT_COLORS = {
  police: '#3B82F6',
  medical: '#EF4444',
  fire: '#F97316',
  tourist: '#10B981',
  embassy: '#8B5CF6',
};

export default function EmergencyScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [emergencyActive, setEmergencyActive] = useState(false);

  const makeEmergencyCall = (contact: EmergencyContact) => {
    Alert.alert(
      'Emergency Call',
      `Are you sure you want to call ${contact.name} (${contact.number})?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Call Now',
          style: 'destructive',
          onPress: () => {
            Linking.openURL(`tel:${contact.number}`);
          },
        },
      ]
    );
  };

  const sendSOSAlert = () => {
    if (emergencyActive) {
      setEmergencyActive(false);
      Alert.alert(
        'SOS Cancelled',
        'Your emergency alert has been cancelled.',
        [{ text: 'OK' }]
      );
    } else {
      setEmergencyActive(true);
      Alert.alert(
        'SOS Alert Sent',
        'Emergency alert sent to your emergency contacts and local authorities. Help is on the way.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Simulate automatic cancellation after 30 seconds
              setTimeout(() => {
                setEmergencyActive(false);
              }, 30000);
            },
          },
        ]
      );
    }
  };

  const shareLocation = () => {
    Alert.alert(
      'Share Location',
      'Your current location will be shared with emergency contacts.',
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={{ color: '#EF4444' }}>
          Emergency SOS
        </ThemedText>
        <ThemedText style={{ color: colors.text, marginTop: 8 }}>
          Quick access to emergency services
        </ThemedText>
      </ThemedView>

      {/* SOS Button */}
      <ThemedView style={[styles.sosContainer, { backgroundColor: colors.card }]}>
        <TouchableOpacity
          style={[
            styles.sosButton,
            {
              backgroundColor: emergencyActive ? '#10B981' : '#EF4444',
              transform: [{ scale: emergencyActive ? 1.1 : 1 }],
            },
          ]}
          onPress={sendSOSAlert}
          activeOpacity={0.8}
        >
          <IconSymbol
            name={emergencyActive ? 'checkmark' : 'exclamationmark.triangle.fill'}
            size={48}
            color="#FFFFFF"
          />
          <ThemedText style={styles.sosButtonText}>
            {emergencyActive ? 'CANCEL SOS' : 'SEND SOS'}
          </ThemedText>
        </TouchableOpacity>

        <ThemedText style={[styles.sosDescription, { color: colors.icon }]}>
          {emergencyActive
            ? 'Emergency alert is active. Tap to cancel.'
            : 'Press and hold to send emergency alert with your location'
          }
        </ThemedText>
      </ThemedView>

      {/* Location Sharing */}
      <ThemedView style={[styles.locationCard, { backgroundColor: colors.card }]}>
        <View style={styles.locationHeader}>
          <IconSymbol name="location.fill" size={24} color={colors.primary} />
          <ThemedText type="subtitle" style={{ color: colors.text, marginLeft: 12 }}>
            Share Your Location
          </ThemedText>
        </View>
        <TouchableOpacity
          style={[styles.locationButton, { backgroundColor: colors.primary }]}
          onPress={shareLocation}
        >
          <IconSymbol name="square.and.arrow.up" size={16} color={colors.accent} />
          <ThemedText style={[styles.locationButtonText, { color: colors.accent }]}>
            Share Location
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* Emergency Contacts */}
      <ThemedView style={styles.contactsSection}>
        <ThemedText type="subtitle" style={{ color: colors.text, marginBottom: 16 }}>
          Emergency Contacts
        </ThemedText>

        {EMERGENCY_CONTACTS.map((contact) => (
          <TouchableOpacity
            key={contact.id}
            style={[styles.contactCard, { backgroundColor: colors.card }]}
            onPress={() => makeEmergencyCall(contact)}
          >
            <View style={[styles.contactIcon, { backgroundColor: CONTACT_COLORS[contact.type] }]}>
              <IconSymbol name={contact.icon} size={24} color="#FFFFFF" />
            </View>
            
            <View style={styles.contactInfo}>
              <ThemedText style={[styles.contactName, { color: colors.text }]}>
                {contact.name}
              </ThemedText>
              <ThemedText style={[styles.contactNumber, { color: colors.primary }]}>
                {contact.number}
              </ThemedText>
              <ThemedText style={[styles.contactDescription, { color: colors.icon }]}>
                {contact.description}
              </ThemedText>
            </View>

            <IconSymbol name="phone.fill" size={20} color={CONTACT_COLORS[contact.type]} />
          </TouchableOpacity>
        ))}
      </ThemedView>

      {/* Safety Tips */}
      <ThemedView style={[styles.safetyTips, { backgroundColor: colors.card }]}>
        <ThemedText type="subtitle" style={{ color: colors.text, marginBottom: 16 }}>
          Safety Tips
        </ThemedText>

        <View style={styles.tipItem}>
          <IconSymbol name="checkmark.circle.fill" size={16} color={colors.success} />
          <ThemedText style={[styles.tipText, { color: colors.text }]}>
            Always inform someone about your travel plans
          </ThemedText>
        </View>

        <View style={styles.tipItem}>
          <IconSymbol name="checkmark.circle.fill" size={16} color={colors.success} />
          <ThemedText style={[styles.tipText, { color: colors.text }]}>
            Keep important documents and emergency contacts handy
          </ThemedText>
        </View>

        <View style={styles.tipItem}>
          <IconSymbol name="checkmark.circle.fill" size={16} color={colors.success} />
          <ThemedText style={[styles.tipText, { color: colors.text }]}>
            Stay in groups when visiting unfamiliar areas
          </ThemedText>
        </View>

        <View style={styles.tipItem}>
          <IconSymbol name="checkmark.circle.fill" size={16} color={colors.success} />
          <ThemedText style={[styles.tipText, { color: colors.text }]}>
            Keep your phone charged and have backup power
          </ThemedText>
        </View>

        <View style={styles.tipItem}>
          <IconSymbol name="checkmark.circle.fill" size={16} color={colors.success} />
          <ThemedText style={[styles.tipText, { color: colors.text }]}>
            Carry copies of passport, visa, and pilgrimage permits
          </ThemedText>
        </View>

        <View style={styles.tipItem}>
          <IconSymbol name="checkmark.circle.fill" size={16} color={colors.success} />
          <ThemedText style={[styles.tipText, { color: colors.text }]}>
            Stay connected with your pilgrimage group leader
          </ThemedText>
        </View>

        <View style={styles.tipItem}>
          <IconSymbol name="checkmark.circle.fill" size={16} color={colors.success} />
          <ThemedText style={[styles.tipText, { color: colors.text }]}>
            Follow Gurdwara protocols and respect local customs
          </ThemedText>
        </View>
      </ThemedView>
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
    alignItems: 'center',
  },
  sosContainer: {
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  sosButton: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  sosButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 8,
    textAlign: 'center',
  },
  sosDescription: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  locationCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  locationButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  contactsSection: {
    marginBottom: 20,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  contactNumber: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  contactDescription: {
    fontSize: 12,
    lineHeight: 16,
  },
  safetyTips: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
});
