import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { RootRoutes } from './src/routes/root.routes';
import apiService from './src/services/apiService';

export default function App() {
  const [initialRouteName, setInitialRouteName] = useState<'Auth' | 'MainTabs'>('Auth');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // Verifica se já existe token salvo no celular.
      // Se existir, valida no backend se a conta ainda é PROFISSIONAL/ADMIN.
      const token = await apiService.obterTokenArmazenado();

      if (!token) {
        setInitialRouteName('Auth');
        setLoading(false);
        return;
      }

      try {
        const resposta = await apiService.validarToken();
        const tipoUsuario = resposta.usuario?.tipo_usuario;

        if (tipoUsuario === 'PROFISSIONAL' || tipoUsuario === 'ADMIN') {
          setInitialRouteName('MainTabs');
        } else {
          await apiService.limparAutenticacao();
          setInitialRouteName('Auth');
        }
      } catch {
        await apiService.limparAutenticacao();
        setInitialRouteName('Auth');
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color="#E91E63" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootRoutes initialRouteName={initialRouteName} />
    </NavigationContainer>
  );
}
