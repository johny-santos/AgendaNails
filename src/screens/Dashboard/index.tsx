import { View, Text, StyleSheet } from 'react-native';
import { Header } from '../../components/Header';

export default function Dashboard() {
  return (
    <>
    
    
    <View style={styles.main}>
      <Text style={styles.content}>Dashboard</Text>
    </View>
    
    </>
  );
}

const styles = StyleSheet.create({
    main:{
        flex: 1,
        backgroundColor: "purple",
        alignItems: 'center',
        justifyContent: 'center',
    
    },

    content:{
       fontSize: 23,

    },

});