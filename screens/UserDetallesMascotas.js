import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";

const UserDetallesMascotaScreen = ({ route }) => {
  const { theme } = useTheme();
  const { mascota } = route.params;
  const navigation = useNavigation();

  // Estado para guardar las mascotas favoritas
  const [favorites, setFavorites] = useState([]);

  // Función para agregar mascota a favoritos
  const addToFavorites = () => {
    if (!favorites.find((fav) => fav.id === mascota.id)) {
      setFavorites([...favorites, mascota]);
      alert("Mascota agregada a favoritos");
    } else {
      alert("Esta mascota ya está en tus favoritos");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.textColor }]}>Detalles de la Mascota</Text>
      <Image source={{ uri: mascota.image }} style={styles.image} />
      <Text style={[styles.text, { color: theme.textColor }]}>Nombre: {mascota.name}</Text>
      <Text style={[styles.text, { color: theme.textColor }]}>Raza: {mascota.breed}</Text>

      {/* Botón para agregar a favoritos */}
      <TouchableOpacity
        style={[styles.favoriteButton, { backgroundColor: theme.buttonBackground }]}
        onPress={addToFavorites}
      >
        <Text style={[styles.buttonText, { color: theme.buttonText }]}>Agregar a Favoritos</Text>
      </TouchableOpacity>

      {/* Botón de Volver usando TouchableOpacity */}
      <TouchableOpacity
        style={[styles.backButton, { backgroundColor: theme.buttonBackground }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={[styles.buttonText, { color: theme.buttonText }]}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  favoriteButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default UserDetallesMascotaScreen;
