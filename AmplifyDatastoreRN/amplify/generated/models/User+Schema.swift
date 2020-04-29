// swiftlint:disable all
import Amplify
import Foundation

extension User {
  // MARK: - CodingKeys 
   public enum CodingKeys: String, ModelKey {
    case id
    case phoneNumber
    case firstName
    case lastName
    case cart
    case address
    case payment
    case package
  }
  
  public static let keys = CodingKeys.self
  //  MARK: - ModelSchema 
  
  public static let schema = defineSchema { model in
    let user = User.keys
    
    model.pluralName = "Users"
    
    model.fields(
      .id(),
      .field(user.phoneNumber, is: .required, ofType: .int),
      .field(user.firstName, is: .required, ofType: .string),
      .field(user.lastName, is: .required, ofType: .string),
      .belongsTo(user.cart, is: .required, ofType: Cart.self, targetName: "userCartId"),
      .hasMany(user.address, is: .optional, ofType: Address.self, associatedWith: Address.keys.user),
      .hasMany(user.payment, is: .optional, ofType: Payment.self, associatedWith: Payment.keys.user),
      .hasMany(user.package, is: .optional, ofType: Package.self, associatedWith: Package.keys.user)
    )
    }
}