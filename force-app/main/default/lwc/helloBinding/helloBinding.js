import { LightningElement } from 'lwc';

export default class HelloBinding extends LightningElement {
    greeting = 'World';

    handleChange(event){
        // this.greeting = Girikon ; (Always show statically) its show statics value
        // console.log('Value is ' + event.target.value);
        this.greeting = event.target.value;
    }
}