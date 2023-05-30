export default {
  async getPageCount(filePath: string): Promise<number> {
    return 2;
  },
  async generateThumbnail(filePath: string, page: number, quality: number): Promise<{
    uri: string;
    width: number;
    height: number;
  }> {
    return {
      height: 100,
      width: 100,
      uri: "uri",
    };
  },
};
