import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { BottomTabParamList, ProductsStackParamList } from './types'
import { ProductListScreen } from '@modules/products/screens/ProductListScreen'
import { ProductDetailScreen } from '@modules/products/screens/ProductDetailScreen'
import { CartScreen } from '@modules/cart/screens/CartScreen'
import { useCartStore } from '@modules/cart/store/cartStore'
import { CheckoutScreen } from '@modules/checkout/screens/CheckoutScreens'
import { BatteryIndicator } from '@shared/components/BatteryIndicator'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

type TabIconProps = {
  routeName: string
  color: string
  size: number
}
const TabIcon = ({ routeName, color, size }: TabIconProps) => {
  const icons: Record<string, string> = {
    ProductsTab: 'shopping-outline',
    CartTab: 'cart-outline',
    CheckoutTab: 'credit-card-outline',
  }
  return <Icon name={icons[routeName] ?? 'circle'} size={size} color={color} />
}

const ProductsStack = createStackNavigator<ProductsStackParamList>()

const ProductsNavigator = () => (
  <ProductsStack.Navigator
    screenOptions={{
      headerRight: () => <BatteryIndicator />,
    }}>
    <ProductsStack.Screen
      name="ProductList"
      component={ProductListScreen}
      options={{ title: 'Produtos' }}
    />
    <ProductsStack.Screen
      name="ProductDetail"
      component={ProductDetailScreen}
      options={{ title: 'Detalhes' }}
    />
  </ProductsStack.Navigator>
)

const Tab = createBottomTabNavigator<BottomTabParamList>()

export const BottomTabNavigator = () => {
  const totalItems = useCartStore(state => state.totalItems)

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => (
          <TabIcon routeName={route.name} color={color} size={size} />
        ),
        tabBarActiveTintColor: '#3b82f6',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#f3f4f6',
          paddingBottom: 4,
          height: 56,
        },
      })}>
      <Tab.Screen
        name="ProductsTab"
        component={ProductsNavigator}
        options={{ title: 'Produtos', headerShown: false }}
      />
      <Tab.Screen
        name="CartTab"
        component={CartScreen}
        options={{
          title: 'Carrinho',
          tabBarBadge: totalItems > 0 ? totalItems : undefined,
        }}
      />
      <Tab.Screen name="CheckoutTab" component={CheckoutScreen} options={{ title: 'Checkout' }} />
    </Tab.Navigator>
  )
}
