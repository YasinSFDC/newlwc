public with sharing class workshopMiniProjectClass {
    public static void getAddress(Id leadId, String postalCode){
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('https://api.zippopotam.us/in/'+postalCode);
        request.setMethod('GET');
        try{
            HttpResponse response = http.send(request);
            // If the request is successful, parse the JSON response.
            if(response.getStatusCode() == 200) {
                String jsonStr = response.getBody();
                //Parser 
                AddressParser objAddress = AddressParser.parse(jsonStr);
                Lead objLead = new Lead (Id =leadId);
                objLead.Country = objAddress != null ? objAddress.country : '';
                if(objAddress.places != null && objAddress.places.size() > 0){
                        AddressParser.Places objPlace =  objAddress.places[0];
                        objLead.City = objPlace.place_name;
                        objLead.State = objPlace.state;
                }
            update objLead;
            }
        }
        catch(Exception ex){
            System.debug('Error is: ' + ex.getMessage()) ;
        }
    }
}
