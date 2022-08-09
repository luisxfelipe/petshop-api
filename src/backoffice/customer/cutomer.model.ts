import { CreditCard } from "./credit-card/credit-card.model";
import { Pet } from "./pet/pet.model";
import { User } from "../user/user.model";
import { Address } from "./address/address.model";

export class Customer {
    
    constructor(
        public name: string,
        public document: string,
        public email: string,
        public pets: Pet[],
        public billingAddress: Address,
        public shippingAddress: Address,
        public creditCard: CreditCard,
        public user: User
    ) {
        
    }
}