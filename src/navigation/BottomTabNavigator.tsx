import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { BottomTabParamList, ProductsStackParamList } from './types'
import { ProductListScreen } from '@modules/products/screens/ProductListScreen'
import { ProductDetailScreen } from '@modules/products/screens/ProductDetailScreen'
import { CartScreen } from '@modules/cart/screens/CartScreen'
import { useCartStore } from '@modules/cart/store/cartStore'
import { CheckoutScreen } from '@modules/checkout/screens/CheckoutScreens'

const ProductsStack = createStackNavigator<ProductsStackParamList>()

const ProductsNavigator = () => (
  <ProductsStack.Navigator>
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
  return (
    <Tab.Navigator>
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
          tabBarBadge: useCartStore.getState().totalItems || undefined,
        }}
      />
      <Tab.Screen name="CheckoutTab" component={CheckoutScreen} options={{ title: 'Checkout' }} />
    </Tab.Navigator>
  )
}
