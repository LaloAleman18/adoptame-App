import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useTheme } from "../context/ThemeContext";

const AdminAgregarMascotaScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const handleAddMascota = () => {
    if (!name || !image) {
      Alert.alert("Error", "Por favor, ingresa todos los campos.");
      return;
    }
    // Lógica para agregar una nueva mascota
    console.log("Nueva mascota agregada", { name, image });
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.textColor }]}>
        Agregar Nueva Mascota
      </Text>
      <Text style={[styles.title1, { color: theme.textColor }]}>
        Nombre
      </Text>
      <TextInput
        style={[styles.input, { borderColor: theme.textColor }]}
        placeholder="Nombre"
        placeholderTextColor={theme.textColor}
        value={name}
        onChangeText={setName}
      />

      <Text style={[styles.title1, { color: theme.textColor }]}>
        URL de la imagen
      </Text>
      <TextInput
        style={[styles.input, { borderColor: theme.textColor }]}
        placeholder="URL de la imagen"
        placeholderTextColor={theme.textColor}
        value={image}
        onChangeText={setImage}
      />

      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: theme.buttonBackground }]}
        onPress={handleAddMascota}
      >
        <Text style={[styles.buttonText, { color: theme.buttonText }]}>
          Agregar Mascota
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    color: "#000",
    backgroundColor: "#fff",
  },
  addButton: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  title1: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "justify",
    marginBottom: 20,
  },
});

export default AdminAgregarMascotaScreen;
