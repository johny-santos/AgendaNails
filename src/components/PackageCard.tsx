import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PackagesStackParamList } from '../routes/packages.stack';
import ProgressSessions from './ProgressSessions';

interface PackageCardProps {
  name: string;
  time: string;
  startDate: string;
  service: string;
  price: string;
  totalPrice: string;
  remainingSessions: number;
  totalSessions: number;
  completedSessions: number;
  observations?: string;
}

type NavigationProps = NativeStackNavigationProp<
  PackagesStackParamList,
  'PackagesMain'
>;

export default function PackageCard({
  name,
  time,
  startDate,
  service,
  price,
  totalPrice,
  remainingSessions,
  totalSessions,
  completedSessions,
  observations,
}: PackageCardProps) {
  const navigation = useNavigation<NavigationProps>();

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.card}
      onPress={() =>
        navigation.navigate('PackageDetails', {
          name,
          time,
          startDate: startDate,
          service,
          price,
          totalPrice,
          remainingSessions,
          totalSessions,
          completedSessions,
          observations,
        })
      }
    >
      {/* Topo */}
      <View style={styles.header}>
        <View>
          <Text style={styles.clientName}>{name}</Text>
          <Text style={styles.startDate}>Início: {startDate}</Text>
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {remainingSessions} restantes
          </Text>
        </View>
      </View>

      {/* Divisor */}
      <View style={styles.divider} />

      {/* Rodapé */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.price}>{price}</Text>
          <Text style={styles.discount}>Pacote promocional</Text>
          <Text style={styles.price}>{totalPrice}</Text>
          <Text style={styles.discount}>Valor bruto</Text>
        </View>


        <View style={styles.progressArea}>
          <ProgressSessions
            total={totalSessions}
            done={completedSessions}
          />
          <Text style={styles.sessionText}>
            Sessão {completedSessions}/{totalSessions}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '92%',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginTop: 14,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  clientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2b2b2b',
  },

  startDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },

  badge: {
    backgroundColor: '#E91E63',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 14,
  },

  badgeText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 13,
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    marginVertical: 14,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2b2b2b',
  },

  discount: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  },

  progressArea: {
    alignItems: 'center',
  },

  sessionText: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: '600',
    color: '#444',
  },
}); 