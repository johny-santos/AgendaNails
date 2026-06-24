import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
} from 'react-native';

interface TimeDropdownProps {
  label: string;
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

export default function TimeDropdown({
  label,
  options,
  selectedValue,
  onSelect,
}: TimeDropdownProps) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleSelect = (value: string): void => {
    onSelect(value);
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
          {selectedValue || 'Selecione um horário'}
        </Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{label}</Text>

            <ScrollView style={styles.scrollArea}>
              {options.map((time: string, index: number) => (
                <TouchableOpacity
                  key={index}
                  style={styles.optionItem}
                  onPress={() => handleSelect(time)}
                >
                  <Text style={styles.optionText}>{time}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
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