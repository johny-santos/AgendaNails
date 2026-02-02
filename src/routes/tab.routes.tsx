import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import Home from '../screens/Home';
import { HomeStack } from './home.stack';
import { DashboardStack } from './dashboard.Stack';
import { SettingsStack } from './settings.stack';

import Dashboard from '../screens/Dashboard';
import Settings from '../screens/Settings';
import { Header } from '../components/Header';

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
    
  <Tab.Navigator screenOptions={{ headerShown: false }}>
  <Tab.Screen name="Home" component={HomeStack} />
  <Tab.Screen name="Painel" component={DashboardStack} />
  <Tab.Screen name="Configurações" component={SettingsStack} />
</Tab.Navigator>

  );
}
