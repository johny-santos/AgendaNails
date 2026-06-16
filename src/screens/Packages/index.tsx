import { View, Text, StyleSheet, TouchableOpacity  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PackagesStackParamList } from '../../routes/packages.stack';
import  ProgressSessions  from '../../components/ProgressSessions';
import { packageSummaries } from '../../services/packagesSummary';

type NavigationProps = NativeStackNavigationProp<PackagesStackParamList, 'PackagesMain'>;

export default function Packages() {
  const navigation = useNavigation<NavigationProps>();
  const packageItem = packageSummaries[0];

  return (
   
    <View style={styles.mainStyleView}>
     
        <View style={styles.titleMainView}>
          <Text style={styles.innerTitleContent}>Pacotes em aberto:</Text>
        </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('PackageDetails', {
          name: packageItem.clientName,
          time: '22/11/2025',
          service: packageItem.service,
          observations: `${packageItem.totalSessions - packageItem.completedSessions} sessões restantes`
        })}
      >
        <View style={styles.motherStyleMainView}>
          <View style={styles.rowElements}>
            <View style={styles.columnElementsView}>
              <Text style={styles.custumerName}>{packageItem.clientName}</Text>
              <Text>
                Início: {/* Conteúdo puxado do banco */} 
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>22/11/2025</Text> 
              </Text>
            </View>

            <View style={styles.restantApointPackNumber}>
              <Text style={styles.innerPackageNumber}>
                {packageItem.totalSessions - packageItem.completedSessions} sessões restant.
              </Text>
            </View>
          </View>
            
              <View
                style={{
                width: '97%',
                borderBottomColor: '#cccccc',
                borderBottomWidth: StyleSheet.hairlineWidth, // Linha super fina e elegante
                alignSelf: 'center',
                marginVertical: 10,
              }}
            />
          
          <View style={styles.rowEements2}>
            <View style={styles.columnInnerContent}>
              <Text>R$ 180,00</Text>
              <Text>Com desconto</Text>
            </View>

             

            <View style={styles.sessionsControl}>
              <ProgressSessions
                total={packageItem.totalSessions}
                done={packageItem.completedSessions}
              />

              <Text>
                Sessão {packageItem.completedSessions}/{packageItem.totalSessions}
              </Text>
            </View>    

          </View>
         
        </View>
      </TouchableOpacity> 
    </View>
    
  );
}

const styles = StyleSheet.create({
    mainStyleView:{
      flex: 1,
      backgroundColor: "#fab4e3ff"
    },
    titleMainView:{
      marginTop: 17,
      alignItems: 'center',
      justifyContent:'center',
      width: '100%',
      height: 40,
      backgroundColor: '#f0eded'
      
    },
    innerTitleContent:{
      fontSize: 18,
      fontWeight: 'bold',
       color: '#696868'
    },
    motherStyleMainView:{
      height: 150,
      width: '100%',
      backgroundColor: '#fff',
     

    },
    rowElements:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 4,

    },
    columnElementsView:{
      flexDirection: 'column',
      marginLeft: 6
    },
    custumerName:{
      fontWeight: 'bold',
      fontSize: 16
    },
    restantApointPackNumber:{
      marginTop: 6,
      marginRight: 6,
      padding: 13,
      backgroundColor: 'rgba(241, 79, 201, 0.91)',
      borderRadius: 12,
      
    },
    innerPackageNumber:{
      fontWeight: 'bold',
      color: '#fff',
    },
    rowEements2:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 4
    },
    columnInnerContent:{
      flexDirection: 'column',
      marginLeft: 6
    },
    sessionsControl:{
      marginRight: 6
    }

})
