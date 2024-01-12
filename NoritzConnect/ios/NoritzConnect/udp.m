//
//  udp.m
//  demoSocket
//
//  Created by User on 9/29/20.
//

#import "udp.h"
#import <React/RCTLog.h>
#import <CommonCrypto/CommonCryptor.h>
#import <CommonCrypto/CommonDigest.h>
#import "GCDAsyncUdpSocket.h"
#import "GCDAsyncSocket.h"


@implementation udp



RCT_EXPORT_MODULE();

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"socketResponse"];
}

RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSString *)location)
{
  RCTLogInfo(@"Pretending to create an event %@ at %@", name, location);
}

RCT_EXPORT_METHOD(findEvents:(RCTResponseSenderBlock)callback)
{
  NSString *events =  @"Success";
  callback(@[[NSNull null], events]);
}



RCT_EXPORT_METHOD(sendudpcommandNew:(NSString *)commandForFire)
{

  GCDAsyncUdpSocket *udpSocket;

   udpSocket = [[GCDAsyncUdpSocket alloc] initWithDelegate:self delegateQueue:dispatch_get_main_queue()];

      NSError *error = nil;
      if (![udpSocket bindToPort:0 error:&error])
      {
          //   [self logError:FORMAT(@"Error binding: %@", error)];
          return;
      }
      if (![udpSocket beginReceiving:&error])
      {
          // [self logError:FORMAT(@"Error receiving: %@", error)];
          return;
      }

      [self logInfo:@"Ready"];

      [udpSocket enableBroadcast:YES error:nil];



   NSLog(@"command for fire is ---- %@",commandForFire);

     NSMutableData *data3 = [NSMutableData data];
     for (int i=0; i<commandForFire.length/2; i += 1) {
         NSString *sub=[commandForFire substringWithRange:NSMakeRange(i*2, 2)];
         NSScanner *scanner = [NSScanner scannerWithString:sub];

         while (![scanner isAtEnd]) {
             unsigned value;
             if ([scanner scanHexInt:&value]) {

                 NSLog(@"sixe-- %lu",sizeof(value));
                 [data3 appendBytes:&value length:1];

                 //                [data3 appendBytes:&value length:sizeof(value)];
             } else {
                 NSLog(@"Invalid value in scanned string");
             }
         }

     }

     [udpSocket sendData:data3 toHost:@"192.168.0.1" port: 50000 withTimeout:5 tag:1];




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



RCT_EXPORT_METHOD(sendudpcommand: (NSString *)commandForFire :(RCTResponseSenderBlock)callback)
{

  GCDAsyncUdpSocket *udpSocket;

  udpSocket = [[GCDAsyncUdpSocket alloc] initWithDelegate:self delegateQueue:dispatch_get_main_queue()];

     NSError *error = nil;
     if (![udpSocket bindToPort:0 error:&error])
     {
         //   [self logError:FORMAT(@"Error binding: %@", error)];
         return;
     }
     if (![udpSocket beginReceiving:&error])
     {
         // [self logError:FORMAT(@"Error receiving: %@", error)];
         return;
     }

     [self logInfo:@"Ready"];

     [udpSocket enableBroadcast:YES error:nil];



  NSLog(@"command for fire is ---- %@",commandForFire);

    NSMutableData *data3 = [NSMutableData data];
    for (int i=0; i<commandForFire.length/2; i += 1) {
        NSString *sub=[commandForFire substringWithRange:NSMakeRange(i*2, 2)];
        NSScanner *scanner = [NSScanner scannerWithString:sub];

        while (![scanner isAtEnd]) {
            unsigned value;
            if ([scanner scanHexInt:&value]) {

                NSLog(@"sixe-- %lu",sizeof(value));
                [data3 appendBytes:&value length:1];

                //                [data3 appendBytes:&value length:sizeof(value)];
            } else {
                NSLog(@"Invalid value in scanned string");
            }
        }

    }

    [udpSocket sendData:data3 toHost:@"192.168.0.1" port: 50000 withTimeout:5 tag:1];



  callback(@[[NSNull null], @"Sent request"]);



}

-(void)setupSocket
{

}


- (void)logError:(NSString *)msg
{
    NSLog(@"%@", msg);
}

- (void)logInfo:(NSString *)msg
{
    NSLog(@"%@", msg);



}

- (void)logMessage:(NSString *)msg
{
    NSLog(@"%@", msg);

}


- (void)udpSocket:(GCDAsyncUdpSocket *)sock didSendDataWithTag:(long)tag
{
    // You could add checks here

    NSLog(@"didSendDataWithTag");

}

- (void)udpSocket:(GCDAsyncUdpSocket *)sock didNotSendDataWithTag:(long)tag dueToError:(NSError *)error
{
    // You could add checks here
    NSLog(@"didNotSendDataWithTag");
  [self sendEventWithName:@"socketResponse" body:@{@"name": @"error"}];

}

- (void)udpSocket:(GCDAsyncUdpSocket *)sock didReceiveData:(NSData *)data
      fromAddress:(NSData *)address
withFilterContext:(id)filterContext
{

    char buffer[data.length];
    NSMutableString* response = [[NSMutableString alloc] init];
                      // Print them out
    [data getBytes:buffer length:data.length];
    for (int i = 0; i < data.length; i += 1) {
        printf("0x%02x ",(unsigned char)buffer[i]);
        [response appendFormat: @"%02x", (unsigned char)buffer[i]];
    }

    NSLog(@"Getting response ----- %@",response);
  [self sendEventWithName:@"socketResponse" body:@{@"name": response }];


}



@end
