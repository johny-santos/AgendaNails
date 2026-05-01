import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

import MultiSelectServices from '../../components/MultiSelectServices';
import TimeDropdown from '../../components/TimeDropdown';

export default function NewPackage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState<boolean>(false);

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedStartTime, setSelectedStartTime] = useState<string>('');

  const servicesList: string[] = [
    'Manicure',
    'Pedicure',
    'Blindagem',
    'Banho de gel',
    'Alongamento em fibra',
    'Alongamento em gel',
    'Esmaltação em gel',
    'Spa dos pés',
    'Cuticulagem',
    'Francesinha',
    'Encapsulada',
    'Decoração simples',
    'Manutenção',
    'Remoção',
  ];

  const packageTimes: string[] = [];
  for (let hour = 8; hour <= 19; hour++) {
    packageTimes.push(`${hour.toString().padStart(2, '0')}:00`);
  }

  const chosenDate = (event: any, date?: Date): void => {
    setShowPicker(false);

    if (date) {
      setSelectedDate(date);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Novo Pacote</Text>
          <Text style={styles.headerSubtitle}>
            Organize clientes recorrentes com facilidade
          </Text>
        </View>

        {/* Nome Cliente */}
        <View style={styles.labelTextContainer}>
          <Text style={styles.labelsText}>Nome da Cliente</Text>
        </View>

        <View style={styles.textInputContainer}>
          <View style={styles.inputWrapper}>
            <Ionicons name="person-outline" size={20} color="#a0006d" />
            <TextInput
              style={styles.inputText}
              placeholder="Digite o nome da cliente"
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {/* Data início */}
        <View style={styles.labelTextContainer}>
          <Text style={styles.labelsText}>Data de início do pacote</Text>
        </View>

        <View style={styles.textInputContainer}>
          <TouchableOpacity
            style={styles.selectField}
            activeOpacity={0.7}
            onPress={() => setShowPicker(true)}
          >
            <Ionicons name="calendar-outline" size={20} color="#a0006d" />
            <Text style={styles.selectText}>
              {selectedDate.toLocaleDateString('pt-BR')}
            </Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={chosenDate}
            />
          )}
        </View>

        {/* Horário */}
        <TimeDropdown
          label="Horário de atendimento do pacote"
          options={packageTimes}
          selectedValue={selectedStartTime}
          onSelect={setSelectedStartTime}
        />

        {/* Serviços */}
        <MultiSelectServices
          services={servicesList}
          selectedServices={selectedServices}
          onSelectionChange={setSelectedServices}
        />

        {/* Desconto */}
        <View style={styles.labelTextContainer}>
          <Text style={styles.labelsText}>Desconto do pacote</Text>
        </View>

        <View style={styles.textInputContainer}>
          <View style={styles.inputWrapper}>
            <Ionicons name="cash-outline" size={20} color="#a0006d" />
            <TextInput
              style={styles.inputText}
              placeholder="Digite o valor do desconto"
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Observação */}
        <View style={styles.labelTextContainer}>
          <Text style={styles.labelsText}>Observação do pacote</Text>
        </View>

        <View style={styles.textDescricaoContainer}>
          <TextInput
            style={styles.inputTextDescricao}
            multiline={true}
            placeholder="Digite observações importantes..."
            placeholderTextColor="#999"
          />
        </View>

        {/* Botão */}
        <TouchableOpacity
          style={styles.buttonToucha}
          activeOpacity={0.85}
        >
          <Ionicons name="gift-outline" size={22} color="#fff" />
          <Text style={styles.userConfirm}>Criar Pacote</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: '#f8bbd0',
  },

  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 140,
  },

  headerContainer: {
    paddingTop: 50,
    paddingHorizontal: 22,
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },

  headerSubtitle: {
    color: '#fce4ec',
    marginTop: 5,
    fontSize: 15,
  },

  labelTextContainer: {
    marginTop: 10,
    padding: 8,
    marginLeft: 10,
  },

  labelsText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#6a006a',
  },

  textInputContainer: {
    marginLeft: 12,
  },

  inputWrapper: {
    width: '95%',
    backgroundColor: '#fff',
    minHeight: 60,
    borderWidth: 3,
    borderColor: '#a0006d',
    borderRadius: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },

  inputText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },

  selectField: {
    width: '95%',
    backgroundColor: '#fff',
    minHeight: 60,
    borderWidth: 3,
    borderColor: '#a0006d',
    borderRadius: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },

  selectText: {
    color: '#333',
    fontSize: 16,
    marginLeft: 10,
  },

  textDescricaoContainer: {
    marginLeft: 12,
  },

  inputTextDescricao: {
    width: '95%',
    backgroundColor: '#fff',
    height: 120,
    borderWidth: 3,
    borderColor: '#a0006d',
    borderRadius: 12,
    paddingHorizontal: 12,
    textAlignVertical: 'top',
    paddingTop: 12,
    alignSelf: 'center',
  },

  buttonToucha: {
    width: '60%',
    height: 62,
    backgroundColor: '#800080',
    marginTop: 30,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#d81b60',
    borderRadius: 16,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 5,
  },

  userConfirm: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
});