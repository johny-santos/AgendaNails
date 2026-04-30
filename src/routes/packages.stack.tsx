import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Header } from '../components/Header';
import Packages from '../screens/Packages';
import NewPackage from '../screens/NewPackage';
import PackageDetails from '../screens/PackageDetails';

export type PackagesStackParamList = {
  PackagesMain: undefined;
  NewPackage: undefined;
  PackageDetails: {
    name: string;
    time: string;
    service: string;
    observations?: string;
  };
};

const Stack = createNativeStackNavigator<PackagesStackParamList>();

export function PackagesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({ navigation }) => (
          <Header 
            title="Pacotes"
            showAddButton={true}
            actionLabel="Novo Pacote"
            onActionPress={() => navigation.navigate('NewPackage')}
          />
        ) 
      }}
    >

    <Stack.Screen 
      name="PackagesMain" 
      component={Packages} 
    />

    <Stack.Screen 
      name="NewPackage" 
      component={NewPackage} 
      options={{
      header: () => (
        <Header title="Novo Pacote" />
      )
    }}
  />

    <Stack.Screen 
      name="PackageDetails" 
      component={PackageDetails} 
      options={{
        header: () => (
          <Header title="Detalhes do Pacote" />
        )
      }}
    />

    </Stack.Navigator>
  );
}