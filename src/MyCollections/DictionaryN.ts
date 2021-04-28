export interface IDictionaryN<T> {
  Add(key: number, value: T): void;
  ContainsKey(key: number): boolean;
  Count(): number;
  GetValue(key: number): T;
  Keys(): number[];
  Remove(key: number): T;
  Clear(): void;
  Values(): T[];
}

export class DictionaryN<T> implements IDictionaryN<T> {
  private items: { [index: string]: T } = {};

  private count: number = 0;

  public ContainsKey(key: number): boolean {
      return this.items.hasOwnProperty(key);
  }

  public Count(): number {
      return this.count;
  }

  public Add(key: number, value: T): T {
      if(!this.items.hasOwnProperty(key))
           this.count++;

      this.items[key] = value;
      return value;
  }

  public Remove(key: number): T {
      let val = this.items[key];
      delete this.items[key];
      this.count--;
      return val;
  }

  public Clear(): void {
    this.count = 0;
    this.items = {};
  }

  public GetValue(key: number): T {
      return this.items[key];
  }

  public Keys(): number[] {
      let keySet: number[] = [];

      for (let prop in this.items) {
          if (this.items.hasOwnProperty(prop)) {
              keySet.push(+prop);
          }
      }
      return keySet;
  }

  public Values(): T[] {
      let values: T[] = [];

      for (let prop in this.items) {
          if (this.items.hasOwnProperty(prop)) {
              values.push(this.items[prop]);
          }
      }
      return values;
  }
}