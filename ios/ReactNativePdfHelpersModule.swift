import ExpoModulesCore

public class ReactNativePdfHelpersModule: Module {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  public func definition() -> ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('ReactNativePdfHelpers')` in JavaScript.
    Name("ReactNativePdfHelpers")

    // Sets constant properties on the module. Can take a dictionary or a closure that returns a dictionary.
    Constants([
      "PI": Double.pi
    ])

    // Defines event names that the module can send to JavaScript.
    Events("onChange")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("hello") {
      return "Hello world! 👋"
    }

    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
    AsyncFunction("generateThumbnail") {filePath: String,page: Int, quality: Int, promise: Promise ->
      guard let fileUrl = URL(string: filePath) else {
          promise.reject("FILE_NOT_FOUND", "File \(filePath) not found", nil)
          return
      }
      guard let pdfDocument = PDFDocument(url: fileUrl) else {
          promise.reject("FILE_NOT_FOUND", "File \(filePath) not found", nil)
          return
      }
      guard let pdfPage = pdfDocument.page(at: page) else {
          promise.reject("INVALID_PAGE", "Page number \(page) is invalid, file has \(pdfDocument.pageCount) pages", nil)
          return
      }

      if let pageResult = generatePage(pdfPage: pdfPage, filePath: filePath, page: page, quality: quality) {
          promise.resolve(pageResult)
      } else {
          promise.reject("INTERNAL_ERROR", "Cannot write image data", nil)
      }
    }

    AsyncFunction("getPageCount") {filePath: String, promise: Promise ->
      guard let fileUrl = URL(string: filePath) else {
          promise.reject("FILE_NOT_FOUND", "File \(filePath) not found", nil)
          return
      }
      guard let pdfDocument = PDFDocument(url: fileUrl) else {
          promise.reject("FILE_NOT_FOUND", "File \(filePath) not found", nil)
          return
      }

      promise.resolve(pdfDocument.pageCount)
    }
  }

  func getCachesDirectory() -> URL {
      let paths = FileManager.default.urls(for: .cachesDirectory, in: .userDomainMask)
      return paths[0]
  }

  func getOutputFilename(filePath: String, page: Int) -> String {
      let components = filePath.components(separatedBy: "/")
      var prefix: String
      if let originalFilename = components.last {
          prefix = originalFilename.replacingOccurrences(of: ".", with: "-")
      } else {
          prefix = "pdf"
      }
      let random = Int.random(in: 0 ..< Int.max)
      return "\(prefix)-thumbnail-\(page)-\(random).jpg"
  }

  func generatePage(pdfPage: PDFPage, filePath: String, page: Int, quality: Int) -> Dictionary<String, Any>? {
      let pageRect = pdfPage.bounds(for: .mediaBox)
      let image = pdfPage.thumbnail(of: CGSize(width: pageRect.width, height: pageRect.height), for: .mediaBox)
      let outputFile = getCachesDirectory().appendingPathComponent(getOutputFilename(filePath: filePath, page: page))
      guard let data = image.jpegData(compressionQuality: CGFloat(quality) / 100) else {
          return nil
      }
      do {
          try data.write(to: outputFile)
          return [
              "uri": outputFile.absoluteString,
              "width": Int(pageRect.width),
              "height": Int(pageRect.height),
          ]
      } catch {
          return nil
      }
  }

}
