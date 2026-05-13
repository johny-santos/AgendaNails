import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function NewPackage(){
    return(
         <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
        <ScrollView  
            contentContainerStyle={{ paddingBottom: 40, flexGrow: 1,  }}
            keyboardShouldPersistTaps="handled"
            style={styles.mainContainer}
        >

            <View style={styles.labelTextContainer}>
                <Text style={styles.labelsText}>Nome da Cliente: </Text>
            </View>
            
            <View style={styles.textInputContainer}>
                <TextInput style={styles.inputText}></TextInput>
            </View>

             <View style={styles.labelTextContainer}>
                <Text style={styles.labelsText}>Data de início do pacote </Text>
            </View>

               {/*  {showPicker && (
                    <DateTimePicker
                        value={selectedDate}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={chosenDate}
                    />    
                )} */}

            <View style={styles.textInputContainer}>
                <TouchableOpacity
                    style={styles.inputText}
                    activeOpacity={0.7}
                    /* onPress={() => setShowPicker(true)} */
                    >
                  {/*   <Text >
                        {selectedDate
                        ? selectedDate.toLocaleDateString('pt-BR')
                        : 'dd/mm/yyyy'}
                    </Text> */}
                    </TouchableOpacity>
            </View>

                      

            <View style={styles.labelTextContainer}>
                <Text style={styles.labelsText}>Horário de atendimento do pacote</Text>
            </View>
            
            <View style={styles.textInputContainer}>
                <TextInput style={styles.inputText}></TextInput>
            </View>

            <View style={styles.labelTextContainer}>
                <Text style={styles.labelsText}>Tipo de Serviço: </Text>
            </View>
                                 
            <View style={styles.textInputContainer}>
                <TextInput style={styles.inputText}></TextInput>
            </View>

             <View style={styles.labelTextContainer}>
                <Text style={styles.labelsText}>Desconto do pacote: </Text>
            </View>
                                 
            <View style={styles.textInputContainer}>
                <TextInput style={styles.inputText} placeholder='Digite o valor do desconto'></TextInput>
            </View>

            <View style={styles.labelTextContainer}>
                <Text style={styles.labelsText}>Observação do pacote: </Text>
            </View>

             <View style={styles.textDescricaoContainer}>
                <TextInput style={styles.inputTextDescricao} multiline={true}></TextInput>
            </View>

           
            <TouchableOpacity style={styles.buttonToucha} activeOpacity={0.8}>
                <Text style={styles.userConfirm}>Criar Pacote</Text> 
            </TouchableOpacity>
                        
        </ScrollView>
        </KeyboardAvoidingView>
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
        justifyContent: 'center',
        alignItems: 'flex-start',
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
        backgroundColor: 'rgba(182, 17, 141, 0.91)',
        padding: 14,
        marginTop: 20,
        display: 'flex',
        alignSelf: 'center', 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: 'rgb(194, 35, 141)',
        borderRadius: 12
       
    },

    userConfirm:{
        fontWeight: 'bold',
        fontSize: 17,
        color: 'white',
    }
})
