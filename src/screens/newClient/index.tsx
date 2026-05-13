import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function NewClient(){
    return(
        <ScrollView style={styles.mainContainer}>

            <View style={styles.labelTextContainer}>
                <Text style={styles.labelsText}>Nome da Cliente*: </Text>
            </View>
            
            <View style={styles.textInputContainer}>
                <TextInput style={styles.inputText}></TextInput>
            </View>

            <View style={styles.labelTextContainer}>
                <Text style={styles.labelsText}>Horário inicial do atendimento:</Text>
            </View>
            
            <View style={styles.textInputContainer}>
                <TextInput style={styles.inputText}></TextInput>
            </View>
            {/*campo input do início atendimento*/}
            <View style={styles.labelTextContainer}>
                <Text style={styles.labelsText}>Horário Final do atendimento:</Text>
            </View>
            {/*campo input do final atendimento*/}
            <View style={styles.textInputContainer}>
                <TextInput style={styles.inputText}></TextInput>
            </View>

            <View style={styles.labelTextContainer}>
                <Text style={styles.labelsText}>Tipo de atendimento: </Text>
            </View>
            
            <View style={styles.textInputContainer}>
                <TextInput style={styles.inputText}></TextInput>
            </View>

            
            <View style={styles.labelTextContainer}>
                <Text style={styles.labelsText}>Data do atendimento: </Text>
            </View>
            
            <View style={styles.textInputContainer}>
                <TextInput style={styles.inputText}></TextInput>
            </View>

            <View style={styles.labelTextContainer}>
                <Text style={styles.labelsText}>Descrição: </Text>
            </View>

             <View style={styles.textDescricaoContainer}>
                <TextInput style={styles.inputTextDescricao} multiline={true}></TextInput>
            </View>

           
            <TouchableOpacity style={styles.buttonToucha}>
                <Text style={styles.userConfirm}>Agendar</Text> 
            </TouchableOpacity>
                        
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        backgroundColor: '#fab4e3ff',
    
    },
    labelTextContainer:{
        marginTop: 10,
        padding: 8,
        marginLeft: 10
    },

    labelsText:{
       fontSize: 17,
       fontWeight: 'bold',

    },

    textInputContainer:{
        marginLeft: 12
    },

    inputText:{
        width: '95%',
        backgroundColor: '#fff',
        height: 60,
        borderWidth: 4,
        borderColor: 'purple',
        borderRadius: 8,
        boxShadow: '5px 7px 10px rgba(0, 0, 1, 0.3)',
        paddingHorizontal: 8,
    },

    textDescricaoContainer:{
        marginLeft: 12,

    },

    inputTextDescricao:{
        width: '95%',
        backgroundColor: '#fff',
        height: 105,
        borderWidth: 4,
        borderColor: 'purple',
        borderRadius: 8,
        boxShadow: '5px 7px 10px rgba(0, 0, 1, 0.3)',
        paddingHorizontal: 8,
        textAlignVertical: 'top',   
    },


    buttonToucha:{
        width: '50%',
        height: 60,
        backgroundColor: 'purple',
        padding: 14,
        marginTop: 20,
        display: 'flex',
        alignSelf: 'center', 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: 'rgb(194, 35, 141)'
       
    },

    userConfirm:{
        fontWeight: 'bold',
        color: 'white',
    }
})