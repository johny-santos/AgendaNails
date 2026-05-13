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
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../routes/auth.stack';
import apiService from '../../services/apiService';

type NavigationProps = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export default function Login() {
  const navigation = useNavigation<NavigationProps>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [carregando, setCarregando] = useState(false);

  // ── Handler para fazer login ──
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Email e senha são obrigatórios');
      return;
    }

    setCarregando(true);
    try {
      const resposta = await apiService.login(email, password);

      if (resposta.sucesso) {
        // Login bem-sucedido - navegue para o app principal
        navigation.getParent()?.navigate('MainTabs');
      }
    } catch (erro: any) {
      Alert.alert('Erro de Login', erro.mensagem || 'Erro ao fazer login');
      console.error('Erro login:', erro);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>

          {/* Logo / Título */}
          <View style={styles.logoArea}>
            <Ionicons name="sparkles" size={52} color="#E91E63" />
            <Text style={styles.appName}>AgendaNails</Text>
            <Text style={styles.tagline}>Sua agenda de beleza</Text>
          </View>

          {/* Card de Login */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Entrar</Text>

            {/* Email */}
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

            {/* Senha */}
            <Text style={styles.label}>Senha</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color="#E91E63" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#BBB"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </View>

            {/* Esqueci a senha */}
            <TouchableOpacity style={styles.forgotButton}>
              <Text style={styles.forgotText}>Esqueceu a senha?</Text>
            </TouchableOpacity>

            {/* Botão Entrar */}
            <TouchableOpacity
              style={[styles.loginButton, carregando && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={carregando}
            >
              {carregando ? (
                <ActivityIndicator color="#FFF" size="small" />
              ) : (
                <Text style={styles.loginButtonText}>Entrar</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Rodapé */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Não tem uma conta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.footerLink}>Cadastre-se</Text>
            </TouchableOpacity>
          </View>

          {/* Botão temporário para testes */}
          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => navigation.getParent()?.navigate('MainTabs')}
          >
            <Text style={styles.skipText}>⚙️ Pular login (Dev)</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: '#eeb1d8',
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 40,
  },

  container: {
    paddingHorizontal: 24,
  },

  logoArea: {
    alignItems: 'center',
    marginBottom: 32,
  },

  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 10,
  },

  tagline: {
    fontSize: 15,
    color: '#666',
    marginTop: 4,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: 6,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0F5',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F8BBD0',
  },

  inputIcon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: '#222',
  },

  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },

  forgotText: {
    fontSize: 13,
    color: '#E91E63',
    fontWeight: '600',
  },

  loginButton: {
    backgroundColor: '#E91E63',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },

  loginButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 28,
  },

  footerText: {
    color: '#555',
    fontSize: 14,
  },

  footerLink: {
    color: '#E91E63',
    fontSize: 14,
    fontWeight: 'bold',
  },

  skipButton: {
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 10,
  },

  skipText: {
    color: '#888',
    fontSize: 13,
  },
});
