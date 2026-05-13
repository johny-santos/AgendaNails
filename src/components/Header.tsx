import React from 'react';
import { Image, Platform, StatusBar, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

//Define o que ele pode receber de fora para considerar o Header de uma Página
interface HeaderProps {
  title?: string; //Conteúdo do Header;
  showAddButton?: boolean; //Controla se o Botão aparece ou não;
  showBackButton?: boolean; //Controla se o botão de voltar aparece;
  actionLabel?: string; //Rótulo do botão de ação;
  onAddPress?: () => void; // Função de baixo acoplamento que dispara ao botão ser clicado;
  onActionPress?: () => void; // Função de ação customizada;
  onBackPress?: () => void; // Função disparada ao clicar no voltar;
}

export function Header({ 
  title = 'AgendaNails',
  showAddButton = false,
  showBackButton = false,
  actionLabel = '+',
  onAddPress,
  onActionPress,
  onBackPress,
}: HeaderProps) {
  
  const handlePress = onActionPress || onAddPress;
  
  return (
    <View style={styles.container}>
      <View style={styles.leftArea}>
        {showBackButton && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBackPress}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={24} color="#222" />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>

      {showAddButton && ( // Se a condição do ShowAddButton for verdadeira aparece o botão:
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handlePress}
          activeOpacity={0.7}
        >
          <Text style={styles.actionText}>{actionLabel}</Text>
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
  leftArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButton:{
    justifyContent:'center',
    alignItems: 'center',
    minWidth: 72,
    height: 42,
    paddingHorizontal: 16,
    backgroundColor: '#f394cfff',
    borderRadius: 20,
    marginRight: 7,
    boxShadow: '3px 3px 6px rgba(0, 0, 1, 0.3)',
  },
  actionText:{
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logo: {
    width: 110,
    height: 70,
  }
});