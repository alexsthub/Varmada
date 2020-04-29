// swiftlint:disable all
import Amplify
import Foundation

public struct Cart: Model {
  public let id: String
  public var PaymentID: Int?
  public var AddressID: Int?
  public var itemName: String?
  public var carrier: Carrier?
  public var packageType: String?
  public var date: String?
  public var time: String?
  public var price: Int?
  
  public init(id: String = UUID().uuidString,
      PaymentID: Int? = nil,
      AddressID: Int? = nil,
      itemName: String? = nil,
      carrier: Carrier? = nil,
      packageType: String? = nil,
      date: String? = nil,
      time: String? = nil,
      price: Int? = nil) {
      self.id = id
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