import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { API_URL } from '../../services/api';


export default function ClientDetails() {

  interface Atendimentos_servicos{
    id_atendimento_servico: number,
    valor_aplicado: string,
    fk_servico_id: number,
    fk_atendimento_id: number,

    Servico: {
      id_servico: number,
      nome_servico: string,
      valor_base: string,
      duracao_minutos_servico: number;
      fk_categoria_servico_id: number;
    }
  }

  const route = useRoute();

  const { 
    id_atendimento,
    name, 
    time, 
    service,
    description,
    dateAppointment,
    total,
    status,
  } = route.params as any;

  const [atendimento_servicos, setAtendimento_servicos] = useState<Atendimentos_servicos[]>([]);


  async function listarAtendimentosPorCliente(){
    try {
      const resAtendimentoPorCliente  = await fetch(
        (`${API_URL}/atendimento_servico/atendimento/${id_atendimento}`)
      )

      const atendimentosPorIdData = await resAtendimentoPorCliente.json();

      setAtendimento_servicos(atendimentosPorIdData)

    } catch(error){

      console.log("Erro ao buscar os atendimentos", error);
    
    }
  } 

  useEffect(() => {
    listarAtendimentosPorCliente();
  }, [])

  

  return (

    <ScrollView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{name}</Text>

        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>

      {/* CARD AGENDAMENTO */}
      <View style={styles.card}>

        <Text style={styles.sectionTitle}>📅 Informações do Atendimento</Text>

        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={20} color="#d81b60" />
          <Text style={styles.infoText}>Data: {dateAppointment}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={20} color="#d81b60" />
          <Text style={styles.infoText}>Horário: {time}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="sparkles-outline" size={20} color="#d81b60" />
          <Text style={styles.infoText}>{service}</Text>
        </View>

      </View>

      
      <View style={styles.card}>

        <Text style={styles.sectionTitle}>💅 Serviços</Text>
        
        {atendimento_servicos.map((item) => (

          <View
            key={item.id_atendimento_servico}
            style={styles.infoRow}
          >

            <Ionicons
              name="sparkles-outline"
              size={20}
              color="#d81b60"
            />

            <Text style={styles.infoText}>
              {item.Servico.nome_servico}
            </Text>

          </View>

        ))}
      </View>

      {/* CARD VALOR */}
      <View style={styles.card}>

        <Text style={styles.sectionTitle}>💰 Valor Total</Text>

        <Text style={styles.totalText}>
          R$ {total}
        </Text>

      </View>

      {/* CARD OBSERVAÇÕES */}
      <View style={styles.card}>

        <Text style={styles.sectionTitle}>📝 Observações</Text>

        <Text style={styles.descriptionText}>
          {description || 'Nenhuma observação adicionada.'}
        </Text>

      </View>

      {/* BOTÕES STATUS */}
      <View style={styles.actionsContainer}>

        <TouchableOpacity style={styles.successButton}>
          <Text style={styles.buttonText}>Cliente Compareceu</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.warningButton}>
          <Text style={styles.buttonText}>Reagendar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dangerButton}>
          <Text style={styles.buttonText}>Cliente Cancelou</Text>
        </TouchableOpacity>

      </View>

      {/* BOTÕES FINAIS */}
      <View style={styles.footerButtons}>

        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create-outline" size={20} color="#fff" />
          <Text style={styles.footerButtonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton}>
          <Ionicons name="trash-outline" size={20} color="#fff" />
          <Text style={styles.footerButtonText}>Excluir</Text>
        </TouchableOpacity>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fab4e3ff',
    paddingHorizontal: 16,
    paddingTop: 25,
  },

  header: {
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6a006a',
  },

  statusBadge: {
    marginTop: 10,
    backgroundColor: '#d81b60',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 5,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6a006a',
    marginBottom: 14,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },

  totalText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#d81b60',
  },

  descriptionText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },

  actionsContainer: {
    marginTop: 10,
  },

  successButton: {
    backgroundColor: '#2e7d32',
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  warningButton: {
    backgroundColor: '#f9a825',
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  dangerButton: {
    backgroundColor: '#c62828',
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  footerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 40,
  },

  editButton: {
    flexDirection: 'row',
    backgroundColor: '#ab47bc',
    width: '47%',
    height: 55,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  deleteButton: {
    flexDirection: 'row',
    backgroundColor: '#e53935',
    width: '47%',
    height: 55,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  footerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },

});