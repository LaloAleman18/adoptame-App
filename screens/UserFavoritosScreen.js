import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";

// Definimos una lista simulada con algunas mascotas favoritas, que podrían ser perros o gatos
const UserFavoritosScreen = () => {
  const { theme } = useTheme();

  // Estado para almacenar los favoritos
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Aquí generamos una lista simulada con perros y gatos
    const fetchFavorites = async () => {
      try {
        // Petición para obtener una imagen de perro
        const dogResponse = await fetch('https://dog.ceo/api/breeds/image/random');
        const dogData = await dogResponse.json();
        const dog = {
          id: '1',
          name: 'Max (Perro)',
          image: dogData.message, // URL de la imagen del perro
        };

        // Petición para obtener una imagen de gato
        const catResponse = await fetch('https://api.thecatapi.com/v1/images/search');
        const catData = await catResponse.json();
        const cat = {
          id: '2',
          name: 'Bella (Gato)',
          image: catData[0].url, // URL de la imagen del gato
        };

        // Aquí agregamos los perros y gatos a la lista de favoritos
        setFavorites([dog, cat]);
      } catch (error) {
        console.error("Error fetching images", error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.textColor }]}>Mascotas Favoritas</Text>

      {favorites.length === 0 ? (
        <Text style={[styles.noFavoritesText, { color: theme.textColor }]}>
          No has agregado mascotas a favoritos.
        </Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.mascotaContainer}>
              <Image source={{ uri: item.image }} style={styles.mascotaImage} />
              <Text 
                style={[
                  styles.mascotaName, 
                  { color: "blue", fontWeight: "bold" }
                ]}
              >
                {item.name}
              </Text>
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
    paddingBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
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
    textAlign: "center",
    marginTop: 10,
  },
  noFavoritesText: {
    fontSize: 18,
    textAlign: "center",
  },
});

export default UserFavoritosScreen;
