import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import UserHomeScreen from "../screens/UserHomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import UserListaMascotasScreen from "../screens/UserListaMascotas";
import UserDetallesMascotaScreen from "../screens/UserDetallesMascotas";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const UserStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="UserListaMascotasScreen" component={UserListaMascotasScreen} />
    <Stack.Screen name="UserDetallesMascotaScreen" component={UserDetallesMascotaScreen} />
  </Stack.Navigator>
);
const UserNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Inicio" component={UserStack} />
    <Drawer.Screen name="Perfil" component={ProfileScreen} />
  </Drawer.Navigator>
);

export default UserNavigator;
