/**
 * 設定類別為REST API之BASE URL
 * @param url 網址
 */
export function ApiBase(url: string) {
    return function<T extends {new(): {}}>(target: T) { // 輸入類別
      target.prototype.baseUrl = url;
      return target;
    };
}
