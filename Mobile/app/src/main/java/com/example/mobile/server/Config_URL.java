package com.example.mobile.server;

//This class is for storing all URLs as a model of URLs

public class Config_URL {
    public static String base_URL = "http://192.168.44.254:8000";
    public static String Login = base_URL + "/login";
    public static String register = base_URL + "/regis";

    public static String inputTiket = base_URL + "/inputpesan";
    public static String DataTiket = base_URL + "/datapesan";
    public static String UpdateTiket = base_URL + "/editpesan";
    public static String HapusTiket = base_URL + "/delete";
}
