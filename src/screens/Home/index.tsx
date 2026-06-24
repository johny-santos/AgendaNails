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
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Appointments from '../../components/Appointments';
import { API_URL } from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { HomeStackParamList } from '../../routes/home.stack';
import { useAuth } from '../../contexts/AuthContext';


type NavigationProps = NativeStackNavigationProp<HomeStackParamList, 'HomeMain'>;


export default function Home() {
interface Cliente {
  id_cliente: number;
  nome_cliente: string;
  // adicione outras propriedades conforme API retorna
}

interface Atendimento {
  id_atendimento: number;
  fk_cliente_id: number;
  data_atendimento: string, 
  horario_inicio: string;
  horario_fim: string;
  tipo_atendimento: string;
  observacao: string; 
  status: string;
  valor_final: number; 
  // adicione outras propriedades conforme API retorna
}

const navigation = useNavigation<NavigationProps>();

const { user } = useAuth();

console.log(user);

  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);

    async function carregarAtendimentos() {
      try{
        const [resAtendimentos, resClientes] = await Promise.all([
          fetch(`${API_URL}/atendimentos`, {
            headers:{
              Authorization: `Bearer ${user?.token}`
            }
          }),

          fetch(`${API_URL}/clientes`, {
            headers:{
              Authorization: `Bearer ${user?.token}`
            }
          })
        ]);

        const atendimentosData = await resAtendimentos.json();
        const clientesData = await resClientes.json();

        setAtendimentos(atendimentosData);
        setClientes(clientesData);

      } catch(error){
        console.log("Erro ao carregar dados: ", error);

      } finally {
        setLoading(false);

      }
    }

    useFocusEffect(
      useCallback(() => {
        carregarAtendimentos();
      }, [])
    );

  
  if(loading){
    return <Text>Carregando atendimentos...</Text>;
  }

  const onChange = (event: any, date?: Date) => {
    setShowPicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };

  function formatarData(data: string){

    const [ano, mes, dia] = data.split('-');

    return `${dia}/${mes}/${ano}`;

  }

  const atendimentosFiltrados = atendimentos.filter((item) => {

  const [ano, mes, dia] = item.data_atendimento.split('-');

  const dataBanco = `${dia}/${mes}/${ano}`;

  return (
    dataBanco === selectedDate.toLocaleDateString('pt-BR')
  );

});



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
        {atendimentosFiltrados.length === 0 && (

          <View style={styles.emptyContainer}>

            <Ionicons
              name="calendar-outline"
              size={60}
              color="#999"
            />

            <Text style={styles.emptyTitle}>
              Nenhum atendimento encontrado
            </Text>

            <Text style={styles.emptyText}>
              Não existem atendimentos agendados para esta data. Você pode agendar quando quiser na tela "novo atendimento".
            </Text>

          </View>

        )}

        {atendimentosFiltrados.map((item: any) => {
          const cliente = clientes.find(
          (c) => c.id_cliente === item.fk_cliente_id
        );

        return (
         <Appointments
            key={item.id_atendimento}
            name={cliente?.nome_cliente || "Cliente não encontrado"}
            time={`${item.horario_inicio.slice(0,5)} - ${item.horario_fim.slice(0,5)}`}
            service={item.tipo_atendimento}
            status={item.status}
            onPress={() =>
              navigation.navigate('ClientDetails', {
              id_atendimento: item.id_atendimento,  
              name: cliente?.nome_cliente || "Cliente não encontrado",
              time: `${item.horario_inicio.slice(0,5)} - ${item.horario_fim.slice(0,5)}`,
              service: item.tipo_atendimento,
              dateAppointment: formatarData(item.data_atendimento),
              description: item.observacao,
              total: item.valor_final.replace('.',','),
              status: item.status
              })
            }
          />
        );
      })}

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

  emptyContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginTop: 10,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center',
    marginTop: 12,
  },

  emptyText: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginTop: 8,
  },

});

