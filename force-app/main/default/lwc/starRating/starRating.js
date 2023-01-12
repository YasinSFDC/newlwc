import { LightningElement, api } from 'lwc';

// export default class StarRating extends LightningElement {
    export default class ChildRating extends LightningElement {
        pizzarating;
        deliveryrating;
        burgerrating;
        packagerating;
        resturentrating;
      
        rating(event) {
          if (event.target.name === "Pizza") {
            this.pizzarating = event.target.value;
          }
          if (event.target.name === "Burger") {
            this.burgerrating = event.target.value;
          }
          if (event.target.name === "Package") {
            this.packagerating = event.target.value;
          }
          if (event.target.name === "Delivery") {
            this.deliveryrating = event.target.value;
          }
          if(event.target.name === "Resturent"){
            this.resturentrating = event.target.value;
          }
        }
      
        getvalues() {
          alert(
            "DeliveryRating:" +
              this.deliveryrating +
              ", PizzaRating:" +
              this.pizzarating +
              ", BurgerRating:" +
              this.burgerrating +
              ", PackageRating:" +
              this.packagerating +
              ", ResturentRating: " +
              this.resturentrating
          );
        }
      }