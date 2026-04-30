import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Appointments from '../../components/Appointments';

export default function Home() {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onChange = (event: any, date?: Date) => {
    setShowPicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Olá, Mônica ✨</Text>
            <Text style={styles.subtitle}>Sua agenda de hoje</Text>
          </View>

        </View>

        {/* Card Agenda */}
        <View style={styles.dateAppointment}>
          <View style={styles.selectHeader}>
            <Ionicons name="calendar-outline" size={22} color="#E91E63" />
            <Text style={styles.selectText}>Selecione a data</Text>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.quickButton}
              onPress={() => setSelectedDate(new Date())}
            >
              <Text style={styles.quickButtonText}>Hoje</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickButton}
              onPress={() => {
                const tomorrow = new Date(selectedDate);
                tomorrow.setDate(selectedDate.getDate() + 1);
                setSelectedDate(tomorrow);
              }}
            >
              <Text style={styles.quickButtonText}>Amanhã</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowPicker(true)}
            >
              <Text style={styles.quickButtonText}>Escolher data</Text>
            </TouchableOpacity>
          </View>

          {showPicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onChange}
            />
          )}

          <Text style={styles.chosenDateText}>
            Data selecionada: {selectedDate.toLocaleDateString('pt-BR')}
          </Text>
        </View>

        {/* Atendimentos */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Atendimentos agendados</Text>
        </View>

        <Appointments
          name="Maria Silva"
          time="12:00 - 14:00"
          service="Esmaltação em gel"
        />

        <Appointments
          name="Fernanda Souza"
          time="15:00 - 17:00"
          service="Alongamento de unhas"
        />

        <StatusBar style="dark" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#eeb1d8',
    paddingBottom: 30,
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },

  greeting: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222',
  },

  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },


  dateAppointment: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },

  selectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  selectText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#333',
  },

  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 15,
  },

  quickButton: {
    backgroundColor: '#FCE4EC',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },

  dateButton: {
    backgroundColor: '#E91E63',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },

  quickButtonText: {
    color: '#333',
    fontWeight: '600',
  },

  chosenDateText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#555',
  },

  sectionHeader: {
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
}); 