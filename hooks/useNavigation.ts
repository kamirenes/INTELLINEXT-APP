import { useContext } from 'react'
import {
  NavigationScreenProp,
  NavigationRoute,
  NavigationContext
} from 'react-navigation'

export default function useNavigation<S>(): NavigationScreenProp<
  S & NavigationRoute
> {
  const navigation = useContext(NavigationContext) as any // TODO typing?
  if (!navigation) {
    throw new Error(
      "react-navigation hooks require a navigation context but it couldn't be found. " +
        "Make sure you didn't forget to create and render the react-navigation app container. " +
        'If you need to access an optional navigation object, you can useContext(NavigationContext), which may return'
    )
  }
  return navigation
}
