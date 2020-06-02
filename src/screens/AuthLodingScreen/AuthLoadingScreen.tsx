import React from 'react'
import { ActivityIndicator, AsyncStorage, StatusBar, View } from 'react-native'
import {
  NavigationParams,
  NavigationState,
  NavigationScreenProp
} from 'react-navigation'

type Props = {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

class AuthLoadingScreen extends React.Component<Props> {
  constructor(props: Readonly<Props>) {
    super(props)
    this._bootstrapAsync()
  }
  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userSessionToken')

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'Home' : 'Auth')
  }

  // Render any loading content that you like here
  render() {
    return (
      <View>
        
      </View>
    )
  }
}

export default AuthLoadingScreen
