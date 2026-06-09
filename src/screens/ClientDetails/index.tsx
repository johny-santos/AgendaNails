import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  AppointmentStatus,
  deleteAppointment,
  updateAppointmentStatus,
} from '../../services/appointmentsStorage';

export default function ClientDetails() {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { id, name, time, service, date, description, status } = route.params as any;

  const handleStatus = async (newStatus: AppointmentStatus) => {
    await updateAppointmentStatus(id, newStatus);
    Alert.alert('Atualizado', 'Status do atendimento atualizado.');
    navigation.goBack();
  };

  const handleDelete = () => {
    Alert.alert('Excluir', 'Deseja excluir este atendimento?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          await deleteAppointment(id);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View style={styles.roseView}>
      <View style={styles.alignView}>
        <View style={styles.whiteMainView}>
          <InfoLine label="Nome" value={name} />
          <InfoLine label="Data" value={date} />
          <InfoLine label="Horário" value={time} />
          <InfoLine label="Tipo de serviço" value={service} />
          <InfoLine label="Status" value={status} />
          <InfoLine label="Descrição/Obs" value={description || 'Sem observações'} />
        </View>
      </View>

      <View style={styles.alignView}>
        <TouchableOpacity
          style={styles.buttonsComponent}
          onPress={() => handleStatus('COMPARECEU')}
        >
          <Text style={styles.textButton}>Cliente compareceu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonsComponent}
          onPress={() => handleStatus('FALTOU')}
        >
          <Text style={styles.textButton}>Cliente faltou</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonsComponent}
          onPress={() => handleStatus('DESMARCOU')}
        >
          <Text style={styles.textButton}>Cliente desmarcou</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.alignViewRow}>
        <TouchableOpacity style={styles.rowsButtonsView} onPress={handleDelete}>
          <Text style={styles.textButton}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.textSheet}>
      <Text style={styles.infoLabel}>{label}: </Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  roseView: {
    flex: 1,
    backgroundColor: '#fab4e3ff',
  },

  alignView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
  },

  whiteMainView: {
    width: '87%',
    minHeight: 280,
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 7,
  },

  textSheet: {
    flexDirection: 'row',
    marginTop: 8,
    flexWrap: 'wrap',
  },

  infoLabel: {
    fontWeight: 'bold',
    fontSize: 17,
  },

  infoValue: {
    fontSize: 17,
    flexShrink: 1,
  },

  buttonsComponent: {
    width: '87%',
    height: 50,
    backgroundColor: 'rgba(182, 17, 141, 0.91)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },

  textButton: {
    fontWeight: 'bold',
    color: '#fff',
  },

  alignViewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
  },

  rowsButtonsView: {
    paddingVertical: 18,
    paddingHorizontal: 36,
    backgroundColor: '#D81B60',
    borderRadius: 12,
  },
});
