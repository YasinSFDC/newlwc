import { LightningElement, track } from 'lwc';
import createContModal from '@salesforce/apex/lwcCustomModalHelper.createContModal';    // Record create  
import { ShowToastEvent } from 'lightning/platformShowToastEvent';     //show toast message

export default class LwcCustomModal extends LightningElement {

    // Popup Start
    @track customFormModal = false;
    customShowModalPopup(){
        this.customFormModal = true;
    }
    customHideModalPopup(){
        this.customFormModal = false;
    }
    // popup end

    // Create record start
    @track fName;
    @track lName;
    @track email;
    @track phone;
    @track depmnt;
    @track accNam;
    onHandleSubmit(event){
        if(event.target.label == 'First Name'){
            this.fName = event.target.value;
        }

        if(event.target.label == "Last Name"){
            this.lName = event.target.value;
        }
        if(event.target.label == 'Email'){
            this.email = event.target.value;
        }
        if(event.target.label){
            this.phone = event.target.value;
        }
        if(event.target.label == 'Department'){
            this.depmnt = event.target.value;
        }
        if(event.target.label){
            this.accNam = event.target.value;
        }
    }
    createContModal(){
        // alert(this.accNam);
        createContModal({firstName: this.fName, lastName: this.lName, Phone: this.phone, Email: this.email, Dept: this.depmnt, 
                                accName:  this.selectedAccount})
            
        .then(result => {
            if (result) {
                const evt = new ShowToastEvent({
                    title: 'Creation Success',
                    message: 'Contact Record Created SuccesFully',
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
    // Create record end

    // Account lookup start
    selectedAccount;

    handleAccountSelection(event){
        this.selectedAccount = event.target.value;
        alert("The selected Accout id is"+this.selectedAccount);
    }
    // account lookup end

    // table start
    
    // table end
}