import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Alert,
  Modal,
  TextInput 
} from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { API_URL } from '../../services/api';


export default function ClientDetails() {

  interface AtendimentoDetalhes{
    id_atendimento: number;
    data_atendimento: string;
    horario_inicio: string;
    horario_fim: string;
    observacao: string;
    valor_final: string;
    status: string;
  }

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
  const navigation = useNavigation();

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
  const [modalEditarVisible, setModalEditarVisible] = useState(false);
  const [atendimento, setAtendimento] = useState<AtendimentoDetalhes | null>(null);
  const [dataAtendimento, setDataAtendimento] = useState('');
  const [horarioInicio, setHorarioInicio] = useState('');
  const [horarioFim, setHorarioFim] = useState('');
  const [observacao, setObservacao] = useState('');
  const [valorFinal, setValorFinal] = useState('');

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

  async function buscarAtendimentoPorId(){
    try{
      const response = await fetch(
        `${API_URL}/atendimentos/${id_atendimento}`
      );

      const data = await response.json();

      setAtendimento(data);

    } catch(error){
        console.log("Erro ao buscar atendimento: ", error);
    }
  }

  useEffect(() => {
    listarAtendimentosPorCliente();
    buscarAtendimentoPorId();
  }, [])

  useEffect(() => {
    if(!atendimento) return;

    setDataAtendimento(
      formatarData(atendimento.data_atendimento)
    );
    setHorarioInicio(
      formatarHorario(atendimento.horario_inicio)
    );
    setHorarioFim(
      formatarHorario(atendimento.horario_fim)
    );
    setObservacao(atendimento.observacao || '');
   
    setValorFinal(
     formatarValorBrasileiro(atendimento.valor_final)
    );

  }, [atendimento]);

  useEffect(() => {
    console.log("ATENDIMENTO:", atendimento);
  }, [atendimento]);

    async function alterarStatusAtendimentos(novoStatus: string){
      try{
        const response = await fetch(
          `${API_URL}/atendimentos/${id_atendimento}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              status: novoStatus
            })
          }
        );

        const data = await response.json();

        Alert.alert(
          'Sucesso!',
          `Atendimento atualizado para o status ${novoStatus}`
        );

        console.log(data);

      } catch(error){
          console.log(error)

          Alert.alert(
            'Erro',
            'Não foi possível atualizar o atendimento...'
          );
      }
    }

    function confirmarExclusaoAtendimento(){
      Alert.alert(
        'Excluir atendimento',
        'Você tem certeza que deseja excluir esse atendimento? Essa ação não pode ser desfeita.',
        [
          {
            text: 'Cancelar',
            style: 'cancel'
          },
          {
            text: 'Excluir',
            style: 'destructive',
            onPress: () => deletarAtendimentoCliente()
          }          
        ]
      )
    }

   async function deletarAtendimentoCliente(){
    try{

      const response = await fetch(
        `${API_URL}/atendimentos/${id_atendimento}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
        }
      )
     
      const data = await response.json();

      console.log("3 - json ok", data)

      Alert.alert(
        'Sucesso!',
        'Atendimento excluído com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      )
      
    } catch(error){

      console.log("ERRO DELETE COMPLETO:", error)

      Alert.alert(
        'Erro',
        'Não foi possível fazer a exclusão do atendimento'
      )

    }
  }

  async function atualizarAtendimento(){
    try{
      console.log("Data Enviada: ", formatarDataBanco(dataAtendimento));
      const response = await fetch(
        `${API_URL}/atendimentos/${id_atendimento}`,
        
        {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body : JSON.stringify({
            data_atendimento: formatarDataBanco(dataAtendimento),
            horario_inicio: horarioInicio,
            horario_fim: horarioFim,
          //  valor_final: valorFinal,        
            observacao,
          })
        }
      );

      const data = await response.json();

      console.log('UPDATE: ', data);

      Alert.alert(
        "Sucesso!",
        "Atendimento atualizado!",
        [
          {
            text: "OK",
            onPress: () => {
              setModalEditarVisible(false);
              buscarAtendimentoPorId();
            }
          }
        ]
      )

    } catch(error){
        console.log(
          "Erro no UPDATE: ",
          error);

        Alert.alert(
          "Erro",
          "Não foi possível atualizar"
        );
    }
  } 

  function formatarData(data: string){
    const[ano, mes, dia] = data.split('-');

    return `${dia}/${mes}/${ano}`;
  }

  function formatarDataBanco(data: string){
    const [dia, mes, ano] = data.split('/');

    return `${ano}-${mes}-${dia}`;
  }

  function formatarHorario(horario: string){
    return horario.slice(0,5);
  }

  function formatarValorBrasileiro(valor: string){
    return valor.replace('.', ',');
  }

  return (

    <ScrollView style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{name}</Text>

        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{atendimento?.status || status}</Text>
        </View>
      </View>

      {/* CARD AGENDAMENTO */}
      <View style={styles.card}>

        <Text style={styles.sectionTitle}>📅 Informações do Atendimento</Text>

        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={20} color="#d81b60" />
          <Text style={styles.infoText}>
            Data: {
              atendimento
              ? formatarData(atendimento.data_atendimento)
              : dateAppointment
            }</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={20} color="#d81b60" />
          <Text style={styles.infoText}>
            Horário: {
              atendimento
              ? `${formatarHorario(atendimento.horario_inicio)} - ${formatarHorario(atendimento.horario_fim)}`
              : time    
            }</Text>
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
          R$ {
          atendimento
          ? formatarValorBrasileiro(atendimento?.valor_final) 
          : total
          }
        </Text>

      </View>

      {/* CARD OBSERVAÇÕES */}
      <View style={styles.card}>

        <Text style={styles.sectionTitle}>📝 Observações</Text>

        <Text style={styles.descriptionText}>
          {atendimento?.observacao || 'Nenhuma observação adicionada.'}
        </Text>

      </View>

      {/* BOTÕES STATUS */}
      <View style={styles.actionsContainer}>

        <TouchableOpacity
          style={styles.successButton}
          onPress={() => alterarStatusAtendimentos('REALIZADO')}
        >
          <Text style={styles.buttonText}>
            Cliente Compareceu
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.warningButton}
          onPress={() => setModalEditarVisible(true)}
          >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.dangerButton}
          onPress={() => alterarStatusAtendimentos('FALTOU')}
        >
          <Text style={styles.buttonText}>Cliente Cancelou</Text>
        </TouchableOpacity>

      </View>

      {/* BOTÕES FINAIS */}
      <View style={styles.footerButtons}>

       {/*  <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create-outline" size={20} color="#fff" />
          <Text style={styles.footerButtonText}>Editar</Text>
        </TouchableOpacity> */}

        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={confirmarExclusaoAtendimento}
        >
          <Ionicons name="trash-outline" size={50} color="#fff" />
          <Text style={styles.footerButtonText}>Excluir</Text>
        </TouchableOpacity>

      </View>

    <Modal
      visible={modalEditarVisible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalOverlay}>

        <View style={styles.modalContainer}>

          <Text style={styles.modalTitle}>
            Editar Atendimento
          </Text>

          <Text style={styles.inputLabel}>
            Data do Atendimento
          </Text>

          <TextInput
            style={styles.input}
            value={dataAtendimento}
            onChangeText={setDataAtendimento}
            placeholder="Data"
          />

          <Text style={styles.inputLabel}>
            Horário Inicial
          </Text>

          <TextInput
            style={styles.input}
            value={horarioInicio}
            onChangeText={setHorarioInicio}
            placeholder="Horário Início"
          />

          <Text style={styles.inputLabel}>
            Horário Final
          </Text>

          <TextInput
            style={styles.input}
            value={horarioFim}
            onChangeText={setHorarioFim}
            placeholder="Horário Fim"
          />

          <Text style={styles.inputLabel}>
            Observações
          </Text>

          <TextInput
            style={styles.inputObservacao}
            value={observacao}
            onChangeText={setObservacao}
            placeholder="Digite observações..."
            multiline
          />

          <View style={styles.modalButtons}>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalEditarVisible(false)}
            >
              <Text style={styles.modalButtonText}>
                Cancelar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={atualizarAtendimento}
            >
              <Text style={styles.modalButtonText}>
                Salvar
              </Text>
            </TouchableOpacity>

          </View>

        </View>

      </View>
    </Modal>

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

  modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.5)',
  justifyContent: 'center',
  alignItems: 'center',
},

modalContainer: {
  width: '90%',
  backgroundColor: '#fff',
  borderRadius: 20,
  padding: 20,
  elevation: 8,
},

modalTitle: {
  fontSize: 22,
  fontWeight: 'bold',
  color: '#6a006a',
  textAlign: 'center',
  marginBottom: 20,
},

inputLabel: {
  fontSize: 14,
  fontWeight: '600',
  color: '#555',
  marginBottom: 5,
  marginTop: 10,
},

input: {
  borderWidth: 1,
  borderColor: '#ddd',
  borderRadius: 12,
  paddingHorizontal: 12,
  paddingVertical: 10,
  backgroundColor: '#fafafa',
},

inputObservacao: {
  borderWidth: 1,
  borderColor: '#ddd',
  borderRadius: 12,
  paddingHorizontal: 12,
  paddingVertical: 10,
  backgroundColor: '#fafafa',
  height: 90,
  textAlignVertical: 'top',
},

modalButtons: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 25,
},

cancelButton: {
  flex: 1,
  backgroundColor: '#9e9e9e',
  paddingVertical: 14,
  borderRadius: 12,
  alignItems: 'center',
  marginRight: 8,
},

saveButton: {
  flex: 1,
  backgroundColor: '#d81b60',
  paddingVertical: 14,
  borderRadius: 12,
  alignItems: 'center',
  marginLeft: 8,
},

modalButtonText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
},

});