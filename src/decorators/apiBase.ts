export function ApiBase(url: string) {
    return function<T extends {new(): {}}>(target: T) { // 輸入類別
      target.prototype.baseUrl = url;
      return target;
    };
}
