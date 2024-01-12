//
//  aes.m
//  NoritzConnect
//
//  Created by User on 9/1/20.
//

#import "aes.h"
#import <React/RCTLog.h>
#import <CommonCrypto/CommonCryptor.h>
#import <CommonCrypto/CommonDigest.h>



@implementation aes
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location)
{
  RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
}

RCT_EXPORT_METHOD(findEvents:(RCTResponseSenderBlock)callback)
{
  NSString *events =  @"Success";
  callback(@[[NSNull null], events]);
}




RCT_EXPORT_METHOD(encrypt: (NSString *)encryptvalue :(RCTResponseSenderBlock)callback)
{
  NSString* key = @"00f74597de203655b1ebf5f410f10eb8";
     char keyPtr[kCCKeySizeAES256+1];
     bzero( keyPtr, sizeof(keyPtr) );

     [key getCString: keyPtr maxLength: sizeof(keyPtr) encoding:NSUTF8StringEncoding];
     size_t numBytesEncrypted = 0;

     NSData *msg = [encryptvalue dataUsingEncoding:NSUTF8StringEncoding];
     size_t bufferSize = msg.length + kCCKeySizeAES256;
     void *buffer = malloc(bufferSize);
     const unsigned char iv[] = {0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00};

     CCCryptorStatus result = CCCrypt( kCCEncrypt,
                                      kCCAlgorithmAES128,
                                      kCCOptionPKCS7Padding,
                                      keyPtr,
                                      kCCKeySizeAES256,
                                      iv,
                                      msg.bytes, msg.length,
                                      buffer, bufferSize,
                                      &numBytesEncrypted );

     if( result == kCCSuccess ){
         //        return [NSData dataWithBytesNoCopy:buffer length:numBytesEncrypted];
         NSData *myData = [NSData dataWithBytesNoCopy:buffer length:numBytesEncrypted];
         NSString *base64Encoded = [myData base64EncodedStringWithOptions:NSDataBase64Encoding64CharacterLineLength];

       NSMutableString *output = [NSMutableString string];
          const unsigned char *source = (const unsigned char *)[base64Encoded UTF8String];
          int sourceLen = strlen((const char *)source);
          for (int i = 0; i < sourceLen; ++i) {
              const unsigned char thisChar = source[i];
              if (thisChar == ' '){
                  [output appendString:@"+"];
              } else if (thisChar == '.' || thisChar == '-' || thisChar == '_' || thisChar == '~' ||
                         (thisChar >= 'a' && thisChar <= 'z') ||
                         (thisChar >= 'A' && thisChar <= 'Z') ||
                         (thisChar >= '0' && thisChar <= '9')) {
                  [output appendFormat:@"%c", thisChar];
              } else {
                  [output appendFormat:@"%%%02X", thisChar];
              }
          }
       callback(@[[NSNull null], base64Encoded]);
     }
     else {
         NSLog(@"Failed AES");
       callback(@[[NSNull null], @""]);
     }
}

RCT_EXPORT_METHOD(decrypt: (NSString *)dataToDecrypt :(RCTResponseSenderBlock)callback)
{
    if (!dataToDecrypt) {
          NSLog(@"the data to decrypt is nil");
      }

      if ([dataToDecrypt isEqualToString:@""]) {
          NSLog(@"the data to decrypt is blank");
      }

      NSString* key = @"00f74597de203655b1ebf5f410f10eb8";

      char keyPtr[kCCKeySizeAES256+1];
      bzero( keyPtr, sizeof(keyPtr) );

      [key getCString: keyPtr maxLength: sizeof(keyPtr) encoding:NSUTF8StringEncoding];
      size_t numBytesEncrypted = 0;





      NSData *msg = [[NSData alloc] initWithBase64EncodedString:dataToDecrypt options:0];

      size_t bufferSize = msg.length + kCCKeySizeAES256;
      void *buffer = malloc(bufferSize);
      const unsigned char iv[] = {0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00};

      CCCryptorStatus result = CCCrypt( kCCDecrypt,
                                       kCCAlgorithmAES128,
                                       kCCOptionPKCS7Padding,
                                       keyPtr,
                                       kCCKeySizeAES256,
                                       iv,
                                       msg.bytes, msg.length,
                                       buffer, bufferSize,
                                       &numBytesEncrypted );

      if( result == kCCSuccess ){

          NSData *myData = [NSData dataWithBytesNoCopy:buffer length:numBytesEncrypted];
          NSString *decodedString = [[NSString alloc] initWithData:myData encoding:NSUTF8StringEncoding];
        callback(@[[NSNull null], decodedString]);

      }
      else {
          NSLog(@"Failed AES");
        callback(@[[NSNull null], @""]);

      }



}

RCT_EXPORT_METHOD(md5: (NSString *)input :(RCTResponseSenderBlock)callback)
{
  const char *cStr = [input UTF8String];
     unsigned char result[16];
     CC_MD5( cStr, strlen(cStr), result);
     NSString *output = [NSString stringWithFormat:
             @"%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x",
             result[0], result[1], result[2], result[3],
             result[4], result[5], result[6], result[7],
             result[8], result[9], result[10], result[11],
             result[12], result[13], result[14], result[15]];
  callback(@[[NSNull null], output]);

}

@end
