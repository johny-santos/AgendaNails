import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
} from 'react-native';

interface Client {
  id_cliente: number;
  nome_cliente: string;
}

interface ClientDropdownProps {
  label: string;
  clients: Client[];
  selectedValue: number | null;
  onSelect: (id: number) => void;
}

export default function ClientDropdown({
  label,
  clients,
  selectedValue,
  onSelect,
}: ClientDropdownProps) {

  const [modalVisible, setModalVisible] = useState(false);

  const selectedClient = clients.find(
    client => client.id_cliente === selectedValue
  );

  const handleSelect = (id: number) => {
    onSelect(id);
    setModalVisible(false);
  };

  return (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>

    <TouchableOpacity
      style={styles.dropdownButton}
      onPress={() => setModalVisible(true)}
    >
      <Text style={styles.dropdownText}>
        {selectedClient?.nome_cliente ||
          'Selecione uma cliente'}
      </Text>
    </TouchableOpacity>

    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>

          <Text style={styles.modalTitle}>
            Selecione uma cliente
          </Text>

          <ScrollView
            style={styles.scrollArea}
            showsVerticalScrollIndicator
          >
            {clients.map(client => (
              <TouchableOpacity
                key={client.id_cliente}
                style={styles.optionItem}
                onPress={() =>
                  handleSelect(client.id_cliente)
                }
              >
                <Text style={styles.optionText}>
                  {client.nome_cliente}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>
              Fechar
            </Text>
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
    marginTop: 12,
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

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    width: '88%',
    maxHeight: '75%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    borderWidth: 2,
    borderColor: '#d81b60',
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d81b60',
    marginBottom: 14,
    textAlign: 'center',
  },

  scrollArea: {
    maxHeight: 400,
  },

  optionItem: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f8bbd0',
  },

  optionText: {
    fontSize: 17,
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