import { LightningElement, track, wire, api} from 'lwc';
// YAccount Record start without pagination
// import accList from '@salesforce/apex/DatatableAccountHelper.accList';
// YAccount Record end without pagination
import fetchAccounts from '@salesforce/apex/DatatableAccountHelper.fetchAccounts';

export default class DataTableAccount extends LightningElement {
    // YAccount Record start without pagination
// @track columns = [
//     {
//         label: 'Account Name',
//         fieldName: 'Name',
//         type: 'text',
//         sortable: true
//     },
//     {
//         label: 'Phone No',
//         fieldName: 'Phone',
//         type: 'phone',
//         sortable: true
//     },
//     {
//         label: 'Rating',
//         fieldName: 'Rating',
//         type: 'text',
//         sortable: true
//     },
//     {
//         label: 'Website',
//         fieldName: 'Website',
//         type: 'url',
//         sortable: true
//     }
// ];
// @track error;
// @track accRecord;
// @wire(accList)
// wiredAccounts({
//     error,
//     data
// }) {
//     if(data){
//         this.accRecord = data;
//     } else if (error) {
//         this.error = error;
//     }
// }
// YAccount Record end without pagination



 // JS Properties 
 pageSizeOptions = [10, 25, 50, 75, 100]; //Page size options
 records = []; //All records available in the data table
 columns = []; //columns information available in the data table
 totalRecords = 0; //Total no.of records
 pageSize; //No.of records to be displayed per page
 totalPages; //Total no.of pages
 pageNumber = 1; //Page number    
 recordsToDisplay = []; //Records to be displayed on the page
 

 get bDisableFirst() {
     return this.pageNumber == 1;
 }

 get bDisableLast() {
     return this.pageNumber == this.totalPages;
 }

 // connectedCallback method called when the element is inserted into a document
 connectedCallback() {
     // set datatable columns info
     this.columns = [{
             label: 'Name',
             fieldName: 'Name'
         },
         
         {
             label: 'Phone No',
             fieldName: 'Phone'
         },
         {
             label: 'Rating',
             fieldName: 'Rating'
         },
         {
             label: 'Website',
             fieldName: 'Website'
         },
     ];
    
     // fetch contact records from apex method 
     fetchAccounts()
         .then((result) => {
             if (result != null) {
                 console.log('RESULT--> ' + JSON.stringify(result));
                 this.records = result;
                 this.totalRecords = result.length; // update total records count                 
                 this.pageSize = this.pageSizeOptions[0]; //set pageSize with default value as first option
                 this.paginationHelper(); // call helper menthod to update pagination logic 
             }
         })
         .catch((error) => {
             console.log('error while fetch contacts--> ' + JSON.stringify(error));
         });
 }

 handleRecordsPerPage(event) {
     this.pageSize = event.target.value;
     this.paginationHelper();
 }

 previousPage() {
     this.pageNumber = this.pageNumber - 1;
     this.paginationHelper();
 }

 nextPage() {
     this.pageNumber = this.pageNumber + 1;
     this.paginationHelper();
 }

 firstPage() {
     this.pageNumber = 1;
     this.paginationHelper();
 }

 lastPage() {
     this.pageNumber = this.totalPages;
     this.paginationHelper();
 }


 // JS function to handel pagination logic 
 paginationHelper() {
     this.recordsToDisplay = [];
     // calculate total pages
     this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
     // set page number 
     if (this.pageNumber <= 1) {
         this.pageNumber = 1;
     } else if (this.pageNumber >= this.totalPages) {
         this.pageNumber = this.totalPages;
     }

     // set records to display on current page 
     for (let i = (this.pageNumber - 1) * this.pageSize; i < this.pageNumber * this.pageSize; i++) {
         if (i === this.totalRecords) {
             break;
         }
         this.recordsToDisplay.push(this.records[i]);
     }
 }

//  record clickable start

// record clickable end
}