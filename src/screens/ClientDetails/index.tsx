import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';

import { useRoute } from '@react-navigation/native';

export default function ClientDetails() {
  const route = useRoute();
  const { name, time, service } = route.params as any;

  return (
    <View style={styles.roseView}>
      <View style={styles.alignView}>
        <View style={styles.whiteMainView}>
          <View style={styles.textSheet}>
            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Nome: </Text> 
            <Text style={{ fontSize: 17 }}>{name}</Text>             
          </View>

          <View style={styles.textSheet}>
            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Horário: </Text> 
            <Text style={{ fontSize: 17 }}>{time}</Text>
          </View>

          <View style={styles.textSheet}>  
            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Tipo de serviço: </Text> 
            <Text style={{ fontSize: 17 }}>{service}</Text>
          </View>

          <View style={styles.textSheet}>  
            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Descrição/Obs: </Text> 
            <Text style={{ fontSize: 17 }}>{}</Text>
          </View>

        </View>
      </View>

      <View style={styles.alignView}>
          <TouchableOpacity style={styles.buttonsComponent}>
             <Text style={styles.textButton}>Cliente compareceu</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonsComponent}>
             <Text style={styles.textButton}>Cliente Faltou</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonsComponent}>
             <Text style={styles.textButton}>Cliente Desmarcou</Text>
          </TouchableOpacity>
      </View>

      <View style={styles.alignViewRow}>
         <TouchableOpacity style={styles.rowsButtonsView}>
             <Text style={styles.textButton}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.rowsButtonsView}>
             <Text style={styles.textButton}>Excluir</Text>
          </TouchableOpacity>
          
      </View>

    </View>  
  );
}

const styles = StyleSheet.create({
    roseView:{
      flex: 1,
      backgroundColor: '#fab4e3ff',
    },
    alignView:{
         
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '5%'

    },
    whiteMainView:{
      width: '87%',
      height: 280,
      padding: 14,
      backgroundColor: '#fff',
      borderRadius: 12,

      shadowColor: "#000",
          shadowOffset: { width: 8, height: 8 },
          shadowOpacity: 10.25,
          shadowRadius: 8.84,
          elevation: 7

    },
    textSheet:{
      flexDirection: 'row',
      marginTop: 8,
      fontSize: 13
    },

    buttonsComponent:{
      width: '87%',
      height: 50,
      backgroundColor: 'rgba(182, 17, 141, 0.91)',
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 12,

      
      
    },

    textButton:{
      fontWeight: 'bold',
      color: '#fff'
    },

    alignViewRow:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '5%',

    },
    rowsButtonsView:{
      padding: 25,
      marginLeft: 13,
      backgroundColor: 'rgba(241, 79, 201, 0.91)',
      borderRadius: 12
      
    }


})