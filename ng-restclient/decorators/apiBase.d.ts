/**
 * 設定類別為REST API之BASE URL
 * @param url 網址
 */
export declare function ApiBase(url: string): <T extends new () => {}>(target: T) => T;
