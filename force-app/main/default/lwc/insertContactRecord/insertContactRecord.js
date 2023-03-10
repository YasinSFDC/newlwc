import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import conMainObject from '@salesforce/schema/Contact';
import conFirstName from '@salesforce/schema/Contact.FirstName';
import conLastName from '@salesforce/schema/Contact.LastName';
import conEmail from '@salesforce/schema/Contact.Email';
import conPhone from '@salesforce/schema/Contact.Phone';
import conDepartment from '@salesforce/schema/Contact.Department';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
export default class InsertContactRecord extends NavigationMixin(LightningElement) {

    firstName = '';
    lastName = '';
    phoneNo = '';
    emailId = '';
    departmentVal = '';

    contactChangeVal(event) {
        console.log(event.target.label);
        console.log(event.target.value);
        if (event.target.label == 'First Name') {
            this.firstName = event.target.value;
        }
        if (event.target.label == 'Last Name') {
            this.lastName = event.target.value;
        }
        if (event.target.label == 'Phone') {
            this.phoneNo = event.target.value;
        }
        if (event.target.label == 'Email') {
            this.emailId = event.target.value;
        }
        if (event.target.label == 'Department') {
            this.departmentVal = event.target.value;
        }


    }

    insertContactAction() {
        console.log(this.selectedAccountId);
        const fields = {};
        fields[conFirstName.fieldApiName] = this.firstName;
        fields[conLastName.fieldApiName] = this.lastName;
        fields[conEmail.fieldApiName] = this.emailId;
        fields[conPhone.fieldApiName] = this.phoneNo;
        fields[conDepartment.fieldApiName] = this.departmentVal;

        const recordInput = { apiName: conMainObject.objectApiName, fields };
        createRecord(recordInput)
            .then(contactobj => {
                this.contactId = contactobj.id;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Contact record has been created',
                        variant: 'success',
                    }),
                );
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: contactobj.id,
                        objectApiName: 'Contact',
                        actionName: 'view'
                    },
                });



            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
    }
}