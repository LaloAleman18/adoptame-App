import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useNavigation } from "@react-navigation/native"; // Para redirigir a la pantalla de login

const SettingsScreen = () => {
  const { theme, toggleTheme } = useTheme();
  const navigation = useNavigation();
  const { logout } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ color: theme.textColor, fontSize: 18, marginBottom: 20 }}>
        Tema actual: {theme.background === "#121212" ? "Oscuro" : "Claro"}
      </Text>

      <TouchableOpacity
        onPress={toggleTheme}
        style={{
          backgroundColor: theme.buttonBackground,
          padding: 12,
          borderRadius: 8,
          alignItems: "center",
          width: 200,
          marginBottom: 20,
        }}
      >
        <Text style={{ color: theme.buttonText, fontSize: 16 }}>Cambiar Tema</Text>
      </TouchableOpacity>

      {/* Botón de Logout */}
      <TouchableOpacity
        onPress={logout}
        style={{
          backgroundColor: theme.buttonBackground,
          padding: 12,
          borderRadius: 8,
          alignItems: "center",
          width: 200,
        }}
      >
        <Text style={{ color: theme.buttonText, fontSize: 16 }}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;
