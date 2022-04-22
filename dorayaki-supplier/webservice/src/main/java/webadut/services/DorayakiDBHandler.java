package webadut.services;

import java.sql.*;

public class DorayakiDBHandler {
    private Connection connection;
    private static String DB_URL = "jdbc:mysql://us-cdbr-east-04.cleardb.com/heroku_a043628c752ccc5";
    private static String DB_Username = "b27f96585ba8bb";
    private static String DB_Password = "0e2a36e8";

    public DorayakiDBHandler(){
        try {
            System.out.println("Inisiasi Koneksi");
            Class.forName("com.mysql.cj.jdbc.Driver");
            this.connection = DriverManager.getConnection(DB_URL, DB_Username, DB_Password);
            System.out.println("Koneksi Berhasil");
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Koneksi Error");
        }
    }

    public Connection getConnection(){return this.connection;}
}
