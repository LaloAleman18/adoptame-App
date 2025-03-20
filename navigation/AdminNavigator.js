import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import AdminHomeScreen from "../screens/AdminHomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import AdminListaMascotasScreen from "../screens/AdminListaMascotas";
import AdminAgregarMascotaScreen from "../screens/AdminAgregarMascotas";
import AdminEditarMascotaScreen from "../screens/AdminEditarInformacion";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const AdminStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AdminListaMascotasScreen" component={AdminListaMascotasScreen} />
    <Stack.Screen name="AdminAgregarMascotaScreen" component={AdminAgregarMascotaScreen} />
    <Stack.Screen name="AdminEditarMascotaScreen" component={AdminEditarMascotaScreen} />
  </Stack.Navigator>
);

const AdminNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Inicio" component={AdminStack} />
    <Drawer.Screen name="Agregar" component={AdminAgregarMascotaScreen} />
    <Drawer.Screen name="Configuracion" component={SettingsScreen} />
  </Drawer.Navigator>
);

export default AdminNavigator;
