package com.noritz.iot;

import android.content.Context;
import android.util.Log;

import java.io.IOException;
import java.math.BigInteger;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.util.ArrayList;

import static com.facebook.common.util.Hex.hexStringToByteArray;


/**
 * Created by User-43 on 9/20/2017.
 */

public class SocketCommandandResponse {

    public static StringBuilder commandforfire;
    String msgidstr;
    DatagramPacket dp;
    int msgid;
    String month, day, hour, sec, min;
    String msegid;
    String yearhex, monthhex, dayhex, hourhex, sechex, minhex;
    String year;
    String messageid;
    public static ArrayList<String> SSID;
    ArrayList<String> HexSSID;
   // StringBuilder output = new StringBuilder();
    ArrayList<String> range;
    public String newstring2 = null;
    String newstring = null;
    String name;
    byte[] data;
    Boolean isconnectingdone=false;
    Boolean isdisableone=false;
    Boolean command1=false;
    public Context contexte;
    public String st1,st2;

    public SocketCommandandResponse(Context contexte)
    {
        this.contexte=contexte;
        commandforfire = new StringBuilder();

    }

    //Udp socket sending and receiving of data
    public void sendMessage(final String message,int time) {
        DatagramSocket ds = null;
        try {
            ds = new DatagramSocket();
            // IP Address below is the IP address of that Device where server socket is opened.
           // InetAddress serverAddr = InetAddress.getByName("192.168.0.1");  //client's socket path
//            InetAddress serverAddr = InetAddress.getByName("192.168.5.151");    //ISOL's socket path
//              InetAddress serverAddr = InetAddress.getByName("192.168.5.144");

           // InetAddress serverAddr = InetAddress.getByName("192.168.43.191");  //client's socket path

            InetAddress serverAddr = InetAddress.getByName("192.168.0.1");  //client's socket path
            // DatagramPacket dp;
            byte[] sendData = new BigInteger(message, 16).toByteArray();//hexStringToByteArray(message);
            dp = new DatagramPacket(sendData, sendData.length, serverAddr, 50000);
            ds.send(dp);
            int len = 1024;
            byte[] buffer2 = new byte[len];
            DatagramPacket packet;
            packet = new DatagramPacket(buffer2, len);
            ds.setSoTimeout(time);
            ds.receive(packet);
            data = new byte[packet.getLength()];

            System.arraycopy(packet.getData(), packet.getOffset(), data, 0, packet.getLength());
            Log.d("UDPserver", data.length + " bytes received");


        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (ds != null) {
                ds.close();
            }
        }

    }

    public void Command5131(String command)
    {
        commandforfire.setLength(0);
        commandforfire.append(command);
        Log.d("CommandToFire", command);
        hexStringToByteArray(String.valueOf(commandforfire));
    }


    public String response5131()
    {
        String arr ;
        if(data==null) {
            arr = "";
        }else {
            String response = byteArrayToHex(data);
            Log.d("stringmain", response);
            st1=response;

            arr = response;

//            String macaddress = response.substring(response.length() - 12);
//            Log.d("stringmain", macaddress);
//
//            String substringe = response.substring(0, response.length() - 12);
//            Log.d("stringmain", substringe);
//
//            String name = substringe.substring(substringe.length() - 32);
//            Log.d("stringname", name);
//            StringBuilder output = new StringBuilder();
////        for (int j = 0; j < name.length(); j += 2) {
////            String str = name.substring(j, j + 2);
////            output.append((char) Integer.parseInt(str, 16));
////        }
//            for (int j = 0; j < name.length(); j += 2) {
//                String str = name.substring(j, j + 2);
//                if (str.equals("00")) {
//
//                } else {
//                    output.append((char) Integer.parseInt(str, 16));
//
//                }
//            }
//            name = output.toString();
//            // name = name.replaceAll("\\p{Cntrl}", "");
//            Log.d("str", name);
//
//            Log.d("lastname", name);
////            arr = new String[2];
//            arr[0] = macaddress;
//            arr[1] = name;
//            Log.d("arr", String.valueOf(arr));
        }
        return arr;
    }


    public static String byteArrayToHex(byte[] a) {
        StringBuilder sb = new StringBuilder(a.length * 2);
        for (byte b : a)
            sb.append(String.format("%02x", b));
        return sb.toString();
    }


}
