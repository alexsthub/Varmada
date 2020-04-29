// swiftlint:disable all
import Amplify
import Foundation

extension Package {
  // MARK: - CodingKeys 
   public enum CodingKeys: String, ModelKey {
    case id
    case user
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
    let package = Package.keys
    
    model.pluralName = "Packages"
    
    model.fields(
      .id(),
      .belongsTo(package.user, is: .optional, ofType: User.self, targetName: "packageUserId"),
      .field(package.PaymentID, is: .required, ofType: .int),
      .field(package.AddressID, is: .required, ofType: .int),
      .field(package.itemName, is: .required, ofType: .string),
      .field(package.carrier, is: .required, ofType: .enum(type: Carrier.self)),
      .field(package.packageType, is: .required, ofType: .string),
      .field(package.date, is: .required, ofType: .string),
      .field(package.time, is: .required, ofType: .string),
      .field(package.price, is: .required, ofType: .int)
    )
    }
}