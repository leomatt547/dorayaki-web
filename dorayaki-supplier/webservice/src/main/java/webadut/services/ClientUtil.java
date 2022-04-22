package webadut.services;

public class ClientUtil {
    public static String createRequestInJSON(String ip, String endpoint, String timestamp, Integer id_dorayaki, Integer stok, String username) {
        return String.format("{\"ip\":\"%s\",\"endpoint\":\"%s\",\"timestamp\":\"%s\",\"id_dorayaki\":%d,\"stok\":%d,\"username\":\"%s\"}",
                             ip, endpoint, timestamp, id_dorayaki, stok, username);
    }
}
