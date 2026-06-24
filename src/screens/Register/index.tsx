// ─────────────────────────────────────────────────────────────
// Importações necessárias do React e React Native
// ─────────────────────────────────────────────────────────────
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';

// Ícones da biblioteca Expo
import { Ionicons } from '@expo/vector-icons';

// Hook de navegação e tipagem das rotas do stack de autenticação
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../routes/auth.stack';
import { API_URL } from '../../services/api';
// Serviço de API
//import apiService from '../../services/apiService';
//import { useAuth } from '../../contexts/AuthContext';


// Tipagem da navegação para a tela de Cadastro
type NavigationProps = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

export default function Register() {
  // Hook de navegação tipado
  const navigation = useNavigation<NavigationProps>();
  //const { register } = useAuth();
  // Estados dos campos do formulário
  const [name, setName] = useState('');             // Nome completo
  const [email, setEmail] = useState('');           // E-mail
  const [password, setPassword] = useState('');     // Senha
  const [confirmPassword, setConfirmPassword] = useState(''); // Confirmar senha

  // Controla visibilidade da senha e confirmação
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Estado de carregamento
  const [carregando, setCarregando] = useState(false);

  // ── Handler para fazer cadastro ──
  const handleRegistrar = async () => {

    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não conferem');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter no mínimo 6 caracteres');
      return;
    }

    try {

      setCarregando(true);

      const response = await fetch(
        `${API_URL}/registrar`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nome_profissional: name,
            email_profissional: email,
            senha: password,
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        throw new Error(data.erro || 'Erro ao cadastrar, tente novamente depois.')
      }

      Alert.alert(
        'Sucesso',
        'Cadastro realizado com sucesso'
      );

      navigation.goBack();

    } catch (error) {

      console.log(error);

      Alert.alert(
        'Erro',
        'Não foi possível conectar ao servidor'
      );

    } finally {

      setCarregando(false);

    }
  };

  return (
    // Evita que o teclado sobreponha os inputs no iOS
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>

          {/* ── Logo / Título ── */}
          <View style={styles.logoArea}>
            <Ionicons name="sparkles" size={48} color="#E91E63" />
            <Text style={styles.appName}>AgendaNails</Text>
            <Text style={styles.tagline}>Crie sua conta gratuitamente</Text>
          </View>

          {/* ── Card principal com o formulário ── */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Cadastro</Text>

            {/* Campo: Nome completo */}
            <Text style={styles.label}>Nome completo</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={20} color="#E91E63" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Seu nome"
                placeholderTextColor="#BBB"
                autoCapitalize="words"
                value={name}
                onChangeText={setName}
              />
            </View>

            {/* Campo: E-mail */}
            <Text style={styles.label}>E-mail</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color="#E91E63" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="seu@email.com"
                placeholderTextColor="#BBB"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            {/* Campo: Senha com toggle de visibilidade */}
            <Text style={styles.label}>Senha</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color="#E91E63" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#BBB"
                secureTextEntry={!showPassword} // Oculta ou exibe a senha
                value={password}
                onChangeText={setPassword}
              />
              {/* Botão para alternar visibilidade da senha */}
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </View>

            {/* Campo: Confirmar senha com toggle de visibilidade */}
            <Text style={styles.label}>Confirmar senha</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color="#E91E63" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#BBB"
                secureTextEntry={!showConfirm} // Oculta ou exibe a confirmação
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              {/* Botão para alternar visibilidade da confirmação */}
              <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                <Ionicons
                  name={showConfirm ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </View>

            {/* Botão principal: Criar conta */}
            <TouchableOpacity
              style={[styles.registerButton, carregando && styles.buttonDisabled]}
              onPress={handleRegistrar}
              disabled={carregando}
            >
              {carregando ? (
                <ActivityIndicator color="#FFF" size="small" />
              ) : (
                <Text style={styles.registerButtonText}>Criar conta</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* ── Rodapé: link para voltar ao Login ── */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Já tem uma conta? </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.footerLink}>Entrar</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ─────────────────────────────────────────────────────────────
// Estilos da tela de Cadastro
// Padrão visual: fundo rosa (#eeb1d8), cards brancos, destaque #E91E63
// ─────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  // Wrapper principal — ocupa toda a tela com fundo rosa
  keyboardView: {
    flex: 1,
    backgroundColor: '#eeb1d8',
  },

  // Permite rolar o conteúdo e centraliza verticalmente
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 40,
  },

  // Padding lateral do conteúdo
  container: {
    paddingHorizontal: 24,
  },

  // Área do logo/ícone e título do app
  logoArea: {
    alignItems: 'center',
    marginBottom: 28,
  },

  // Nome do aplicativo
  appName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 10,
  },

  // Subtítulo abaixo do nome
  tagline: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },

  // Card branco que envolve o formulário
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    elevation: 6,                          // Sombra no Android
    shadowColor: '#000',                   // Sombra no iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },

  // Título dentro do card
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 20,
  },

  // Label acima de cada campo
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: 6,
  },

  // Wrapper de cada campo de input (ícone + TextInput + botão opcional)
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0F5',           // Rosa bem claro
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F8BBD0',               // Borda rosa suave
  },

  // Ícone à esquerda do input
  inputIcon: {
    marginRight: 10,
  },

  // Campo de texto em si
  input: {
    flex: 1,
    fontSize: 15,
    color: '#222',
  },

  // Botão "Criar conta" — destaque rosa vibrante
  registerButton: {
    backgroundColor: '#E91E63',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
    elevation: 3,
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },

  // Texto dentro do botão
  registerButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Estado desabilitado do botão (carregando)
  buttonDisabled: {
    opacity: 0.6,
  },

  // Linha do rodapé com "Já tem conta? Entrar"
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 28,
  },

  // Texto simples no rodapé
  footerText: {
    color: '#555',
    fontSize: 14,
  },

  // Link clicável no rodapé
  footerLink: {
    color: '#E91E63',
    fontSize: 14,
    fontWeight: 'bold',
  },
});