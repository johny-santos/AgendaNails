import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
//import Home from '../screens/Home';
import { HomeStack } from './home.stack';
import { DashboardStack } from './dashboard.Stack';
import { SettingsStack } from './settings.stack';

import Dashboard from '../screens/Dashboard';
import Settings from '../screens/Settings';
import { Header } from '../components/Header';
import { PackagesStack } from './packages.stack';

const Tab = createBottomTabNavigator();

/*
 -->19/01/2025 --> 17:52

 Criação da lógica de mudança de Header, de acordo com a página
 na qual o usuário está;

 screenOptions => Permite configurar o comportamento global das telas;
 route => Qual tela está ativa;
 Navigation => Controla a navegação entre telas;

*/

export function TabRoutes() {
  return (
    
  <Tab.Navigator screenOptions={({ route }) => ({
    headerShown: false,
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === 'Home') {
        iconName = focused ? 'home' : 'home-outline';
      } else if (route.name === 'Painel') {
        iconName = focused ? 'bar-chart' : 'bar-chart-outline';
      } else if (route.name === 'Pacotes') {
        iconName = focused ? 'cube' : 'cube-outline';
      }

      return <Ionicons name={iconName as any} size={size} color={color} />;
    },
    tabBarActiveTintColor: '#f394cfff',
    tabBarInactiveTintColor: '#999',
  })}>
  <Tab.Screen name="Home" component={HomeStack} />
  <Tab.Screen name="Painel" component={DashboardStack} />
  <Tab.Screen name="Pacotes" component={PackagesStack} />
</Tab.Navigator>

  );
}
