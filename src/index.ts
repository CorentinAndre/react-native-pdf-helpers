// Import the native module. On web, it will be resolved to ReactNativePdfHelpers.web.ts
// and on native platforms to ReactNativePdfHelpers.ts
import ReactNativePdfHelpersModule from "./ReactNativePdfHelpersModule";

export async function getPageCount(filePath: string): Promise<number> {
  return await ReactNativePdfHelpersModule.getPageCount(filePath);
}

export type ThumbnailResult = {
  uri: string;
  width: number;
  height: number;
};

export async function generateThumbnail(
  filePath: string,
  page: number,
  quality?: number
): Promise<ThumbnailResult> {
  return await ReactNativePdfHelpersModule.getPageCount(
    filePath,
    page,
    quality
  );
}
