// screens/PetDetailsScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { addToFavorites, removeFromFavorites } from "../services/PetService";

const PetDetailsScreen = ({ route, navigation }) => {
  const { pet } = route.params;
  const { theme, toggleTheme } = useTheme();
  const [favorite, setFavorite] = useState(pet.favorite);
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleToggleFavorite = () => {
    const newFavorite = !favorite;
    setFavorite(newFavorite);
    
    if (newFavorite) {
      addToFavorites({...pet, favorite: true});
    } else {
      removeFromFavorites(pet.id);
    }
  };

  const handleAdoptionRequest = () => {
    // Validar campos del formulario
    if (!formData.name || !formData.email || !formData.phone) {
      Alert.alert("Error", "Por favor completa todos los campos obligatorios");
      return;
    }
    
    // Simular envío de solicitud
    Alert.alert(
      "Solicitud Enviada",
      `¡Gracias por tu interés en adoptar a ${pet.name}! Pronto nos pondremos en contacto contigo.`,
      [
        {
          text: "OK",
          onPress: () => {
            setModalVisible(false);
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Image source={{ uri: pet.image }} style={styles.petImage} />
      
      <View style={styles.header}>
        <Text style={[styles.petName, { color: theme.textColor }]}>
          {pet.name}
        </Text>
        <TouchableOpacity onPress={handleToggleFavorite}>
          <Ionicons
            name={favorite ? "heart" : "heart-outline"}
            size={32}
            color={favorite ? "red" : theme.textColor}
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={[styles.infoLabel, { color: theme.textColor }]}>Tipo:</Text>
          <Text style={[styles.infoValue, { color: theme.textColor }]}>
            {pet.type === "dog" ? "Perro" : "Gato"}
          </Text>
        </View>
        
        <View style={styles.infoItem}>
          <Text style={[styles.infoLabel, { color: theme.textColor }]}>Raza:</Text>
          <Text style={[styles.infoValue, { color: theme.textColor }]}>
            {pet.breed}
          </Text>
        </View>
        
        <View style={styles.infoItem}>
          <Text style={[styles.infoLabel, { color: theme.textColor }]}>Tamaño:</Text>
          <Text style={[styles.infoValue, { color: theme.textColor }]}>
            {pet.size}
          </Text>
        </View>
        
        <View style={styles.infoItem}>
          <Text style={[styles.infoLabel, { color: theme.textColor }]}>
            Características:
          </Text>
          <Text style={[styles.infoValue, { color: theme.textColor }]}>
            {pet.characteristics}
          </Text>
        </View>
      </View>
      
      <View style={styles.descriptionContainer}>
        <Text style={[styles.descriptionTitle, { color: theme.textColor }]}>
          Sobre {pet.name}
        </Text>
        <Text style={[styles.description, { color: theme.textColor }]}>
          {pet.type === "dog" 
            ? `${pet.name} es un perro ${pet.characteristics.toLowerCase()} que está buscando un hogar lleno de amor. Es de tamaño ${pet.size.toLowerCase()} y se lleva bien con ${Math.random() > 0.5 ? "niños" : "otros animales"}. Le gusta ${Math.random() > 0.5 ? "jugar en el parque" : "dar paseos"} y ${Math.random() > 0.5 ? "dormir" : "comer"}.`
            : `${pet.name} es un gato ${pet.characteristics.toLowerCase()} que está buscando un hogar lleno de amor. Es de tamaño ${pet.size.toLowerCase()} y se lleva bien con ${Math.random() > 0.5 ? "niños" : "otros animales"}. Le gusta ${Math.random() > 0.5 ? "jugar con juguetes" : "descansar en lugares altos"} y ${Math.random() > 0.5 ? "dormir" : "comer"}.`
          }
        </Text>
      </View>
      
      <TouchableOpacity
        style={[styles.adoptButton, { backgroundColor: theme.buttonBackground }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.adoptButtonText, { color: theme.buttonText }]}>
          Solicitar Adopción
        </Text>
      </TouchableOpacity>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
            <Text style={[styles.modalTitle, { color: theme.textColor }]}>
              Solicitud de Adopción
            </Text>
            
            <TextInput
              style={[styles.input, { backgroundColor: theme.background === "#121212" ? "#333" : "#f0f0f0", color: theme.textColor }]}
              placeholder="Nombre completo"
              placeholderTextColor={theme.background === "#121212" ? "#aaa" : "#888"}
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />
            
            <TextInput
              style={[styles.input, { backgroundColor: theme.background === "#121212" ? "#333" : "#f0f0f0", color: theme.textColor }]}
              placeholder="Correo electrónico"
              placeholderTextColor={theme.background === "#121212" ? "#aaa" : "#888"}
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
            />
            
            <TextInput
              style={[styles.input, { backgroundColor: theme.background === "#121212" ? "#333" : "#f0f0f0", color: theme.textColor }]}
              placeholder="Teléfono"
              placeholderTextColor={theme.background === "#121212" ? "#aaa" : "#888"}
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
              keyboardType="phone-pad"
            />
            
            <TextInput
              style={[styles.messageInput, { backgroundColor: theme.background === "#121212" ? "#333" : "#f0f0f0", color: theme.textColor }]}
              placeholder="¿Por qué deseas adoptar a esta mascota?"
              placeholderTextColor={theme.background === "#121212" ? "#aaa" : "#888"}
              value={formData.message}
              onChangeText={(text) => setFormData({ ...formData, message: text })}
              multiline
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.submitButton]}
                onPress={handleAdoptionRequest}
              >
                <Text style={styles.modalButtonText}>Enviar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  petImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  petName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  infoContainer: {
    padding: 16,
  },
  infoItem: {
    flexDirection: "row",
    marginBottom: 8,
  },
  infoLabel: {
    fontWeight: "bold",
    width: 110,
  },
  infoValue: {
    flex: 1,
  },
  descriptionContainer: {
    padding: 16,
    paddingTop: 0,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    lineHeight: 22,
  },
  adoptButton: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  adoptButtonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  messageInput: {
    padding: 12,
    borderRadius: 6,
    marginBottom: 16,
    height: 100,
    textAlignVertical: "top",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    padding: 12,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 4,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  submitButton: {
    backgroundColor: "#ff6b6b",
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default PetDetailsScreen;