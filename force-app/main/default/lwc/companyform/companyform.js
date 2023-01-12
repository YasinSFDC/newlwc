import { LightningElement, track, wire, api } from 'lwc';

import createcompanydetails from '@salesforce/apex/CompanyFormHelper.createcompanydetails';     // Record create Form 
import { ShowToastEvent } from 'lightning/platformShowToastEvent';     //show toast message
import getCompanyDetails from '@salesforce/apex/CompanyFormHelper.getCompanyDetails';    //for table data
import {deleteRecord} from 'lightning/uiRecordApi';      //delete record 
import {editRecord} from 'lightning/uiRecordApi';   //edit record

import getContactList from '@salesforce/apex/CompanyFormHelper.getContactList';    // pagination
export default class Companyform extends LightningElement {

    @wire(getCompanyDetails) getallDetails;    //for table data

    // Record create Form start
    @track companyName;
    @track companyLocation;
    @track companyEmail;
    @track companyLink;
    @track companyAddress;
 
    onhandlechange(event) {
        if (event.target.label == 'Enter Company Name') {
            this.companyName = event.target.value;
        }
        if (event.target.label == 'Enter Company Location') {
            this.companyLocation = event.target.value;
        }
        if (event.target.label == 'Enter Email Id') {
            this.companyEmail = event.target.value;
        }
        if (event.target.label == 'Enter Company Address') {
            this.companyAddress = event.target.value;
        }
        if (event.target.label == 'Enter Company Website') {
            this.companyLink = event.target.value;
        }
    }

    createcompany() {
        createcompanydetails({ Name: this.companyName, Location: this.companyLocation, Email: this.companyEmail, link: this.companyLink, Address: this.companyAddress })

            .then(result => {
                if (result) {
                    const evt = new ShowToastEvent({
                        title: 'Creation Success',
                        message: 'Record Created SuccesFully',
                        variant: 'success',
                        mode: 'dissmissable'
                    });
                    this.dispatchEvent(evt);
                    this.createdAccountId = result.Id;
                }
                else {
                    this.error = 'You dont have permission to create record';
                }
            })
            .catch(error => {
                this.error = error;
                this.createdAccountId = undefined;
            });
    }

    // Record create Form end 

    // Delete record start
    deleteRecord(event) {
        this.recordId = event.target.value;
        deleteRecord(this.recordId)

            .then(() => {
                const toastevt = new ShowToastEvent({
                    title: 'Record Deleted',
                    message: 'Record deleted successfully',
                    variant: 'error',
                    mode: 'dismisable'
                })
                this.dispatchEvent(toastevt);
                return refreshApex(this.getCompanyDetails);
            })
            .catch(error => {
                window.console.log('Unable to delete record due to ' + error.body.message);
            });
    }
    // delete record end


    // pagination start
    @track recordEnd = 0;
    @track recordStart = 0;
    @track pageNumber = 1;
    @track totalRecords = 0;
    @track totalPages = 0;
    @track loaderSpinner = false;
    @track error = null;
    @track pageSize = 10;    
    @track isPrev = true;
    @track isNext = true;
    @track Company__c = [];
    
    connectedCallback() {
        this.getContacts();
    }
 
    
    handlePageNextAction(){
        this.pageNumber = this.pageNumber+1;
        this.getContacts();
    }
 
   
    handlePagePrevAction(){
        this.pageNumber = this.pageNumber-1;
        this.getContacts();
    }
 
    
    getContacts(){
        this.loaderSpinner = true;
        getContactList({pageSize: this.pageSize, pageNumber : this.pageNumber})
        .then(result => {
            this.loaderSpinner = false;
            if(result){
                var resultData = JSON.parse(result);
                this.recordEnd = resultData.recordEnd;
                this.totalRecords = resultData.totalRecords;
                this.recordStart = resultData.recordStart;
                this.Company__c = resultData.Company__c;
                this.pageNumber = resultData.pageNumber;                
                this.totalPages = Math.ceil(resultData.totalRecords / this.pageSize);
                this.isNext = (this.pageNumber == this.totalPages || this.totalPages == 0);
                this.isPrev = (this.pageNumber == 1 || this.totalRecords < this.pageSize);
            }
        })
        .catch(error => {
            this.loaderSpinner = false;
            this.error = error;
        });
    }
 
   
    get isDisplayNoRecords() {
        var isDisplay = true;
        if(this.Company__c){
            if(this.Company__c.length == 0){
                isDisplay = true;
            }else{
                isDisplay = false;
            }
        }
        return isDisplay;
    }

    // pagination end


    // Edit start
    editRecord(event) {
        this.recordId = event.target.value;
        editRecord(this.recordId)

            .then(() => {
                const toastevt = new ShowToastEvent({
                    title: 'Record Updated',
                    message: 'Record deleted successfully',
                    variant: 'info',
                    mode: 'dismisable'
                })
                this.dispatchEvent(toastevt);
                return refreshApex(this.getCompanyDetails);
            })
            .catch(error => {
                window.console.log('Unable to delete record due to ' + error.body.message);
            });
    }
    // Edit end

}