// screens/UserHomeScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { getDogs, getCats, addToFavorites, removeFromFavorites } from "../services/PetService";
import { Ionicons } from "@expo/vector-icons";

const UserHomeScreen = ({ navigation }) => {
  const { theme, toggleTheme } = useTheme();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredPets, setFilteredPets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    type: "all",
    size: "all",
  });

  useEffect(() => {
    const loadPets = async () => {
      setLoading(true);
      try {
        const dogs = await getDogs(8);
        const cats = await getCats(8);
        const allPets = [...dogs, ...cats];
        setPets(allPets);
        setFilteredPets(allPets);
      } catch (error) {
        console.error("Error cargando mascotas:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPets();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchQuery, filters, pets]);

  const applyFilters = () => {
    let result = [...pets];

    // Filtro por búsqueda
    if (searchQuery) {
      result = result.filter(
        (pet) =>
          pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pet.breed.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtro por tipo
    if (filters.type !== "all") {
      result = result.filter((pet) => pet.type === filters.type);
    }

    // Filtro por tamaño
    if (filters.size !== "all") {
      result = result.filter((pet) => pet.size === filters.size);
    }

    setFilteredPets(result);
  };

  const toggleFavorite = (id) => {
    const updatedPets = pets.map((pet) => {
      if (pet.id === id) {
        const updatedPet = { ...pet, favorite: !pet.favorite };
        if (updatedPet.favorite) {
          addToFavorites(updatedPet);
        } else {
          removeFromFavorites(id);
        }
        return updatedPet;
      }
      return pet;
    });
    setPets(updatedPets);
  };

  const renderPetItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.petCard, { backgroundColor: theme.background }]}
      onPress={() => navigation.navigate("PetDetails", { pet: item })}
    >
      <Image source={{ uri: item.image }} style={styles.petImage} />
      <View style={styles.petInfo}>
        <Text style={[styles.petName, { color: theme.textColor }]}>
          {item.name}
        </Text>
        <Text style={[styles.petBreed, { color: theme.textColor }]}>
          {item.breed}
        </Text>
        <Text style={[styles.petSize, { color: theme.textColor }]}>
          {item.size}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(item.id)}
      >
        <Ionicons
          name={item.favorite ? "heart" : "heart-outline"}
          size={24}
          color={item.favorite ? "red" : theme.textColor}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TextInput
          style={[
            styles.searchBar,
            { 
              backgroundColor: theme.background === "#121212" ? "#333" : "#f0f0f0", 
              color: theme.textColor 
            },
          ]}
          placeholder="Buscar mascotas..."
          placeholderTextColor={theme.background === "#121212" ? "#aaa" : "#888"}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
          <Ionicons
            name={theme.background === "#ffffff" ? "moon" : "sunny"}
            size={24}
            color={theme.textColor}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.filtersContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filters.type === "all" && styles.activeFilter,
          ]}
          onPress={() => setFilters({ ...filters, type: "all" })}
        >
          <Text style={styles.filterText}>Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filters.type === "dog" && styles.activeFilter,
          ]}
          onPress={() => setFilters({ ...filters, type: "dog" })}
        >
          <Text style={styles.filterText}>Perros</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filters.type === "cat" && styles.activeFilter,
          ]}
          onPress={() => setFilters({ ...filters, type: "cat" })}
        >
          <Text style={styles.filterText}>Gatos</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sizeFiltersContainer}>
        <Text style={[styles.sizeLabel, {color: theme.textColor}]}>Tamaño:</Text>
        <TouchableOpacity
          style={[
            styles.sizeFilterButton,
            filters.size === "all" && styles.activeSizeFilter,
          ]}
          onPress={() => setFilters({ ...filters, size: "all" })}
        >
          <Text style={styles.filterText}>Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.sizeFilterButton,
            filters.size === "Pequeño" && styles.activeSizeFilter,
          ]}
          onPress={() => setFilters({ ...filters, size: "Pequeño" })}
        >
          <Text style={styles.filterText}>Pequeño</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.sizeFilterButton,
            filters.size === "Mediano" && styles.activeSizeFilter,
          ]}
          onPress={() => setFilters({ ...filters, size: "Mediano" })}
        >
          <Text style={styles.filterText}>Mediano</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.sizeFilterButton,
            filters.size === "Grande" && styles.activeSizeFilter,
          ]}
          onPress={() => setFilters({ ...filters, size: "Grande" })}
        >
          <Text style={styles.filterText}>Grande</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#ff6b6b" />
      ) : (
        <FlatList
          data={filteredPets}
          renderItem={renderPetItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    marginRight: 8,
  },
  themeToggle: {
    padding: 10,
  },
  filtersContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#ddd",
    marginRight: 8,
  },
  activeFilter: {
    backgroundColor: "#ff6b6b",
  },
  filterText: {
    fontWeight: "500",
    color: "#444",
  },
  sizeFiltersContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sizeLabel: {
    marginRight: 8,
  },
  sizeFilterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#ddd",
    marginRight: 6,
  },
  activeSizeFilter: {
    backgroundColor: "#ff6b6b",
  },
  list: {
    paddingBottom: 20,
  },
  petCard: {
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  petImage: {
    width: 100,
    height: 100,
  },
  petInfo: {
    flex: 1,
    padding: 12,
    justifyContent: "center",
  },
  petName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  petBreed: {
    fontSize: 14,
    marginBottom: 4,
  },
  petSize: {
    fontSize: 12,
  },
  favoriteButton: {
    padding: 12,
    justifyContent: "center",
  },
});

export default UserHomeScreen;