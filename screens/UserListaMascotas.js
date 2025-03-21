import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity, Picker, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";

const UserListaMascotasScreen = () => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("raza"); // Filtro por defecto
  const [filterValue, setFilterValue] = useState(""); // Valor del filtro (raza o tamaño)

  // Filtros simulados
  const razaOptions = ["Bulldog", "Labrador", "Beagle", "Chihuahua"];
  const tamañoOptions = ["Pequeño", "Mediano", "Grande"];

  // Filtrar las mascotas según el filtro seleccionado
  const filterMascotas = () => {
    if (!filterValue) return mascotas; // No aplicar filtro si el valor está vacío

    return mascotas.filter((mascota) => {
      if (selectedFilter === "raza") {
        return mascota.breed.toLowerCase().includes(filterValue.toLowerCase());
      } else if (selectedFilter === "tamaño") {
        return mascota.description.toLowerCase().includes(filterValue.toLowerCase());
      }
    });
  };

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

  const filteredMascotas = filterMascotas(); // Aplicar filtro

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.textColor }]}>Mascotas en Adopción</Text>

      {/* Filtro de raza o tamaño */}
      <Text style={[styles.filterLabel, { color: theme.textColor }]}>Filtrar por:</Text>
      <Picker
        selectedValue={selectedFilter}
        onValueChange={(itemValue) => setSelectedFilter(itemValue)}
        style={[styles.picker, { backgroundColor: theme.background, color: theme.textColor }]}
      >
        <Picker.Item label="Raza" value="raza" />
        <Picker.Item label="Tamaño" value="tamaño" />
      </Picker>

      {/* Opciones de filtro dinámicas */}
      <Picker
        selectedValue={filterValue}
        onValueChange={(itemValue) => setFilterValue(itemValue)}
        style={[styles.picker, { backgroundColor: theme.background, color: theme.textColor }]}
      >
        {selectedFilter === "raza"
          ? razaOptions.map((raza, index) => (
              <Picker.Item key={index} label={raza} value={raza} />
            ))
          : tamañoOptions.map((tamaño, index) => (
              <Picker.Item key={index} label={tamaño} value={tamaño} />
            ))}
      </Picker>

      {/* Cargando o mostrando mascotas */}
      {loading ? (
        <ActivityIndicator size="large" color={theme.buttonBackground} />
      ) : (
        <FlatList
          data={filteredMascotas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("UserDetallesMascotaScreen", { mascota: item })}
              style={[styles.mascotaContainer, { backgroundColor: theme.cardBackground }]}
            >
              <Image source={{ uri: item.image }} style={styles.mascotaImage} />
              <Text style={[styles.mascotaName, { color: theme.textColor }]}>{item.name}</Text>
            </TouchableOpacity>
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
  filterLabel: {
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: "100%",
    borderRadius: 10,
    marginBottom: 20,
    paddingLeft: 10,
    paddingVertical: 5,
    color: "#fff", // Asegura que el texto sea visible
  },
  mascotaContainer: {
    marginBottom: 20,
    alignItems: "center",
    paddingBottom: 10,
    borderRadius: 15,
    backgroundColor: "grey",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    padding: 10,
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
});

export default UserListaMascotasScreen;
