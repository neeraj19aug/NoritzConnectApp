package com.noritz.iot;

import static com.facebook.react.bridge.UiThreadUtil.runOnUiThread;

import android.content.Intent;
import android.util.Base64;
import android.util.Log;
import android.widget.Toast;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.modules.core.RCTNativeAppEventEmitter;
import com.facebook.react.uimanager.IllegalViewOperationException;

import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Arrays;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.KeyGenerator;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;


import com.facebook.CallbackManager;
import com.facebook.FacebookCallback;
import com.facebook.FacebookException;
import com.facebook.login.LoginResult;
import com.facebook.login.LoginManager;

public class aes extends ReactContextBaseJavaModule {
    public KeyGenerator keygenerator;
    public SecretKey myDesKey;
    Cipher c;
    private IvParameterSpec iv;
    private final String secretKey="00f74597de203655b1ebf5f410f10eb8";

    private MainActivity mainActivity;


    private CallbackManager callbackManager;
    public Callback fbCallBack;

    private static ReactApplicationContext reactContext;



    public aes(ReactApplicationContext context) throws Exception {
        super(context);
        reactContext = context;

        this.mainActivity = mainActivity;

        callbackManager = CallbackManager.Factory.create();

        // Genrate the Key
        keygenerator = KeyGenerator.getInstance("AES");
        keygenerator.init(new SecureRandom());
        myDesKey = new SecretKeySpec(secretKey.getBytes(), "AES/CBC/PKCS5Padding");//eygenerator.generateKey();

        // Create the cipher
        c = Cipher.getInstance("AES/CBC/PKCS5Padding");

        iv = new IvParameterSpec(new byte[16]);
    }

    @Override
    public String getName() {
        return "aes";
    }


    public CallbackManager getCallbackManager() {
        return callbackManager;
    }


    public void someMethod(String token) {

        int duration = Toast.LENGTH_SHORT;
        Toast toast = Toast.makeText(reactContext, token, duration);
//        toast.show();
        sendEvent(reactContext, "facebookResponse", token);





    }


    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable String params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        callbackManager.onActivityResult(requestCode, resultCode, data);
    }

    @ReactMethod
    public void facebookauth(Callback successCallback) throws NoSuchAlgorithmException {


        try {
            fbCallBack = successCallback;
            CharSequence text = "start login!";
            int duration = Toast.LENGTH_SHORT;

            Toast toast = Toast.makeText(reactContext, text, duration);
//            toast.show();


            LoginManager.getInstance().registerCallback(callbackManager, new FacebookCallback<LoginResult>() {
                @Override
                public void onSuccess(LoginResult loginResult) {


                    CharSequence text = "success login!";
                    int duration = Toast.LENGTH_SHORT;

                    Toast toast = Toast.makeText(reactContext, text, duration);
                    toast.show();


                    // Login success
                    successCallback.invoke("" , "Facebook login called");

                }

                @Override
                public void onCancel() {

                    CharSequence text = "cancel!";
                    int duration = Toast.LENGTH_SHORT;

                    Toast toast = Toast.makeText(reactContext, text, duration);
                    toast.show();

                    successCallback.invoke("" , "Facebook login cancel");

                    // Login canceled
                }

                @Override
                public void onError(FacebookException exception) {
                    // Login error

                    CharSequence text = "error!";
                    int duration = Toast.LENGTH_SHORT;

                    Toast toast = Toast.makeText(reactContext, text, duration);
                    toast.show();

                    successCallback.invoke("" , "Facebook login error");

                }
            });


            LoginManager.getInstance().logInWithReadPermissions(getCurrentActivity(), Arrays.asList("public_profile", "email"));





        } catch (IllegalViewOperationException e) {

        }

    }



    @ReactMethod
    public void md5(String value,
                    Callback successCallback) throws NoSuchAlgorithmException {

        try {

            MessageDigest digest = MessageDigest.getInstance("MD5");
            digest.update(value.getBytes());
            byte messageDigest[] = digest.digest();
            StringBuffer hexString = new StringBuffer();
            for (int i = 0; i < messageDigest.length; i += 1) {
                String h = Integer.toHexString(0xFF & messageDigest[i]);
                while (h.length() < 2)
                    h = "0" + h;
                hexString.append(h);
            }




            successCallback.invoke("" , hexString.toString());
        } catch (IllegalViewOperationException e) {

        }

    }


    @ReactMethod
    public void encrypt(String value,
                        Callback successCallback) throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidAlgorithmParameterException, InvalidKeyException, BadPaddingException, IllegalBlockSizeException {

        Log.e("TAG", "encrypt: " + value);

        try {
            // Initialize the cipher for encryption
            c = Cipher.getInstance("AES/CBC/PKCS5Padding");
            iv = new IvParameterSpec(new byte[16]);
//		byte[] keeeys = Webservice.secrateKey.getBytes();
            myDesKey = new SecretKeySpec(secretKey.getBytes(), "AES/CBC/PKCS5Padding");
            c.init(Cipher.ENCRYPT_MODE, myDesKey, iv);

            // sensitive information
            byte[] text = value.getBytes();

            // Encrypt the text
            byte[] textEncrypted = c.doFinal(text);

            Log.e("TAG", "encrypt: "+   new String(textEncrypted) );
            successCallback.invoke("",  Base64.encodeToString(textEncrypted, Base64.NO_PADDING));
        } catch (IllegalViewOperationException e) {

        }

    }


    @ReactMethod
    public void decrypt(String value,
                        Callback successCallback) throws Exception {

        Log.e("TAG", "decrypt: " + value );

        try {


            // Initialize the same cipher for decryption
            c = Cipher.getInstance("AES/CBC/PKCS5Padding");
            iv = new IvParameterSpec(new byte[16]);
            myDesKey = new SecretKeySpec(secretKey.getBytes(), "AES/CBC/PKCS5Padding");
//		c.init(Cipher.ENCRYPT_MODE, myDesKey, iv);
            c.init(Cipher.DECRYPT_MODE, myDesKey, iv);

            byte[] text = value.getBytes();
            byte[] message = Base64.decode(value, Base64.NO_PADDING);

            // Decrypt the text

            Log.e("TAG", "decrypt: " + text );

            byte[] textDecrypted = c.doFinal(message);

            Log.e("TAG", "decrypt: " + new String(textDecrypted) );



//            // Decrypt the text
//            byte[] textDecrypted = c.doFinal(value);
//
//            return (new String(textDecrypted));



            successCallback.invoke("" , new String(textDecrypted) );
        } catch (IllegalViewOperationException e) {

        }

    }
}