import { createStackNavigator } from "react-navigation-stack";
import MyAccountScreen from "../Screens/Account/MyAccount";
import LogginScreen from "../Screens/Account/Login";
import RegisterScreen from "../Screens/Account/Register";

const MyAccountScreenStacks = createStackNavigator({
  MyAccount: {
    screen: MyAccountScreen,
    navigationOptions: () => ({
      title: "Mi cuenta",
    }),
  },
  Login: {
    screen: LogginScreen,
    navigationOptions: () => ({
      title: "Login",
    }),
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: () => ({
      title: "Registro de Usuario",
    }),
  },
});

export default MyAccountScreenStacks;
