import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

export default function PackageDetails() {
  const route = useRoute();
  const {  
    name,
    time,
    startDate,
    service,
    price,
    totalPrice,
    remainingSessions,
    totalSessions,
    completedSessions,
    observations, } = route.params as any;

  const progress = (completedSessions / totalSessions) * 100;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pacote Premium ✨</Text>
        <Text style={styles.headerSubtitle}>{name}</Text>
        <Text style={styles.sessionText}>
          Sessão {completedSessions}/{totalSessions}
        </Text>
      </View>

      <View style={styles.detailsCard}>
        <View style={styles.infoRow}>
          <Ionicons name="person-outline" size={20} color="#E91E63" />
          <Text style={styles.infoText}>Nome: {name}</Text>
        </View>

         <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={20} color="#E91E63" />
          <Text style={styles.infoText}>Data início pacote: {startDate}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={20} color="#E91E63" />
          <Text style={styles.infoText}>Horário: {time}</Text>
        </View>

        <View style={styles.infoRow}>
          <MaterialCommunityIcons name="nail" size={20} color="#E91E63" />
          <Text style={styles.infoText}>Serviço: {service}</Text>
        </View>

         <View style={styles.infoRow}>
          <MaterialCommunityIcons name="cash" size={20} color="#E91E63" />
          <Text style={styles.infoText}>Valor bruto: {totalPrice}</Text>
        </View>

        <View style={styles.infoRow}>
          <MaterialCommunityIcons name="cash" size={20} color="#E91E63" />
          <Text style={styles.infoText}>Valor com desconto (10%): {price}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="document-text-outline" size={20} color="#E91E63" />
          <Text style={styles.infoText}>
            Obs: {observations || 'Nenhuma observação'}
          </Text>
        </View>

        <View style={styles.progressSection}>
          <Text style={styles.progressLabel}>Progresso do pacote</Text>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
          </View>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.primaryButton}>
          <Ionicons name="checkmark-circle" size={20} color="#fff" />
          <Text style={styles.primaryButtonText}>Registrar Sessão</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.warningButton}>
          <Ionicons name="alert-circle" size={20} color="#fff" />
          <Text style={styles.primaryButtonText}>Cliente Faltou</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.secondaryActions}>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create-outline" size={18} color="#fff" />
          <Text style={styles.secondaryText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton}>
          <Ionicons name="trash-outline" size={18} color="#fff" />
          <Text style={styles.secondaryText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F8BBD9',
    padding: 20,
  },

  header: {
    marginTop: 30,
    marginBottom: 24,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#880E4F',
  },

  headerSubtitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#AD1457',
    marginTop: 4,
  },

  sessionText: {
    fontSize: 16,
    color: '#6A1B4D',
    marginTop: 4,
  },

  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 24,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  infoText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
    flex: 1,
  },

  progressSection: {
    marginTop: 10,
  },

  progressLabel: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 8,
    color: '#880E4F',
  },

  progressBarBackground: {
    width: '100%',
    height: 12,
    backgroundColor: '#FCE4EC',
    borderRadius: 10,
    overflow: 'hidden',
  },

  progressBarFill: {
    height: '100%',
    backgroundColor: '#E91E63',
    borderRadius: 10,
  },

  actionsContainer: {
    gap: 14,
    marginBottom: 22,
  },

  primaryButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D81B60',
    padding: 16,
    borderRadius: 16,
  },

  warningButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F57C00',
    padding: 16,
    borderRadius: 16,
  },

  primaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },

  secondaryActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  editButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#AB47BC',
    padding: 14,
    borderRadius: 14,
    marginRight: 8,
  },

  deleteButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E53935',
    padding: 14,
    borderRadius: 14,
    marginLeft: 8,
  },

  secondaryText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 6,
  },
}); 