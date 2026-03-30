import React, { useRef, useCallback, useEffect } from 'react'
import { View, Text, Alert, ActivityIndicator } from 'react-native'
import { WebView, WebViewMessageEvent } from 'react-native-webview'
import { useCartStore } from '@modules/cart/store/cartStore'
import { logger } from '@shared/logger'
import { useNetworkStatus } from '@shared/hooks/useNetworkStatus'
import { Platform } from 'react-native'

type WebToAppEvent =
  | { type: 'WEBVIEW_READY' }
  | { type: 'PURCHASE_COMPLETED'; payload: { orderId: string } }
  | { type: 'ERROR'; payload: { message: string; code: string } }

type AppToWebEvent =
  | { type: 'CART_DATA'; payload: ReturnType<typeof useCartStore.getState>['items'] }
  | { type: 'CHECKOUT_STARTED'; payload: { total: number } }
  | { type: 'NETWORK_STATUS'; payload: { isConnected: boolean } }

export const CheckoutScreen = () => {
  const webViewRef = useRef<WebView>(null)
  const { items, total, clear } = useCartStore()
  const isConnected = useNetworkStatus()

  const checkoutSource = Platform.select({
    android: { uri: 'file:///android_asset/checkout.html' },
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    ios: require('@assets/webview/checkout.html'),
  })

  const sendToWebView = useCallback((event: AppToWebEvent) => {
    const json = JSON.stringify(event).replace(/'/g, "\\'")
    const js = `
    window.dispatchEvent(new MessageEvent('message', { data: '${json}' }));
    true;
  `
    logger.webview('out', event)
    webViewRef.current?.injectJavaScript(js)
  }, [])

  const handleWebViewReady = useCallback(() => {
    sendToWebView({ type: 'CART_DATA', payload: items })
    sendToWebView({ type: 'CHECKOUT_STARTED', payload: { total } })
  }, [items, total, sendToWebView])

  useEffect(() => {
    sendToWebView({ type: 'NETWORK_STATUS', payload: { isConnected } })
  }, [isConnected, sendToWebView])

  useEffect(() => {
    sendToWebView({ type: 'CART_DATA', payload: items })
  }, [items, sendToWebView])

  const handleMessage = useCallback(
    (event: WebViewMessageEvent) => {
      logger.info('WEBVIEW_RAW_MESSAGE', { data: event.nativeEvent.data })
      try {
        const data: WebToAppEvent = JSON.parse(event.nativeEvent.data)
        logger.webview('in', data)

        switch (data.type) {
          case 'WEBVIEW_READY':
            handleWebViewReady()
            break

          case 'PURCHASE_COMPLETED':
            if (!isConnected) {
              Alert.alert(
                'Sem conexão',
                'É necessário ter conexão com a internet para confirmar o pagamento.',
              )
              return
            }
            clear()
            Alert.alert(
              'Pedido confirmado!',
              `Seu pedido ${data.payload.orderId} foi realizado com sucesso.`,
            )
            break

          case 'ERROR':
            logger.error('WEBVIEW_ERROR', data.payload)
            Alert.alert('Erro', data.payload.message)
            break
        }
      } catch (err) {
        logger.error('WEBVIEW_MESSAGE_PARSE_ERROR', { error: String(err) })
      }
    },
    [handleWebViewReady, isConnected, clear],
  )

  if (items.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 p-4">
        <Text className="text-gray-400 text-base">
          Adicione produtos ao carrinho antes de finalizar.
        </Text>
      </View>
    )
  }

  return (
    <View className="flex-1">
      {!isConnected && (
        <View className="bg-yellow-400 px-4 py-2">
          <Text className="text-yellow-900 text-xs text-center font-medium">
            Você está offline. O pagamento não poderá ser processado.
          </Text>
        </View>
      )}
      <WebView
        ref={webViewRef}
        source={checkoutSource}
        onLoad={() => {
          handleWebViewReady()
        }}
        onMessage={handleMessage}
        startInLoadingState
        renderLoading={() => (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#3b82f6" />
          </View>
        )}
      />
    </View>
  )
}
