import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import MainTabNavigator from './MainTabNavigator'
import AuthNavigator from './AuthNavigatior'
import SignInScreen from '../screens/SignInScreen/SignInScreen'
import HomeScreen from '../screens/HomeScreen/HomeScreen'
import DevicesScreen from '../screens/DevicesScreen/DevicesScreen'
import OtherOptionScreen from '../screens/OtherOptionScreen/OtherOptionScreen'
import MapScreen from '../screens/MapScreen/MapScreen'


const AppContainer = createAppContainer(
  createSwitchNavigator({
    SignIn: SignInScreen,
    Home: HomeScreen,
    Devices: DevicesScreen,
    OtherOption: OtherOptionScreen,
    Map: MapScreen
  })
)

function AppNavigator() {
  return <AppContainer />
}

export default AppNavigator
