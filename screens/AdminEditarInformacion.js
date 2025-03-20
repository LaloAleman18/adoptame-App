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

const AdminEditarMascotaScreen = ({ route, navigation }) => {
  const { theme } = useTheme();
  const { mascota } = route.params;
  const [name, setName] = useState(mascota.name);
  const [image, setImage] = useState(mascota.image);

  const handleEditMascota = () => {
    if (!name || !image) {
      Alert.alert("Error", "Por favor, ingresa todos los campos.");
      return;
    }
    // Lógica para editar la mascota
    console.log("Mascota editada", { name, image });
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.textColor }]}>
        Editar Mascota
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
        style={[styles.saveButton, { backgroundColor: theme.buttonBackground }]}
        onPress={handleEditMascota}
      >
        <Text style={[styles.buttonText, { color: theme.buttonText }]}>
          Guardar Cambios
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
  title1: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "justify",
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
  saveButton: {
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
});

export default AdminEditarMascotaScreen;
