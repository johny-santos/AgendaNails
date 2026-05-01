import React from 'react';
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

type NavigationProps = NativeStackNavigationProp<
  PackagesStackParamList,
  'PackagesMain'
>;

export default function Packages() {
  const navigation = useNavigation<NavigationProps>();

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
      <Text style={styles.summaryNumber}>12</Text>
      <Text style={styles.summaryLabel}>Ativos</Text>
    </View>

    <View style={styles.summaryDivider} />

    <View style={styles.summaryItem}>
        <Text style={styles.summaryNumber}>4</Text>
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

   <PackageCard
      name="Sabrina Sato"
      startDate="22/11/2025"
      service="Manicure Premium"
      price="R$ 180,00"
      remainingSessions={2}
      totalSessions={4}
      completedSessions={2}
      observations="2 sessões restantes"
    />

   <PackageCard
      name="Fernanda Lima"
      startDate="18/11/2025"
      service="Blindagem Premium"
      price="R$ 240,00"
      remainingSessions={1}
      totalSessions={4}
      completedSessions={3}
      observations="Última sessão pendente"
     />
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