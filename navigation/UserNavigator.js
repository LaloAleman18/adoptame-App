import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import UserHomeScreen from "../screens/UserHomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import UserListaMascotasScreen from "../screens/UserListaMascotas";
import UserDetallesMascotaScreen from "../screens/UserDetallesMascotas";
import UserFavoritosScreen from "../screens/UserFavoritosScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const UserStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="UserListaMascotasScreen" component={UserListaMascotasScreen} />
    <Stack.Screen name="UserDetallesMascotaScreen" component={UserDetallesMascotaScreen} />
    <Stack.Screen name="UserFavoritosScreen" component={UserFavoritosScreen} />

  </Stack.Navigator>
);

const UserNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Inicio" component={UserStack} />
    <Drawer.Screen name="Favoritos" component={UserFavoritosScreen} />
    <Drawer.Screen name="Configuracion" component={SettingsScreen} />
  </Drawer.Navigator>
);

export default UserNavigator;
