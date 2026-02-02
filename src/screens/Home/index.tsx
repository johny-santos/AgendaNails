import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';

export default function Home() {

  const [showPicker, setShowPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onChange = (event: any, date?: Date) => {
    setShowPicker(false);


    if (date) {
      setSelectedDate(date);
    }
  }


  return (
    <View style={styles.container}>

      <View style={styles.dateAppointment}>

        <View style={styles.select}>
          <Text style={styles.selectText}>Selecione a data da agenda:</Text>
        </View>

        <View style={styles.button}>

          <TouchableOpacity style={styles.buttonToday} onPress={() => setSelectedDate(new Date())}>
            <Text>Hoje</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonTomorrow}
            onPress={() => {
              const tomorrow = new Date(selectedDate);
              tomorrow.setDate(selectedDate.getDate() + 1);
              setSelectedDate(tomorrow);
            }}
          >
            <Text>Amanhã</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonDate} onPress={() => setShowPicker(true)}>
            <Text>Selecionar Data...</Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onChange}
            />
          )}

        </View>

        <View style={styles.chosenDate}>
          <Text style={styles.chosenDateText}>Data selecionada: {''}
            {selectedDate
              ? selectedDate.toLocaleDateString('pt-BR')
              : 'dd/mm/yyyy'
            }
          </Text>
        </View>


      </View>

      <View style={styles.content}>
        <Text>Você é lindo Johny</Text>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fab4e3ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  select: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 12,
    marginTop: 3
  },

  selectText: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  dateAppointment: {
    width: '86.7%',
    height: 110,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    marginTop: 14,
    borderRadius: 10,
    boxShadow: '4px 7px 10px rgba(0, 0, 1, 0.4)',

  },
  button: {
    flexDirection: 'row',
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 12,
    alignItems: 'flex-start',


  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonToday: {
    padding: 6,
    backgroundColor: '#f394cfff',
    marginRight: 12,
    borderRadius: 8,
    boxShadow: '3px 3px 6px rgba(0, 0, 1, 0.3)',

  },

  buttonTodayText: {

  },

  buttonTomorrow: {
    padding: 6,
    backgroundColor: '#f394cfff',
    marginRight: 12,
    borderRadius: 8,
    boxShadow: '3px 3px 6px rgba(0, 0, 1, 0.3)',
  },

  buttonDate: {
    padding: 6,
    backgroundColor: '#f394cfff',
    borderRadius: 8,
    boxShadow: '3px 3px 6px rgba(0, 0, 1, 0.3)',
  },

  chosenDate: {
    paddingLeft: 12,
  },

  chosenDateText: {
    fontSize: 15,
    fontWeight: 'bold'
  },
});
