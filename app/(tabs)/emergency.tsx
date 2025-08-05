
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView 
        style={[styles.scrollView, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={true}
      >
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={{ color: '#EF4444' }}>
            Emergency Contacts
          </ThemedText>
          <ThemedText style={{ color: colors.text, marginTop: 8 }}>
            Quick access to emergency services
          </ThemedText>
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
              <IconSymbol name={contact.icon} size={16} color="#FFFFFF" />
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

            <IconSymbol name="phone.fill" size={14} color={CONTACT_COLORS[contact.type]} />
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
    padding: 16,
  },
  header: {
    marginBottom: 12,
    paddingTop: 20,
    alignItems: 'center',
  },
  
  contactsSection: {
    marginBottom: 12,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 6,
    marginBottom: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  contactIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 0,
  },
  contactNumber: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 1,
  },
  contactDescription: {
    fontSize: 9,
    lineHeight: 12,
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
