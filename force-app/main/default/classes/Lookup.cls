public without sharing class Lookup {

    @AuraEnabled
    public static String searchDB(String sobjectName, String field_API_Name, String field_ID,String searchText ){
        List<LookupWrapper> lstLookup = new List<LookupWrapper>();        
        SObjectType schemaType = ((SObject)Type.forName(sobjectName).newInstance()).getSObjectType();
        Map<String, SObjectField> fields = schemaType.getDescribe().fields.getMap();
        List<sObject> sobjList = new List<sObject>();
        if (fields.get(field_API_Name).getDescribe().isAccessible() && fields.get(field_ID).getDescribe().isAccessible()){
            String query = 'SELECT ' +String.escapeSingleQuotes(field_ID)+','+String.escapeSingleQuotes(field_API_Name)+ ' FROM ' + String.escapeSingleQuotes(sobjectName) +' WHERE '+String.escapeSingleQuotes(field_API_Name)+' LIKE \'%' + String.escapeSingleQuotes(searchText.trim()) + '%\' WITH SECURITY_ENFORCED LIMIT 10';
            sobjList = Database.query(query);
            for(SObject s : sobjList){
                LookupWrapper obj = new LookupWrapper();
                obj.text = String.valueOf(s.get(field_API_Name)) ;
                obj.val = String.valueOf(s.get(field_ID))  ;
                obj.id = String.valueOf(s.get(field_ID))  ;
                lstLookup.add(obj);
            }
        }
        return JSON.serialize(lstLookup) ;
    }

    public class LookupWrapper{
        public String text{get;set;}
        public String val{get;set;}
        public String id{get;set;}
    }


}