// swiftlint:disable all
import Amplify
import Foundation

public struct Address: Model {
  public let id: String
  public var user: User?
  public var streetAddress: String
  public var city: String
  public var State: String
  public var zip: Int
  
  public init(id: String = UUID().uuidString,
      user: User? = nil,
      streetAddress: String,
      city: String,
      State: String,
      zip: Int) {
      self.id = id
      self.user = user
      self.streetAddress = streetAddress
      self.city = city
      self.State = State
      self.zip = zip
  }
}