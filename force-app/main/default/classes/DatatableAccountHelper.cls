public with sharing class DatatableAccountHelper {
    // YAccount Record start without pagination
    // @AuraEnabled(cacheable=true)
    // public static List<Account>accList() {
    //    return[SELECT Id, Name, Phone, Rating, Website FROM Account ORDER BY Name ASC];
    // }
    // YAccount Record end without pagination

     // apex method to fetch Account records from salesforce database 
     @AuraEnabled
     public static list<Account> fetchAccounts(){        
             list<Account> lstAccount = new list<Account>();
             for(Account con : [SELECT id,name,phone,Rating,Website FROM Account ORDER BY Name ASC]){
                lstAccount.add(con);
             } 
             return lstAccount;        
     }
}
