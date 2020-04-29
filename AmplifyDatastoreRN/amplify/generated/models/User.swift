// swiftlint:disable all
import Amplify
import Foundation

public struct User: Model {
  public let id: String
  public var phoneNumber: Int
  public var firstName: String
  public var lastName: String
  public var cart: Cart
  public var address: List<Address>?
  public var payment: List<Payment>?
  public var package: List<Package>?
  
  public init(id: String = UUID().uuidString,
      phoneNumber: Int,
      firstName: String,
      lastName: String,
      cart: Cart,
      address: List<Address>? = [],
      payment: List<Payment>? = [],
      package: List<Package>? = []) {
      self.id = id
      self.phoneNumber = phoneNumber
      self.firstName = firstName
      self.lastName = lastName
      self.cart = cart
      self.address = address
      self.payment = payment
      self.package = package
  }
}