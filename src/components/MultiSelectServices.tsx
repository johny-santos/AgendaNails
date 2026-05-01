

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
} from 'react-native';

interface MultiSelectServicesProps {
  services: string[];
  selectedServices: string[];
  onSelectionChange: (services: string[]) => void;
}

export default function MultiSelectServices({
  services,
  selectedServices,
  onSelectionChange,
}: MultiSelectServicesProps) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const toggleService = (service: string): void => {
    if (selectedServices.includes(service)) {
      const updatedServices = selectedServices.filter(
        (item: string) => item !== service
      );
      onSelectionChange(updatedServices);
    } else {
      const updatedServices = [...selectedServices, service];
      onSelectionChange(updatedServices);
    }
  };

  const removeService = (service: string): void => {
    const updatedServices = selectedServices.filter(
      (item: string) => item !== service
    );
    onSelectionChange(updatedServices);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tipos de Serviços</Text>

      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.dropdownText}>
          {selectedServices.length > 0
            ? `${selectedServices.length} serviço(s) selecionado(s)`
            : 'Selecione os serviços'}
        </Text>
      </TouchableOpacity>

      {/* Serviços Selecionados */}
      <View style={styles.selectedContainer}>
        {selectedServices.map((service: string, index: number) => (
          <View key={index} style={styles.serviceTag}>
            <Text style={styles.serviceTagText}>{service}</Text>

            <TouchableOpacity onPress={() => removeService(service)}>
              <Text style={styles.removeText}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Modal Dropdown */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Selecione os Serviços</Text>

            <ScrollView style={styles.scrollArea}>
              {services.map((service: string, index: number) => {
                const isSelected = selectedServices.includes(service);

                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.optionItem,
                      isSelected && styles.optionSelected,
                    ]}
                    onPress={() => toggleService(service)}
                  >
                    <Text style={styles.optionText}>
                      {isSelected ? '✔ ' : ''}
                      {service}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Concluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    alignSelf: 'center',
    marginTop: 14,
  },

  label: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#6a006a',
    marginBottom: 8,
    marginLeft: 4,
  },

  dropdownButton: {
    minHeight: 58,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#d81b60',
    borderRadius: 12,
    justifyContent: 'center',
    paddingHorizontal: 14,
  },

  dropdownText: {
    fontSize: 16,
    color: '#333',
  },

  selectedContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },

  serviceTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8bbd0',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 4,
    borderWidth: 1,
    borderColor: '#d81b60',
  },

  serviceTagText: {
    color: '#6a006a',
    fontWeight: 'bold',
    marginRight: 8,
  },

  removeText: {
    color: '#d81b60',
    fontWeight: 'bold',
    fontSize: 16,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    borderWidth: 2,
    borderColor: '#d81b60',
  },

  modalTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#d81b60',
    textAlign: 'center',
    marginBottom: 14,
  },

  scrollArea: {
    maxHeight: 420,
  },

  optionItem: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f8bbd0',
  },

  optionSelected: {
    backgroundColor: '#fce4ec',
  },

  optionText: {
    fontSize: 16,
    color: '#333',
  },

  closeButton: {
    marginTop: 18,
    backgroundColor: '#d81b60',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 