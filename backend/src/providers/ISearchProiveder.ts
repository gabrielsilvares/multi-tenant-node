export default interface ISearchProvider {
  search(collection: string, bucket: string, terms: string, options?: object): Promise<String[]>;
  suggest(collection: string, bucket: string, word: string, options?: object): Promise<String[]>;
  push(collection: string, bucket: string, object: string, text: string, options?: object): Promise<any>;
  pop(collection: string, bucket: string, object: string, text: string): Promise<Number>;
}