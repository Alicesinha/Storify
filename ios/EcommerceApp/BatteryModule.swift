import Foundation
import UIKit

@objc(BatteryModule)
class BatteryModule: RCTEventEmitter {

  private var hasListeners = false

  override static func requiresMainQueueSetup() -> Bool {
    return false
  }

  override func supportedEvents() -> [String] {
    return ["onBatteryLevelChange"]
  }

  override func startObserving() {
    hasListeners = true
  }

  override func stopObserving() {
    hasListeners = false
  }

  @objc func getBatteryLevel(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
    UIDevice.current.isBatteryMonitoringEnabled = true
    let level = UIDevice.current.batteryLevel

    if level < 0 {
      reject("BATTERY_ERROR", "Não foi possível obter o nível de bateria", nil)
      return
    }

    resolve(Int(level * 100))
  }

  @objc func startBatteryListener() {
    UIDevice.current.isBatteryMonitoringEnabled = true
    NotificationCenter.default.addObserver(
      self,
      selector: #selector(batteryLevelDidChange),
      name: UIDevice.batteryLevelDidChangeNotification,
      object: nil
    )
  }

  @objc func stopBatteryListener() {
    NotificationCenter.default.removeObserver(
      self,
      name: UIDevice.batteryLevelDidChangeNotification,
      object: nil
    )
    UIDevice.current.isBatteryMonitoringEnabled = false
  }

  @objc private func batteryLevelDidChange(_ notification: Notification) {
    guard hasListeners else { return }
    let level = Int(UIDevice.current.batteryLevel * 100)
    sendEvent(withName: "onBatteryLevelChange", body: level)
  }
}