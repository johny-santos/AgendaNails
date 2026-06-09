import { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { addAppointment } from '../../services/appointmentsStorage';

export default function NewClient() {
  const navigation = useNavigation<any>();
  const today = new Date().toLocaleDateString('pt-BR');

  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [service, setService] = useState('');
  const [date, setDate] = useState(today);
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim() || !startTime.trim() || !endTime.trim() || !service.trim() || !date.trim()) {
      Alert.alert('Erro', 'Preencha nome, horários, serviço e data.');
      return;
    }

    setSaving(true);
    try {
      await addAppointment({
        name: name.trim(),
        startTime: startTime.trim(),
        endTime: endTime.trim(),
        service: service.trim(),
        date: date.trim(),
        description: description.trim(),
      });

      Alert.alert('Sucesso', 'Atendimento agendado com sucesso!');
      navigation.goBack();
    } catch {
      Alert.alert('Erro', 'Não foi possível salvar o atendimento.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.helperText}>
        Cadastre o atendimento e ele aparecerá na agenda da data informada.
      </Text>

      <Field
        label="Nome da Cliente*"
        icon="person-outline"
        value={name}
        onChangeText={setName}
        placeholder="Ex.: Maria Silva"
      />

      <Field
        label="Horário inicial*"
        icon="time-outline"
        value={startTime}
        onChangeText={setStartTime}
        placeholder="Ex.: 12:00"
      />

      <Field
        label="Horário final*"
        icon="time-outline"
        value={endTime}
        onChangeText={setEndTime}
        placeholder="Ex.: 14:00"
      />

      <Field
        label="Tipo de atendimento*"
        icon="sparkles-outline"
        value={service}
        onChangeText={setService}
        placeholder="Ex.: Esmaltação em gel"
      />

      <Field
        label="Data do atendimento*"
        icon="calendar-outline"
        value={date}
        onChangeText={setDate}
        placeholder="Ex.: 09/06/2026"
      />

      <View style={styles.labelTextContainer}>
        <Text style={styles.labelsText}>Descrição</Text>
      </View>

      <View style={styles.textDescricaoContainer}>
        <TextInput
          style={styles.inputTextDescricao}
          multiline
          value={description}
          onChangeText={setDescription}
          placeholder="Observações importantes"
          placeholderTextColor="#999"
        />
      </View>

      <TouchableOpacity
        style={[styles.buttonToucha, saving && styles.buttonDisabled]}
        onPress={handleSave}
        disabled={saving}
      >
        <Ionicons name="calendar-outline" size={20} color="#fff" />
        <Text style={styles.userConfirm}>{saving ? 'Salvando...' : 'Agendar'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

interface FieldProps {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
}

function Field({ label, icon, value, onChangeText, placeholder }: FieldProps) {
  return (
    <>
      <View style={styles.labelTextContainer}>
        <Text style={styles.labelsText}>{label}</Text>
      </View>

      <View style={styles.textInputContainer}>
        <View style={styles.inputWrapper}>
          <Ionicons name={icon} size={20} color="#a0006d" />
          <TextInput
            style={styles.inputText}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor="#999"
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fab4e3ff',
  },

  contentContainer: {
    paddingBottom: 32,
  },

  helperText: {
    marginTop: 18,
    marginHorizontal: 18,
    color: '#6a006a',
    fontSize: 15,
    fontWeight: '600',
  },

  labelTextContainer: {
    marginTop: 10,
    padding: 8,
    marginLeft: 10,
  },

  labelsText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#4a004a',
  },

  textInputContainer: {
    marginHorizontal: 12,
  },

  inputWrapper: {
    width: '100%',
    backgroundColor: '#fff',
    minHeight: 60,
    borderWidth: 3,
    borderColor: 'purple',
    borderRadius: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
  },

  inputText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#222',
  },

  textDescricaoContainer: {
    marginHorizontal: 12,
  },

  inputTextDescricao: {
    width: '100%',
    backgroundColor: '#fff',
    minHeight: 105,
    borderWidth: 3,
    borderColor: 'purple',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingTop: 12,
    textAlignVertical: 'top',
    fontSize: 16,
    elevation: 3,
  },

  buttonToucha: {
    width: '60%',
    minHeight: 60,
    backgroundColor: 'purple',
    padding: 14,
    marginTop: 24,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgb(194, 35, 141)',
    borderRadius: 14,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  userConfirm: {
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 8,
    fontSize: 16,
  },
});
