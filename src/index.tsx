import { NativeModules, Platform } from 'react-native';

export type ThumbnailResult = {
  uri: string;
  width: number;
  height: number;
};

type NativeType = {
  generateThumbnail(
    filePath: string,
    page: number,
    quality?: number
  ): Promise<ThumbnailResult>;
  getPageCount(filePath: string): Promise<number>;
};

const LINKING_ERROR =
  `The package 'react-native-pdf-thumbnail' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const PdfHelpersNativeModule: NativeType = NativeModules.PdfHelpers
  ? NativeModules.PdfHelpers
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

const DEFAULT_QUALITY = 80;

const sanitizeQuality = (quality?: number): number => {
  if (quality === undefined) {
    quality = DEFAULT_QUALITY;
  }
  return Math.min(Math.max(quality, 0), 100);
};

export function generateThumbnail(
  filePath: string,
  page: number,
  quality?: number
): Promise<ThumbnailResult> {
  return PdfHelpersNativeModule.generateThumbnail(
    filePath,
    page,
    sanitizeQuality(quality)
  );
}

export function getPageCount(filePath: string): Promise<number> {
  return PdfHelpersNativeModule.getPageCount(filePath);
}
