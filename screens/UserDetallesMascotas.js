import React from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useNavigation } from "@react-navigation/native"; // Importar useNavigation

const UserDetallesMascotaScreen = ({ route }) => {
  const { theme } = useTheme();
  const { mascota } = route.params;
  const navigation = useNavigation(); // Usar useNavigation

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>      
      <Text style={[styles.title, { color: theme.textColor }]}>Detalles de la Mascota</Text>
      <Image source={{ uri: mascota.image }} style={styles.image} />
      <Text style={[styles.text, { color: theme.textColor }]}>Nombre: {mascota.name}</Text>
      <Text style={[styles.text, { color: theme.textColor }]}>Raza: {mascota.breed}</Text>
      
      {/* Botón para volver atrás */}
      <Button
        title="Volver"
        onPress={() => navigation.goBack()} // Acción para volver atrás
        color={theme.textColor} // Usar el color del tema
      />
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
});

export default UserDetallesMascotaScreen;
