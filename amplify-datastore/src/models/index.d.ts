import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Address {
  readonly id: string;
  readonly phoneNumber: string;
  readonly name: string;
  readonly placeID: string;
  readonly address: string;
  readonly city: string;
  readonly state: string;
  readonly zip: string;
  readonly countryCode: string;
  constructor(init: ModelInit<Address>);
  static copyOf(source: Address, mutator: (draft: MutableModel<Address>) => MutableModel<Address> | void): Address;
}

export declare class Payment {
  readonly id: string;
  readonly phoneNumber: string;
  readonly cardNumber: number;
  readonly expirationDate: number;
  readonly CVV: number;
  readonly zipCode: number;
  readonly country: string;
  constructor(init: ModelInit<Payment>);
  static copyOf(source: Payment, mutator: (draft: MutableModel<Payment>) => MutableModel<Payment> | void): Payment;
}

export declare class Package {
  readonly id: string;
  readonly phoneNumber: string;
  readonly Address: string;
  readonly itemName: string;
  readonly carrier: string;
  readonly date: string;
  readonly time: string;
  readonly itemCost: number;
  readonly deliveryCost: string;
  readonly printingCost: number;
  readonly packageCost: string;
  readonly packageType?: string;
  readonly salesTax: string;
  readonly total: number;
  constructor(init: ModelInit<Package>);
  static copyOf(source: Package, mutator: (draft: MutableModel<Package>) => MutableModel<Package> | void): Package;
}