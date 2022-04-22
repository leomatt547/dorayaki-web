package webadut.services;

import javax.jws.WebService;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpRequest.BodyPublishers;
import java.net.http.HttpResponse.BodyHandlers;
import java.sql.*;

@WebService(endpointInterface = "webadut.services.DorayakiService")
public class DorayakiImplement implements DorayakiService{
    @Override
    public String createLogRequestDatabase() {
        try {
            DorayakiDBHandler handler = new DorayakiDBHandler();
            Connection conn  = handler.getConnection();
            Statement statement = conn.createStatement();
            String query = "CREATE TABLE IF NOT EXIST `log_req` (`ip` varchar(20) NOT NULL,`endpoint` varchar(6000) NOT NULL,`timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci; ";
            int count = statement.executeUpdate(query);
            return "Tabel berhasil dibuat dengan return value "+count;
        } catch (Exception e) {
            e.printStackTrace();
            return "Ada masalah saat membuat tabel: " + e.getMessage();
        }
    }

    @Override
    public String createRequestDatabase() {
        try {
            DorayakiDBHandler handler = new DorayakiDBHandler();
            Connection conn  = handler.getConnection();
            Statement statement = conn.createStatement();
            String query = "CREATE TABLE IF NOT EXIST `ysgg80su0qccf95w`.`request` ( `id` INT NOT NULL AUTO_INCREMENT , `ip` VARCHAR(20) NOT NULL , `endpoint` VARCHAR(6000) NOT NULL , `timestamp` TIMESTAMP NOT NULL , `id_dorayaki` INT(5) NOT NULL , `stok` INT(5) NOT NULL , `username` VARCHAR(6000) NOT NULL , `validate_timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`id`)) ENGINE = InnoDB;";
            int count = statement.executeUpdate(query);
            return "Tabel berhasil dibuat dengan return value "+count;
        } catch (Exception e) {
            e.printStackTrace();
            return "Ada masalah saat membuat tabel: " + e.getMessage();
        }
    }

    @Override
    public Integer addLogRequest(String ip, String endpoint, String timestamp) {
        try {
            DorayakiDBHandler handler = new DorayakiDBHandler();
            Connection conn  = handler.getConnection();
            Statement statement = conn.createStatement();
            String query="INSERT INTO log_req(ip,endpoint,timestamp) VALUES('%s','%s','%s');"; 
            String query_formatted = String.format(query, ip, endpoint, timestamp);
            int count = statement.executeUpdate(query_formatted);
            return count;
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    @Override
    public Boolean checkLogRequest(String ip, String endpoint, String timestamp, Integer threshold) {
        try {
            DorayakiDBHandler handler = new DorayakiDBHandler();
            Connection conn  = handler.getConnection();
            Statement statement = conn.createStatement();
            String query="SELECT COUNT(*) AS 'total' FROM `log_req` WHERE ip='%s' AND endpoint='%s' AND timestamp >= '%s' - INTERVAL 1 MINUTE;"; 
            String query_formatted = String.format(query, ip, endpoint, timestamp);
            ResultSet rs = statement.executeQuery(query_formatted);
            while (rs.next()){
                int count = rs.getInt("total");
                System.out.println("Count: " + count);
                System.out.println("Threshold: " + threshold);
                if(count < threshold){
                    return true;
                }else{
                    return false;
                }
            }
            return false;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Boolean checkRequest(String ip, String endpoint, String timestamp, Integer dorayaki_id, Integer stok ) {
        try {
            DorayakiDBHandler handler = new DorayakiDBHandler();
            Connection conn  = handler.getConnection();
            Statement statement = conn.createStatement();
            String query="SELECT COUNT(*) AS 'total' FROM `request` WHERE ip='%s' AND endpoint='%s' AND timestamp >= '%s' - INTERVAL 1 MINUTE AND dorayaki_id=%d AND stok=%d AND status='ACCEPTED';"; 
            String query_formatted = String.format(query, ip, endpoint, timestamp, dorayaki_id, stok);
            ResultSet rs = statement.executeQuery(query_formatted);
            while (rs.next()){
                int count = rs.getInt("total");
                System.out.println("Count: " + count);
                if(count > 1){
                    return true;
                }else{
                    return false;
                }
            }
            return false;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public String addDorayakiRequest(String ip, String endpoint, String timestamp, Integer id_dorayaki, Integer stok, String username) {
        System.out.println(ip);
        System.out.println(endpoint);
        System.out.println(timestamp);
        System.out.println(id_dorayaki);
        System.out.println(stok);
        System.out.println(username);

        Integer threshold = 10;
        Integer status = addLogRequest(ip, endpoint, timestamp);
        if(checkLogRequest(ip, endpoint, timestamp, threshold) && status==1){
            try {
                // DorayakiDBHandler handler = new DorayakiDBHandler();
                // Connection conn  = handler.getConnection();
                // Statement statement = conn.createStatement();
                // String query="INSERT INTO request(ip,endpoint, timestamp, id_dorayaki, stok, username) VALUES('%s','%s','%s', %d, %d, '%s');"; 
                // String query_formatted = String.format(query, ip, endpoint, timestamp, id_dorayaki, stok, username);
                // int count = statement.executeUpdate(query_formatted);
                
                // Client client = ClientBuilder.newClient();
                // WebTarget target = client.target("https://localhost:8008/request");
                String timestamp2 = timestamp.replace(" ", "T") + "Z"; 
                String requestnya = ClientUtil.createRequestInJSON(ip, endpoint, timestamp2, id_dorayaki, stok, username);
                // System.out.println(requestnya);
                // String response = target.request()
                //                     .post(Entity.entity(requestnya, MediaType.APPLICATION_JSON), String.class);
                // System.out.println(response);

                HttpClient client = HttpClient.newBuilder().build();
                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create("http://localhost:8008/request"))
                        .header("content-type", "application/json")
                        .POST(BodyPublishers.ofString(requestnya))
                        .build();

                HttpResponse<?> response = client.send(request, BodyHandlers.discarding());
                System.out.println(response.statusCode());
                return "Berhasil dimasukkan dengan response " + response;
            } catch (Exception e) {
                e.printStackTrace();
                return "Ada masalah saat insert tabel: " + e.getMessage();
            }
        }else{
            return "Request melebihi threshold " + String.valueOf(threshold);
        }
    }
}
