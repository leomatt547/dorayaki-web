package webadut.services;

import javax.xml.ws.Endpoint;

public class App 
{
    public static void main( String[] args )
    {
        Endpoint.publish("http://localhost:8888/webservice/dorayaki", new DorayakiImplement());
    }
}
