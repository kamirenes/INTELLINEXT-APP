import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import AuthLoadingScreen from '../screens/AuthLodingScreen/AuthLoadingScreen'
import SignInScreen from '../screens/SignInScreen/SignInScreen'
import HomeScreen from '../screens/HomeScreen/HomeScreen'
import DevicesScreen from '../screens/DevicesScreen/DevicesScreen'

const AuthStack = createStackNavigator({
  SignIn: SignInScreen,
  Home: HomeScreen,
  Devices: DevicesScreen
})


export default createAppContainer(
  createSwitchNavigator(
    {
      //AuthLoading: AuthLoadingScreen,
      Auth: AuthStack
    },
    {
      initialRouteName: 'Auth'
    }
  )
)
