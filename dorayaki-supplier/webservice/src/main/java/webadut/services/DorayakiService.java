package webadut.services;

import javax.jws.WebMethod;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import javax.jws.soap.SOAPBinding.Style;

@WebService
@SOAPBinding(style = Style.DOCUMENT)
public interface DorayakiService {
    @WebMethod
    public String createLogRequestDatabase();

    @WebMethod
    public String createRequestDatabase();

    @WebMethod
    public Integer addLogRequest(String ip, String endpoint, String timestamp);

    @WebMethod
    public Boolean checkLogRequest(String ip, String endpoint, String timestamp, Integer threshold);
   
    @WebMethod
    public String addDorayakiRequest(String ip, String endpoint, String timestamp, Integer id_dorayaki, Integer stok, String username);

    @WebMethod
    public Boolean checkRequest(String ip, String endpoint, String timestamp, Integer dorayaki_id, Integer stok );
}
