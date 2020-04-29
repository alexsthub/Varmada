// swiftlint:disable all
import Amplify
import Foundation

extension Payment {
  // MARK: - CodingKeys 
   public enum CodingKeys: String, ModelKey {
    case id
    case user
    case cardNumber
    case expirationDate
    case CVV
    case zipCode
    case country
  }
  
  public static let keys = CodingKeys.self
  //  MARK: - ModelSchema 
  
  public static let schema = defineSchema { model in
    let payment = Payment.keys
    
    model.pluralName = "Payments"
    
    model.fields(
      .id(),
      .belongsTo(payment.user, is: .optional, ofType: User.self, targetName: "paymentUserId"),
      .field(payment.cardNumber, is: .required, ofType: .int),
      .field(payment.expirationDate, is: .required, ofType: .int),
      .field(payment.CVV, is: .required, ofType: .int),
      .field(payment.zipCode, is: .required, ofType: .int),
      .field(payment.country, is: .required, ofType: .string)
    )
    }
}