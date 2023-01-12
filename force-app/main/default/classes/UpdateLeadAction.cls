public with sharing class UpdateLeadAction {

    /* Add a method that will accept Postal code and Lead id from Flow,
    then call the getAddress
    */
            @InvocableMethod(label='Update Lead Address with Help of Postal code' description='Update Lead Address after Accepting Postal code and Lead ID from flow')
            public static List<FlowResponseParam> doAction(List<FlowRequestParam> lstRequest) {
                List<FlowResponseParam>  lstResp = new List<FlowResponseParam> ();
                if(lstRequest.size() > 0){
                    FlowRequestParam flowReq = lstRequest[0];
                    FlowResponseParam flowRes = new FlowResponseParam();
                    getAddress(flowReq.leadId, flowReq.postalCode);
                    flowRes.result = 'Calling the method for API Callout';
                    lstResp.add(flowRes);
                }
                return lstResp;
            }
    
            public class FlowRequestParam {
                @InvocableVariable(required=true  label= 'Lead Id')
                public Id leadId;
    
                @InvocableVariable(required=true  label= 'Postal Code /Zip Code')
                public String postalCode;
            }
    
            public class FlowResponseParam {
                @InvocableVariable()
                public String result;
            }
    
        @future(callout = true)
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
    