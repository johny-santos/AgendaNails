import React from 'react';
import { Image, Platform, StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

//Define o que ele pode receber de fora para considerar o Header de uma Página
interface HeaderProps {
  title?: string; //Conteúdo do Header;
  showAddButton?: boolean; //Controla se o Botão aparece ou não;
  onAddPress?: () => void; // Função de baixo acoplamento que dispara ao botão ser clicado;
}

export function Header({ 
  title = 'AgendaNails',
  showAddButton = false, 
  onAddPress, 
}: HeaderProps) {
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {showAddButton && ( // Se a condição do ShowAddButton for verdadeira aparece o botão:
        <TouchableOpacity 
          style={styles.plusDiv}
          onPress={onAddPress}
          activeOpacity={0.7}
        >
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
        )}
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 105,
    width: '100%',
    backgroundColor: '#ffffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 2,
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
    boxShadow: '3px 6px 8px rgba(0, 0, 1, 0.2)',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 7, 
    
  },
  plusDiv:{
    display: 'flex',
    justifyContent:'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#f394cfff',
    borderRadius: 30,
    marginRight: 7,
     boxShadow: '3px 3px 6px rgba(0, 0, 1, 0.3)',
  },
  plus:{
    color: '#FFF',
    fontSize: 25,
    fontWeight: 'bold',
    lineHeight: 40,
    
  },
  logo: {
    width: 110,
    height: 70,
  }
});