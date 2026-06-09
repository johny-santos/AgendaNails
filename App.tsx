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
      const token = await apiService.obterTokenArmazenado();
      setInitialRouteName(token ? 'MainTabs' : 'Auth');
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
