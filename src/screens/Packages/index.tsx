import React from 'react';
import { useState, useEffect } from 'react';
import {
 View,
 Text,
 StyleSheet,
 ScrollView,
 TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PackagesStackParamList } from '../../routes/packages.stack';
import PackageCard from '../../components/PackageCard';
import { API_URL } from '../../services/api';

type NavigationProps = NativeStackNavigationProp<
  PackagesStackParamList,
  'PackagesMain'
>;

export default function Packages() {

interface Package {
  id_pacote: number,
  nome_cliente: string;
  horario_inicio_pacote: string;
  data_inicio_pacote: string;
  valor_com_desconto: string;
  valor_bruto: string;
  status: string;
  num_sessoes: number;
  sessoes_concluidas: number;
  sessoes_restantes: number;
};

  const navigation = useNavigation<NavigationProps>();

  const [ packages, setPackages ] = useState<Package[]>([]);
  const [ loading, setLoading ] = useState(true);
  //const [pacotes, setPacotes] = useState([]);

  useEffect(() => {
    async function loadPackages(){
      try{
        const response = await fetch(`${API_URL}/pacote`);

        const data = await response.json();

        console.log(data);

        setPackages(data);

      }catch(error){
        console.log(
          'Erro ao carregar os pacotes:', error
        )
      } finally{
        setLoading(false);
      }
    }

    loadPackages();  

  }, [])

  if(loading){
    return (
      <Text>
        Carregando pacotes ...
      </Text>
    );
  }

  const totalPacotes = packages.length;

  const pacotesConcluidos = packages.filter(
    (item: any) => item.status_pacote === 'CONCLUÍDO'
  ).length;



  return (
    <View style={styles.container}>
     <ScrollView
       contentContainerStyle={styles.scrollContainer}
       showsVerticalScrollIndicator={false}
     >
       {/* Header */}
       <View style={styles.header}>
         <Text style={styles.greeting}>Pacotes</Text>
          <Text style={styles.subtitle}>
            Gerencie clientes com sessões recorrentes
         </Text>
      </View>

  {/* Resumo */}
    <View style={styles.summaryCard}>
    <View style={styles.summaryItem}>
      <Text style={styles.summaryNumber}>{totalPacotes}</Text>
      <Text style={styles.summaryLabel}>Ativos</Text>
    </View>

    <View style={styles.summaryDivider} />

    <View style={styles.summaryItem}>
        <Text style={styles.summaryNumber}>{pacotesConcluidos || 0}</Text>
        <Text style={styles.summaryLabel}>Finalizados</Text>
     </View>

     <View style={styles.summaryDivider} />

      <View style={styles.summaryItem}>
        <Text style={styles.summaryNumber}>R$ 2.4k</Text>
        <Text style={styles.summaryLabel}>Receita</Text>
      </View>
    </View>

  {/* Lista */}
   <Text style={styles.sectionTitle}>Pacotes em aberto:</Text>

    {packages.map(pkg => (
      <PackageCard
        key={pkg.id_pacote}
        name={pkg.nome_cliente}
        time={pkg.horario_inicio_pacote}
        startDate={
          new Date(
            pkg.data_inicio_pacote
          ).toLocaleDateString('pt-BR')
        }
        service="Pacote"
        price={`R$ ${pkg.valor_com_desconto}`}
        totalPrice={`R$ ${pkg.valor_bruto}`}
        remainingSessions={pkg.sessoes_restantes}
        totalSessions={pkg.num_sessoes}
        completedSessions={pkg.sessoes_concluidas}
        observations={`${pkg.sessoes_restantes} sessões restantes.`}
      />

    ))}

   </ScrollView>

{/* Botão flutuante */}
     <TouchableOpacity
       style={styles.floatingButton}
       onPress={() => navigation.navigate('NewPackage')}
     >
       <Ionicons name="add" size={30} color="#FFF" />
     </TouchableOpacity>
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: '#f8bbd0',
  },

  scrollContainer: {
   paddingBottom: 100,
  },

  header: {
   paddingTop: 50,
   paddingHorizontal: 24,
   paddingBottom: 20,
  },

  greeting: {
   fontSize: 30,
   fontWeight: 'bold',
   color: '#2b2b2b',
  },

  subtitle: {
   fontSize: 15,
   color: '#6b6b6b',
   marginTop: 6,
  },

  summaryCard: {
   width: '92%',
   alignSelf: 'center',
   backgroundColor: '#fff',
   borderRadius: 22,
   paddingVertical: 22,
   flexDirection: 'row',
   justifyContent: 'space-around',
   alignItems: 'center',

   shadowColor: '#000',
   shadowOffset: { width: 0, height: 4 },
   shadowOpacity: 0.08,
   shadowRadius: 8,
   elevation: 4,
  },

  summaryItem: {
   alignItems: 'center',
  },

  summaryNumber: {
   fontSize: 20,
   fontWeight: 'bold',
   color: '#E91E63',
  },

summaryLabel: {
   fontSize: 13,
   color: '#666',
   marginTop: 4,
  },

summaryDivider: {
   width: 1,
   height: 40,
   backgroundColor: '#EEE',
  },

sectionTitle: {
   fontSize: 20,
   fontWeight: 'bold',
   color: '#2b2b2b',
   marginTop: 26,
   marginLeft: 22,
   marginBottom: 8,
  },

floatingButton: {
   position: 'absolute',
   right: 24,
   bottom: 30,
   width: 64,
   height: 64,
   borderRadius: 32,
   backgroundColor: '#E91E63',
   justifyContent: 'center',
   alignItems: 'center',

shadowColor: '#E91E63',
   shadowOffset: { width: 0, height: 4 },
   shadowOpacity: 0.35,
   shadowRadius: 6,
   elevation: 8,
 },
});