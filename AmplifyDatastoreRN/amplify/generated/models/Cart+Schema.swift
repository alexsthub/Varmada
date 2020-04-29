// swiftlint:disable all
import Amplify
import Foundation

extension Cart {
  // MARK: - CodingKeys 
   public enum CodingKeys: String, ModelKey {
    case id
    case PaymentID
    case AddressID
    case itemName
    case carrier
    case packageType
    case date
    case time
    case price
  }
  
  public static let keys = CodingKeys.self
  //  MARK: - ModelSchema 
  
  public static let schema = defineSchema { model in
    let cart = Cart.keys
    
    model.pluralName = "Carts"
    
    model.fields(
      .id(),
      .field(cart.PaymentID, is: .optional, ofType: .int),
      .field(cart.AddressID, is: .optional, ofType: .int),
      .field(cart.itemName, is: .optional, ofType: .string),
      .field(cart.carrier, is: .optional, ofType: .enum(type: Carrier.self)),
      .field(cart.packageType, is: .optional, ofType: .string),
      .field(cart.date, is: .optional, ofType: .string),
      .field(cart.time, is: .optional, ofType: .string),
      .field(cart.price, is: .optional, ofType: .int)
    )
    }
}