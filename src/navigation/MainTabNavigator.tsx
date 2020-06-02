/* eslint-disable react/display-name */
import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import HomeScreen from '../screens/HomeScreen/HomeScreen'
import DevicesScreen from '../screens/DevicesScreen/DevicesScreen'
import MapScreen from '../screens/MapScreen/MapScreen'
import OtherOptionScreen from '../screens/OtherOptionScreen/OtherOptionScreen'

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Devices: DevicesScreen,
  Map: MapScreen,
  OtherOption: OtherOptionScreen
})

const TabNavigatior = createBottomTabNavigator(
  {
    Home: HomeStack
  },
  {
    defaultNavigationOptions: ({ navigation }: { navigation: any }) => ({
      tabBarIcon: ({ tintColor }: { tintColor: string }) => {
        const { routeName } = navigation.state
        let iconName
       if (routeName === 'Home') {
          iconName = `home`
        } else {
          iconName = `account-circle`
        }
        return (
          <MaterialIcons
            name={iconName}
            size={50}
            color="orange"
          />
        )
      }
    }),
    tabBarOptions: {
      activeTintColor: "orange",
      inactiveTintColor: "gray",
      showLabel: false
    }
  }
)

export default createAppContainer(
  createStackNavigator(
    {
      MainTabNavigator: TabNavigatior,
    },
    {
      mode: 'card',
      headerMode: 'none'
    }
  )
)
