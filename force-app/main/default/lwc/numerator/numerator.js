import { LightningElement, api } from 'lwc';

export default class Numerator extends LightningElement {
   // counter = 0;         // Communicate from Child to Parent
  // @api counter = 0;      //  Communicate from Parent to Child
  _currentCount = 0;
  priorCount = 0;
  @api
  get counter() {
    return this._currentCount;
  }
  set counter(value) {
    this.priorCount = this._currentCount;
    this._currentCount = value;
  }
  
  handleIncrement() {
    this.counter++;
  }
  handleDecrement() {
    this.counter--;
  }
  handleMultiply(event) {
    const factor = event.detail;
    this.counter *= factor;
  }

//   parent to child
  @api
  maximizeCounter(){
    this.counter += 100000;
  }
}