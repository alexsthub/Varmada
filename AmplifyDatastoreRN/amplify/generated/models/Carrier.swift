// swiftlint:disable all
import Amplify
import Foundation

public enum Carrier: String, EnumPersistable {
  case ups = "UPS"
  case usps = "USPS"
  case fedEx = "FedEx"
}