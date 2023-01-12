public with sharing class CompanyFormHelper {
    // Record create Form start 
    public CompanyFormHelper() {
    }
    @auraEnabled
    public static Company__c createcompanydetails(String Name, String Location, String Email, String link, String Address){
        Company__c company = new Company__c();
        company.Name = Name;
        company.Company_Location__c = Location;
        company.Company_Email__c = Email;
        company.Company_Link__c = link;
        company.Company_Address__c = Address;
        if(isCreatable('Company__c') == true){
            insert company;
            return company;
        }
        return null;
    }
    public static boolean isCreatable(string sObjectType){
        sObjectType schemaType = schema.getGlobalDescribe().get(sObjectType);
        return schemaType.getDescribe().isCreateable();
    }
    // Record create Form end 

    // table start
    @AuraEnabled(cacheable=true)
    public static List<Company__c> getCompanyDetails(){
      return[Select Id, Name, Company_Location__c, Company_Email__c, Company_Link__c, Company_Address__c From Company__c ORDER BY Name ASC];
      }
    // table end

    // pagination start
    public class ContactItemWrapper {       
        public Integer recordStart {get;set;}
        public Integer pageNumber {get;set;}
        public Integer totalRecords {get;set;}
        public Integer recordEnd {get;set;}
        public Integer pageSize {get;set;}       
        public List<Company__c> Companies {get;set;}
    }
    
    @AuraEnabled
    public static String getContactList(Integer pageSize, Integer pageNumber){
        String jsonObjItm = '';
         
        
        Integer offset = (pageNumber - 1) * pageSize;         
        
        Integer totalRecords = [SELECT COUNT() FROM Company__c];
        Integer recordEnd = pageSize * pageNumber;
         
        ContactItemWrapper conObj =  new ContactItemWrapper();  
        conObj.pageNumber = pageNumber;
        conObj.pageSize = pageSize;        
        conObj.recordStart = offset + 1;
        conObj.recordEnd = totalRecords >= recordEnd ? recordEnd : totalRecords;
        conObj.totalRecords = totalRecords;
        conObj.Companies = [SELECT Id, Name, Company_Location__c, Company_Email__c, Company_Link__c, Company_Address__c FROM Company__c LIMIT :pageSize OFFSET :offset];
        jsonObjItm = JSON.serialize(conObj);
        return jsonObjItm;
    }

    // pagination end


    // Edit start


    // Edit end

}
