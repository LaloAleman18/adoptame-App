import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";

const AdminListaMascotasScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        const dogResponse = await fetch("https://dog.ceo/api/breeds/image/random/5");
        const catResponse = await fetch("https://api.thecatapi.com/v1/images/search?limit=5");

        const dogData = await dogResponse.json();
        const catData = await catResponse.json();

        const dogList = dogData.message.map((url, index) => ({
          id: `dog-${index}`,
          name: "Perro",
          image: url,
          breed: "Desconocida", // Valor predeterminado
          description: "Un perro amoroso en busca de hogar.",
        }));
        const catList = catData.map((cat, index) => ({
          id: `cat-${index}`,
          name: "Gato",
          image: cat.url,
          breed: "Desconocida", // Valor predeterminado
          description: "Un gato juguetón y cariñoso.",
        }));

        setMascotas([...dogList, ...catList]);
      } catch (error) {
        console.error("Error al obtener las mascotas", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMascotas();
  }, []);

  // Función para eliminar una mascota
  const handleDelete = (id) => {
    // Mostrar una alerta para confirmar la eliminación
    Alert.alert(
      "Confirmar Eliminación",
      "¿Estás seguro de que deseas eliminar esta mascota?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: () => {
            setMascotas(mascotas.filter((mascota) => mascota.id !== id));
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.textColor }]}>Mascotas en Adopción</Text>

      {/* Cargando o mostrando mascotas */}
      {loading ? (
        <ActivityIndicator size="large" color={theme.buttonBackground} />
      ) : (
        <FlatList
          data={mascotas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.mascotaContainer, { backgroundColor: theme.cardBackground }]}>
              <Image source={{ uri: item.image }} style={styles.mascotaImage} />
              <Text style={[styles.mascotaName, { color: theme.textColor }]}>{item.name}</Text>

              <View style={styles.buttonContainer}>
                {/* Botón Editar */}
                <TouchableOpacity
                  style={[styles.editButton, { backgroundColor: theme.buttonBackground }]}
                  onPress={() => navigation.navigate("AdminEditarMascotaScreen", { mascota: item })}
                >
                  <Text style={[styles.buttonText, { color: theme.buttonText }]}>Editar</Text>
                </TouchableOpacity>

                {/* Botón Eliminar */}
                <TouchableOpacity
                  style={[styles.deleteButton, { backgroundColor: "red" }]}
                  onPress={() => handleDelete(item.id)}
                >
                  <Text style={[styles.buttonText, { color: "white" }]}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  mascotaContainer: {
    marginBottom: 20,
    alignItems: "center",
    padding: 10,
    borderRadius: 15,
    backgroundColor: "grey",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  mascotaImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  mascotaName: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
    width: "100%",
  },
  editButton: {
    flex: 1,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButton: {
    flex: 1,
    paddingVertical: 10,
    marginLeft: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AdminListaMascotasScreen;
