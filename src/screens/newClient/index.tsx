import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Platform,
    KeyboardAvoidingView
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import TimeDropdown from '../../components/TimeDropdown';
import MultiSelectServices from '../../components/MultiSelectServices';
import { API_URL } from '../../services/api';
import Decimal from 'decimal.js';
import { Service } from '../../types/Service';


export default function NewClient() {

    const [clientName, setClientName] = useState<string>('');
    const [clientPhone, setClientPhone] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [totalToPay, setTotalToPay] = useState<Decimal>(new Decimal(0));
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const [startTime, setStartTime] = useState<string>('');
    const [endTime, setEndTime] = useState<string>('');
    const [services, setServices] = useState<Service[]>([]);
    const [selectedServices, setSelectedServices] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const total = services
        .filter(service => selectedServices.includes(service.id_servico))
        .reduce(
          (acc, service) => acc.plus(new Decimal(service.valor_base)),
          new Decimal(0)
        );

        setTotalToPay(total);

      }, [selectedServices, services]);  
    

     useEffect(() => {
        async function carregarServicosDropDown() {
          try{
            const [resServices] = await Promise.all([
              fetch(`${API_URL}/servicos`)
            ]);
    
            const servicosData = await resServices.json();
            
    
            setServices(servicosData);
    
          } catch(error){
            console.log("Erro ao carregar dados: ", error);
    
          } finally {
            setLoading(false);
    
          }
        }
    
        carregarServicosDropDown();
    
      }, []);
    
      if(loading){
        return <Text>Carregando serviços...</Text>;
      }


  const generateStartTimes = (): string[] => {
    const times: string[] = [];

    for (let hour = 8; hour <= 19; hour++) {
     times.push(`${hour.toString().padStart(2, '0')}:00`);
    }

    return times;
    };

  const generateEndTimes = (): string[] => {
  const times: string[] = [];

    for (let hour = 8; hour <= 19; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
            if (hour === 19 && minute > 0) break;

        times.push(
         `${hour.toString().padStart(2, '0')}:${minute
         .toString()
            .padStart(2, '0')}`
        );
     }
    }

    return times;
    };

  const onChangeDate = (event: any, selected?: Date): void => {
    setShowDatePicker(false);

    if (selected) {
        setSelectedDate(selected);
    }
    }; 
  
  async function handleCreateAppointment() {
    try {
      const response = await fetch(`${API_URL}/agendamentoCompleto`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome_cliente: clientName,
          telefone: clientPhone,
          data_atendimento: selectedDate.toISOString().split("T")[0],
          horario_inicio: startTime,
          horario_fim: endTime,
          observacao: description,
          servicos: selectedServices
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Atendimento criado com sucesso!");

        setClientName('');
        setClientPhone('');
        setDescription('');
        setSelectedServices([]);
        setStartTime('');
        setEndTime('');

      } else {
        alert(data.erro || "Erro ao criar atendimento");
      }

    } catch (error) {
      console.log("Erro:", error);
      alert("Erro ao conectar com servidor");
    }
  }

  return (

   <KeyboardAvoidingView
    style={{flex:1}} 
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
    <ScrollView style={styles.container}>
     {/* HEADER */}
     <View style={styles.header}>
       <Text style={styles.headerTitle}>Cadastre sua cliente de forma rápida</Text>
       <Text style={styles.headerSubtitle}>
         
       </Text>
     </View>

    {/* NOME */}
    <View style={styles.labelContainer}>
      <Text style={styles.label}>Nome da Cliente</Text>
    </View>

    <TextInput
     style={styles.input}
     placeholder="Digite o nome da cliente"
     value={clientName}
     onChangeText={setClientName}
     />

  {/* TELEFONE */}
    <View style={styles.labelContainer}>
      <Text style={styles.label}>Telefone</Text>
    </View>

    <TextInput
     style={styles.input}
     placeholder="(00) 00000-0000"
     keyboardType="phone-pad"
     value={clientPhone}
     onChangeText={setClientPhone}
    />

  {/* DATA */}
    <View style={styles.labelContainer}>
      <Text style={styles.label}>Data do Atendimento</Text>
    </View>

    <TouchableOpacity
     style={styles.input}
     onPress={() => setShowDatePicker(true)}
    >
        <Text style={styles.dateText}>
        {selectedDate.toLocaleDateString('pt-BR')}
        </Text>
    </TouchableOpacity>

    {showDatePicker && (
        <DateTimePicker
            value={selectedDate}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onChangeDate}
        />
     )}

  {/* HORÁRIOS */}
    <TimeDropdown
      label="Horário Inicial"
      options={generateStartTimes()}
      selectedValue={startTime}
      onSelect={setStartTime}
    />

    <TimeDropdown
      label="Horário Final"
      options={generateEndTimes()}
      selectedValue={endTime}
      onSelect={setEndTime}
    />
  {/* SERVIÇOS */}
    <MultiSelectServices
      services={services}
      selectedServices={selectedServices}
      onSelectionChange={setSelectedServices}
    />

    <View style={styles.labelContainer}>
      <Text style={styles.label}>Preço atendimento</Text>
    </View>

    <View style={styles.input}>
  <Text style={styles.currencyInside}>R$</Text>

  <TextInput
    style={styles.priceInput}
    placeholder="150,00"
    keyboardType="decimal-pad"
    value={totalToPay.toFixed(2).replace('.', ',')}
    onChangeText={(text) => {
      try {
        const normalized = text.replace(',', '.');
        const value = new Decimal(normalized || 0);
        setTotalToPay(value);
      } catch (error) {}
    }}
  />
</View>

 {/* OBSERVAÇÕES */}
    <View style={styles.labelContainer}>
      <Text style={styles.label}>Descrição / Observações</Text>
    </View>

   <TextInput
     style={styles.descriptionInput}
     placeholder="Digite observações importantes..."
     multiline={true}
     value={description}
     onChangeText={setDescription}
    />

 {/* BOTÃO */}
    <TouchableOpacity
     style={styles.createButton}
     onPress={handleCreateAppointment}
    >
      <Text style={styles.createButtonText}>Criar Atendimento</Text>
     </TouchableOpacity>

     <View style={{ height: 30 }} />
    </ScrollView>
   </KeyboardAvoidingView> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8bbd0',
  },

  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    backgroundColor: '#d81b60',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  headerTitle: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },

  headerSubtitle: {
    color: '#fce4ec',
    marginTop: 5,
    fontSize: 15,
  },

  labelContainer: {
    marginTop: 18,
    paddingHorizontal: 16,
  },

  label: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#6a006a',
  },

  input: {
    width: '95%',
    minHeight: 58,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#d81b60',
    borderRadius: 12,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginTop: 8,
  },

  dateText: {
    fontSize: 16,
    color: '#333',
  },

  descriptionInput: {
    width: '95%',
    height: 120,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#d81b60',
    borderRadius: 12,
    alignSelf: 'center',
    paddingHorizontal: 14,
    paddingTop: 12,
    textAlignVertical: 'top',
    marginTop: 8,
  },

  createButton: {
    width: '60%',
    height: 60,
    backgroundColor: '#c2185b',
    alignSelf: 'center',
    marginTop: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#880e4f',
  },

  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
 },

  currencyInside: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
  },

  priceInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },

});