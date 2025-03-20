// services/PetService.js
import axios from "axios";

// API para perros
export const getDogs = async (limit = 10) => {
  try {
    const response = await axios.get(
      `https://dog.ceo/api/breeds/image/random/${limit}`
    );
    return response.data.message.map((image, index) => {
      // Extraemos la raza del perro a partir de la URL
      const urlParts = image.split("/");
      const breed = urlParts[4];

      return {
        id: `dog-${index}`,
        name: `Perro ${index + 1}`,
        type: "dog",
        breed: breed.charAt(0).toUpperCase() + breed.slice(1),
        image,
        size: ["Pequeño", "Mediano", "Grande"][Math.floor(Math.random() * 3)],
        characteristics: ["Juguetón", "Cariñoso", "Tranquilo", "Energético"][
          Math.floor(Math.random() * 4)
        ],
        favorite: false,
      };
    });
  } catch (error) {
    console.error("Error al obtener perros:", error);
    return [];
  }
};

// API para gatos
export const getCats = async (limit = 10) => {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?limit=${limit}`
    );
    return response.data.map((cat, index) => {
      return {
        id: `cat-${index}`,
        name: `Gato ${index + 1}`,
        type: "cat",
        breed: ["Siamés", "Persa", "Bengalí", "Ragdoll", "Sphynx"][
          Math.floor(Math.random() * 5)
        ],
        image: cat.url,
        size: ["Pequeño", "Mediano", "Grande"][Math.floor(Math.random() * 3)],
        characteristics: ["Independiente", "Cariñoso", "Tranquilo", "Juguetón"][
          Math.floor(Math.random() * 4)
        ],
        favorite: false,
      };
    });
  } catch (error) {
    console.error("Error al obtener gatos:", error);
    return [];
  }
};

// Almacenamiento local para favoritos
let favorites = [];

export const addToFavorites = (pet) => {
  if (!favorites.some((fav) => fav.id === pet.id)) {
    favorites.push(pet);
  }
};

export const removeFromFavorites = (petId) => {
  favorites = favorites.filter((pet) => pet.id !== petId);
};

export const getFavorites = () => {
  return [...favorites];
};
