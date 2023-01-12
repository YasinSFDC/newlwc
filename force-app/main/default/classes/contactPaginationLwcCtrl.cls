public with sharing class contactPaginationLwcCtrl {

    public class ContactItemWrapper {
        public integer recordStart {get;set;}
        public integer pageNumber {get;set;}
        public integer totalRecords {get;set;}
        public integer recordEnd {get;set;}
        public integer pageSize {get;set;}
        public list<contact> contacts {get;set;}
    }
    
    @AuraEnabled
    public static string getContactList(Integer pageSize, Integer pageNumber){
        string jsonObjItm = '';
        Integer offSet = (pageNumber - 1) * pageSize;
        Integer totalRecords = [SELECT Count() FROM Contact ];
        Integer recordEnd = pageSize * pageNumber;
        ContactItemWrapper conObj = new ContactItemWrapper();
        conObj.pageNumber = pageNumber;
        conObj.pageSize = pageSize;
        conObj.recordStart = offSet + 1;
        conObj.recordEnd = totalRecords >= recordEnd ? recordEnd : totalRecords;
        conObj.totalRecords = totalRecords;
        conObj.contacts = [SELECT Id, Name, FirstName, Email, Phone, Title FROM Contact LIMIT : pageSize OFFSET : offset];
        jsonObjItm = json.serialize(conObj);
        return jsonObjItm;
    }
}
