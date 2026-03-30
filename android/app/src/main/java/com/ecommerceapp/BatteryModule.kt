package com.ecommerceapp

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.os.BatteryManager
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.modules.core.DeviceEventManagerModule

class BatteryModule(private val reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String = "BatteryModule"

    private var batteryReceiver: BroadcastReceiver? = null

    @ReactMethod
    fun getBatteryLevel(promise: Promise) {
        try {
            val intentFilter = IntentFilter(Intent.ACTION_BATTERY_CHANGED)
            val batteryStatus = reactContext.registerReceiver(null, intentFilter)

            val level = batteryStatus?.getIntExtra(BatteryManager.EXTRA_LEVEL, -1) ?: -1
            val scale = batteryStatus?.getIntExtra(BatteryManager.EXTRA_SCALE, -1) ?: -1

            if (level == -1 || scale == -1) {
                promise.reject("BATTERY_ERROR", "Não foi possível obter o nível de bateria")
                return
            }

            val batteryPercent = (level.toFloat() / scale.toFloat() * 100).toInt()
            promise.resolve(batteryPercent)
        } catch (e: Exception) {
            promise.reject("BATTERY_ERROR", e.message)
        }
    }

    @ReactMethod
    fun startBatteryListener() {
        val filter = IntentFilter(Intent.ACTION_BATTERY_CHANGED)

        batteryReceiver = object : BroadcastReceiver() {
            override fun onReceive(context: Context, intent: Intent) {
                val level = intent.getIntExtra(BatteryManager.EXTRA_LEVEL, -1)
                val scale = intent.getIntExtra(BatteryManager.EXTRA_SCALE, -1)

                if (level != -1 && scale != -1) {
                    val batteryPercent = (level.toFloat() / scale.toFloat() * 100).toInt()
                    sendBatteryEvent(batteryPercent)
                }
            }
        }

        reactContext.registerReceiver(batteryReceiver, filter)
    }

    @ReactMethod
    fun stopBatteryListener() {
        batteryReceiver?.let {
            reactContext.unregisterReceiver(it)
            batteryReceiver = null
        }
    }

    private fun sendBatteryEvent(level: Int) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit("onBatteryLevelChange", level)
    }

    @ReactMethod
    fun addListener(eventName: String) {}

    @ReactMethod
    fun removeListeners(count: Int) {}
}