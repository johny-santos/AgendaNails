import React from 'react';
import { Image, Platform, StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


//Define o que ele pode receber de fora para considerar o Header de uma Página
interface HeaderProps {
  title?: string; //Conteúdo do Header;
  showAddButton?: boolean; //Controla se o Botão aparece ou não;
  actionLabel?: string; //Rótulo do botão de ação;
  onAddPress?: () => void; // Função de baixo acoplamento que dispara ao botão ser clicado;
  onActionPress?: () => void; // Função de ação customizada;
  onBack?: () => void;
}

export function Header({ 
  title = 'AgendaNails',
  showAddButton = false,
  actionLabel = '+',
  onAddPress,
  onActionPress,
  onBack,
}: HeaderProps) {
  
  const handlePress = onActionPress || onAddPress;
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {onBack && (
      <TouchableOpacity onPress={onBack} style={{ marginRight: 10 }}>
       <Ionicons name="arrow-back" size={22} color="#fff" />
        {/* Ou use um ícone, tipo Ionicons name="arrow-back" */}
      </TouchableOpacity>
      )}

      {showAddButton && ( // Se a condição do ShowAddButton for verdadeira aparece o botão:
        <TouchableOpacity 
          style={styles.plusDiv}
          onPress={handlePress}
          activeOpacity={0.7}
        >
          <Text style={styles.plus}>{actionLabel}</Text>
        </TouchableOpacity>
        )}
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 105,
    width: '100%',
    backgroundColor: '#B84D86',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop:  Platform.OS === 'android' ? StatusBar.currentHeight : 2,
  
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
  },

  backButton: {
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: 'rgb(255, 255, 255)',

  justifyContent: 'center',
  alignItems: 'center',

  marginRight: 10,
}

});