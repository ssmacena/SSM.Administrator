export class JsonHelper {
  static IsJsonString(str): boolean {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
}