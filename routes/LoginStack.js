import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/drawerScreens/HomeScreen"
import WelcomeScreen from "../screens/SplashScreen";

const screens = {
    Welcome: {
        screen: WelcomeScreen,
    },
    Login: {
        screen: LoginScreen,
    },
    Home: {
        screen: HomeScreen},

}

const LoginStack = createStackNavigator(screens);
export default createAppContainer(LoginStack);