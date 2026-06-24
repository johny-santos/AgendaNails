import React, { useState, useEffect } from 'react';
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
import { API_URL } from '../../services/api';
import { Service } from '../../types/Service';
import Decimal from 'decimal.js';
import MultiSelectServices from '../../components/MultiSelectServices';
import TimeDropdown from '../../components/TimeDropdown';
import ClientDropdown from '../../components/ClientDropdown';
import { Alert } from 'react-native';



export default function NewPackage() {

interface PackageSession {
  sessionNumber: number;
  services: number[];
}

interface Client {
  id_cliente: number;
  nome_cliente: string;
}
  const [packageSessions, setPackageSessions] =
    useState<PackageSession[]>([
      { sessionNumber: 1, services: [] },
      { sessionNumber: 2, services: [] },
      { sessionNumber: 3, services: [] },
      { sessionNumber: 4, services: [] }
    ]);  
  const [services, setServices] = useState<Service[]>([]);  
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showPicker, setShowPicker] = useState<boolean>(false);

  //const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [selectedStartTime, setSelectedStartTime] = useState<string>('');
  const [totalToPay, setTotalToPay] = useState<Decimal>(new Decimal(0));
  const totalWithDiscount = totalToPay.mul(0.90)
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState<Client[]>([]);
  const [selectClientById, setSelectClientById] = useState<number | null >(null);
  const [datePackageAppointment, setDatePackageAppointment] = useState<Date>(new Date());
  const [packageAppointmentTime, setPackageAppointmentTime] = useState<string>('');
  
  useEffect(() => {
  const selectedIds = packageSessions.flatMap(
    session => session.services
  );

  const total = services
    .filter(service =>
      selectedIds.includes(service.id_servico)
    )
    .reduce(
      (acc, service) =>
        acc.plus(new Decimal(service.valor_base)),
      new Decimal(0)
    );

   
  setTotalToPay(total);
}, [packageSessions, services]);

useEffect(() => {
  console.log('Cliente selecionado:', selectClientById);
}, [selectClientById]);

      const handleSessionServicesChange = (
        sessionIndex: number,
        selectedIds: number[]
      ) => {
        setPackageSessions(prev =>
          prev.map((session, index) =>
            index === sessionIndex
              ? { ...session, services: selectedIds }
              : session
          )
        );
      }; 
      
  
       useEffect(() => {
          async function carregarServicosDropDown() {
            try{
              const [resServices, resClientes] = await Promise.all([
                fetch(`${API_URL}/servicos`),
                fetch(`${API_URL}/clientes`)
              ]);
      
              const servicosData = await resServices.json();
              const clientesData = await resClientes.json()
      
              setServices(servicosData);
              setClient(clientesData)

      
            } catch(error){
              console.log("Erro ao carregar dados: ", error);
      
            } finally {
              setLoading(false);
      
            }
          }
      
          carregarServicosDropDown();
      
        }, []);
      
        if(loading){
          return <Text>Carregando serviços e clientes...</Text>;
        }
  

  const packageTimes: string[] = [];

    for (let hour = 8; hour <= 19; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
            if (hour === 19 && minute > 0) break;

        packageTimes.push(
         `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
        );
     }
    }


  const chosenDate = (event: any, date?: Date): void => {
    setShowPicker(false);

    if (date) {
      setSelectedDate(date);
    }
  };

  console.log(selectedDate);

  console.log(
  selectedDate.toLocaleDateString('pt-BR')
);

  async function handleCreatePackage(){
    try{
      const payload = {
        id_cliente: selectClientById,

        data_inicio_pacote: selectedDate,

        horario_inicio: selectedStartTime,

        servicos1: packageSessions[0].services[0],

        servicos2: packageSessions[1].services[0],

        servicos3: packageSessions[2].services[0],

        servicos4: packageSessions[3].services[0],
      };

      const response = await fetch(`${API_URL}/pacote`,{
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)

      });

      const result = await response.json();

      if (response.ok) {
       Alert.alert(
        "Sucesso",
        "Pacote criado com sucesso!");

        setSelectClientById(null);

        setSelectedStartTime('');

        setSelectedDate(new Date());

        setPackageSessions([
          { sessionNumber: 1, services: [] },
          { sessionNumber: 2, services: [] },
          { sessionNumber: 3, services: [] },
          { sessionNumber: 4, services: [] }
        ]);
      }


    }catch(error){
      console.log(error)
    }
  }

  

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
          <Text style={styles.headerTitle}> Organize clientes recorrentes com facilidade</Text>
         {/*  <Text style={styles.headerSubtitle}>
            Organize clientes recorrentes com facilidade
          </Text> */}
        </View>

        {/* Nome Cliente */}
     <ClientDropdown
        label="Selecione a cliente"
        clients={client}
        selectedValue={selectClientById}
        onSelect={setSelectClientById}
      />

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

        {packageSessions.map((session, index) => (
        <View key={session.sessionNumber}>
         <View
          style={{
            marginTop: 20,
            marginLeft: 15,
            alignSelf: 'flex-start',
            backgroundColor: '#f50958',
            paddingHorizontal: 14,
            paddingVertical: 8,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 15,
            }}
          >
            Sessão {session.sessionNumber}
          </Text>
        </View>

          <MultiSelectServices
            services={services}
            selectedServices={session.services}
            onSelectionChange={(ids) =>
              handleSessionServicesChange(index, ids)
            }
          />
        </View>
      ))}
        
        
        <View style={styles.labelTextContainer}>
          <Text style={styles.labelsText}>Valor bruto do pacote</Text>
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons
            name="cash-outline"
            size={20}
            color="#a0006d"
          />

          <Text
            style={{
              marginLeft: 10,
              fontSize: 16,
              color: '#333'
            }}
          >
            R$ {totalToPay.toFixed(2)}
          </Text>
        </View>

         {/* Desconto */}
        <View style={styles.labelTextContainer}>
          <Text style={styles.labelsText}>Valor com desconto (10%)</Text>
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons
            name="pricetag-outline"
            size={20}
            color="#a0006d"
          />

          <Text
            style={{
              marginLeft: 10,
              fontSize: 16,
              color: '#333'
            }}
          >
            R$ {totalWithDiscount.toFixed(2)}
          </Text>
        </View>

       
        {/* Observação */}
      {/*   <View style={styles.labelTextContainer}>
          <Text style={styles.labelsText}>Observação do pacote</Text>
        </View>

        <View style={styles.textDescricaoContainer}>
          <TextInput
            style={styles.inputTextDescricao}
            multiline={true}
            placeholder="Digite observações importantes..."
            placeholderTextColor="#999"
          />
        </View> */}

        {/* Botão */}
        <TouchableOpacity
          style={styles.buttonToucha}
          activeOpacity={0.85}
          onPress={handleCreatePackage}
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
    paddingTop: 44,
    paddingHorizontal: 22,
    marginBottom: 18,
  },

  headerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#f8eaea',
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
  dropdownButton: {
    minHeight: 58,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#d81b60',
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 14,
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