import { NativeModules, NativeEventEmitter } from 'react-native'

const { BatteryModule } = NativeModules

const batteryEmitter = new NativeEventEmitter(BatteryModule)

const getBatteryLevel = (): Promise<number> => {
  if (!BatteryModule) return Promise.resolve(-1)
  return BatteryModule.getBatteryLevel()
}

const startBatteryListener = (callback: (level: number) => void) => {
  BatteryModule?.startBatteryListener()
  const subscription = batteryEmitter.addListener('onBatteryLevelChange', callback)
  return subscription
}

const stopBatteryListener = () => {
  BatteryModule?.stopBatteryListener()
}

export { getBatteryLevel, startBatteryListener, stopBatteryListener }