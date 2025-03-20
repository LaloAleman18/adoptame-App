import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";

const UserListaMascotasScreen = () => {
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

        const dogList = dogData.message.map((url, index) => ({ id: `dog-${index}`, name: "Perro", image: url, breed: "Desconocida", description: "Un perro amoroso en busca de hogar." }));
        const catList = catData.map((cat, index) => ({ id: `cat-${index}`, name: "Gato", image: cat.url, breed: "Desconocida", description: "Un gato juguetón y cariñoso." }));

        setMascotas([...dogList, ...catList]);
      } catch (error) {
        console.error("Error al obtener las mascotas", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMascotas();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background, padding: 10 }}>
      <Text style={{ color: theme.textColor, fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>
        Mascotas en Adopción
      </Text>
      {loading ? (
        <ActivityIndicator size="large" color={theme.buttonBackground} />
      ) : (
        <FlatList
          data={mascotas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("UserDetallesMascotaScreen", { mascota: item })}
              style={{ marginBottom: 20, alignItems: "center", borderBottomWidth: 1, borderBottomColor: theme.textColor, paddingBottom: 10 }}
            >
              <Image source={{ uri: item.image }} style={{ width: 150, height: 150, borderRadius: 10 }} />
              <Text style={{ color: theme.textColor, fontSize: 18, marginTop: 5 }}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default UserListaMascotasScreen;