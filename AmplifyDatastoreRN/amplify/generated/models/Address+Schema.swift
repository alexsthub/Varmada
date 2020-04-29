// swiftlint:disable all
import Amplify
import Foundation

extension Address {
  // MARK: - CodingKeys 
   public enum CodingKeys: String, ModelKey {
    case id
    case user
    case streetAddress
    case city
    case State
    case zip
  }
  
  public static let keys = CodingKeys.self
  //  MARK: - ModelSchema 
  
  public static let schema = defineSchema { model in
    let address = Address.keys
    
    model.pluralName = "Addresses"
    
    model.fields(
      .id(),
      .belongsTo(address.user, is: .optional, ofType: User.self, targetName: "addressUserId"),
      .field(address.streetAddress, is: .required, ofType: .string),
      .field(address.city, is: .required, ofType: .string),
      .field(address.State, is: .required, ofType: .string),
      .field(address.zip, is: .required, ofType: .int)
    )
    }
}