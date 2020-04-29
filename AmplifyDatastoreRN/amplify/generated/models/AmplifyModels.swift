// swiftlint:disable all
import Amplify
import Foundation

// Contains the set of classes that conforms to the `Model` protocol. 

final public class AmplifyModels: AmplifyModelRegistration {
  public let version: String = "48f8cca06a07be7456208119f13a7ac4"
  
  public func registerModels(registry: ModelRegistry.Type) {
    ModelRegistry.register(modelType: User.self)
    ModelRegistry.register(modelType: Cart.self)
    ModelRegistry.register(modelType: Address.self)
    ModelRegistry.register(modelType: Payment.self)
    ModelRegistry.register(modelType: Package.self)
  }
}