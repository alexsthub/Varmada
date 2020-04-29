// swiftlint:disable all
import Amplify
import Foundation

public struct Package: Model {
  public let id: String
  public var user: User?
  public var PaymentID: Int
  public var AddressID: Int
  public var itemName: String
  public var carrier: Carrier
  public var packageType: String
  public var date: String
  public var time: String
  public var price: Int
  
  public init(id: String = UUID().uuidString,
      user: User? = nil,
      PaymentID: Int,
      AddressID: Int,
      itemName: String,
      carrier: Carrier,
      packageType: String,
      date: String,
      time: String,
      price: Int) {
      self.id = id
      self.user = user
      self.PaymentID = PaymentID
      self.AddressID = AddressID
      self.itemName = itemName
      self.carrier = carrier
      self.packageType = packageType
      self.date = date
      self.time = time
      self.price = price
  }
}