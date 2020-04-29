// swiftlint:disable all
import Amplify
import Foundation

public struct Payment: Model {
  public let id: String
  public var user: User?
  public var cardNumber: Int
  public var expirationDate: Int
  public var CVV: Int
  public var zipCode: Int
  public var country: String
  
  public init(id: String = UUID().uuidString,
      user: User? = nil,
      cardNumber: Int,
      expirationDate: Int,
      CVV: Int,
      zipCode: Int,
      country: String) {
      self.id = id
      self.user = user
      self.cardNumber = cardNumber
      self.expirationDate = expirationDate
      self.CVV = CVV
      self.zipCode = zipCode
      self.country = country
  }
}