package com.noritz.iot;

import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class udp extends ReactContextBaseJavaModule {

    private static ReactApplicationContext reactContext;
    SocketCommandandResponse skt1;
    public static StringBuilder stringBuilder;

    udp(ReactApplicationContext context) {
        super(context);
        reactContext = context;
        skt1= new SocketCommandandResponse(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "udp";
    }

    @ReactMethod
    public void sendudpcommandNew(String value){
        Log.d("TAG", "sendudpcommandNew: " + value);

        StringBuilder sb = new StringBuilder();

        sb.append(value);

        skt1.Command5131(value);

        skt1.sendMessage(SocketCommandandResponse.commandforfire.toString(), 15000);
        stringBuilder = new StringBuilder();
        stringBuilder.append(skt1.response5131());

        Log.e("different", "sendudpcommandNew: " + stringBuilder );

        sendEvent(reactContext, "socketResponse", String.valueOf(stringBuilder));
    }


    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable String params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }





}
