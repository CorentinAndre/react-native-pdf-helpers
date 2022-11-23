#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(PdfHelpers, NSObject)

RCT_EXTERN_METHOD(generateThumbnail:(NSString *)filePath withPage:(int)page withQuality:(int)quality
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(getPageCount:(NSString *)filePath
                  withResolver:(RCTPromiseResolveBlock)resolve
                  withRejecter:(RCTPromiseRejectBlock)reject)

@end
