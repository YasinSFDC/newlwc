public with sharing class lwcCustomModalHelper {
    public lwcCustomModalHelper() {
    }
    // record create start
    @AuraEnabled
    public static contact createContModal(String firstName, String lastName, String Phone, String Email, String Dept, string accName ){
        Contact cont = new Contact();
        cont.FirstName = firstName;
        cont.LastName = lastName;
        cont.Phone = Phone;
        cont.Email = Email;
        cont.Department = Dept;
        cont.AccountId = accName;
       // system.debug(cont);
        if(isCreatable('Contact') == true){
            insert cont;
            return cont;
        }
        return null;
    }

    public static boolean isCreatable(string sObjectType){
        sObjectType schemaType = schema.getGlobalDescribe().get(sObjectType);
        return schemaType.getDescribe().isCreateable();
    }
    // record create end
}
