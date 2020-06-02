import useNavigation from './useNavigation'
import { NavigationParams } from 'react-navigation'

export function useNavigationParam<T extends keyof NavigationParams>(
  paramName: T
) {
  return useNavigation().getParam(paramName)
}
