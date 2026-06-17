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
import { useCallback, useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Appointments from '../../components/Appointments';
import apiService from '../../services/apiService';
import {
  Appointment,
  listAppointmentsByDate,
} from '../../services/appointmentsStorage';

export default function Home() {
  const navigation = useNavigation<any>();
  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [nomeUsuario, setNomeUsuario] = useState('Profissional');
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const selectedDateText = selectedDate.toLocaleDateString('pt-BR');

  // Carrega o nome da profissional salva no login/cadastro para personalizar a saudação.
  useEffect(() => {
    const carregarUsuario = async () => {
      const profissional = await apiService.obterUsuarioArmazenado();
      if (profissional?.nome) {
        setNomeUsuario(profissional.nome);
      }
    };

    carregarUsuario();
  }, []);

  // Recarrega os atendimentos sempre que a tela ganha foco ou a data muda.
  // Isso faz um novo atendimento aparecer na Home assim que o usuário volta da tela de cadastro.
  useFocusEffect(
    useCallback(() => {
      const carregarAtendimentos = async () => {
        const data = await listAppointmentsByDate(selectedDateText);
        setAppointments(data);
      };

      carregarAtendimentos();
    }, [selectedDateText])
  );

  const handleNovoAtendimento = () => {
    // A tela NewClient está registrada no RootRoutes, por isso subimos dois níveis na navegação.
    navigation.getParent()?.getParent()?.navigate('NewClient');
  };

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
            <Text style={styles.greeting}>Olá, {nomeUsuario} ✨</Text>
            <Text style={styles.subtitle}>Sua agenda de hoje</Text>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={handleNovoAtendimento}
            activeOpacity={0.8}
          >
            <Ionicons name="add" size={28} color="#FFF" />
          </TouchableOpacity>

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
            Data selecionada: {selectedDateText}
          </Text>
        </View>

        {/* Atendimentos */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Atendimentos agendados</Text>
        </View>

        {appointments.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons name="calendar-clear-outline" size={28} color="#E91E63" />
            <Text style={styles.emptyText}>Nenhum atendimento para esta data.</Text>
          </View>
        ) : (
          // Renderiza os atendimentos salvos no AsyncStorage para a data selecionada.
          appointments.map((appointment) => (
            <Appointments
              key={appointment.id}
              id={appointment.id}
              name={appointment.name}
              time={`${appointment.startTime} - ${appointment.endTime}`}
              service={appointment.service}
              date={appointment.date}
              description={appointment.description}
              status={appointment.status}
            />
          ))
        )}

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

  addButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#f394cfff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
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

  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 22,
    alignItems: 'center',
    elevation: 3,
  },

  emptyText: {
    color: '#666',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
}); 
