import { createDrawerNavigator } from "@react-navigation/drawer";
import AdminHomeScreen from "../screens/AdminHomeScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Drawer = createDrawerNavigator();

const AdminNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Inicio" component={AdminHomeScreen} />
    <Drawer.Screen name="Configuraciones" component={SettingsScreen} />
  </Drawer.Navigator>
);

export default AdminNavigator;
