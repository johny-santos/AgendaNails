import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

interface AppointmentsProps {
  name: string;
  time: string;
  service: string;

  dateAppointment?: string;
  description?: string;
  total?: string;
  status?: string;

  onPress?: () => void;
}

export default function Appointments({
  name,
  time,
  service,
  status,
  onPress
}: AppointmentsProps) {

  return (
    <TouchableOpacity
      style={styles.mainCard}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <View style={styles.topRow}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person" size={26} color="#E91E63" />
        </View>

        <View style={styles.clientInfo}>
          <Text style={styles.nameCard}>{name}</Text>

          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={16} color="#777" />
            <Text style={styles.timeText}>{time}</Text>
          </View>

          <View style={styles.infoRow}>
            <MaterialCommunityIcons
              name="nail"
              size={16}
              color="#777"
            />
            <Text style={styles.serviceText}>{service}</Text>
          </View>

          {status && (
            <View style={styles.statusContainer}>
              <Text style={styles.statusText}>{status}</Text>
            </View>
          )}
        </View>

        <Ionicons name="chevron-forward" size={22} color="#CCC" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  avatarContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FCE4EC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  clientInfo: {
    flex: 1,
  },

  nameCard: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },

  timeText: {
    marginLeft: 6,
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },

  serviceText: {
    marginLeft: 6,
    color: '#666',
    fontSize: 14,
  },

  statusContainer: {
    marginTop: 6,
    backgroundColor: '#FCE4EC',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },

  statusText: {
    color: '#C2185B',
    fontWeight: 'bold',
    fontSize: 12,
  },
});