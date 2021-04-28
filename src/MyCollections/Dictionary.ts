export interface IDictionary<T> {
  Add(key: string, value: T): void;
  ContainsKey(key: string): boolean;
  Count(): number;
  GetValue(key: string): T;
  Keys(): string[];
  Remove(key: string): T;
  Clear(): void;
  Values(): T[];
}

export class Dictionary<T> implements IDictionary<T> {
  private items: { [index: string]: T } = {};

  private count: number = 0;

  public ContainsKey(key: string): boolean {
      return this.items.hasOwnProperty(key);
  }

  public Count(): number {
      return this.count;
  }

  public Add(key: string, value: T): T {
      if(!this.items.hasOwnProperty(key))
           this.count++;

      this.items[key] = value;
      return value;
  }

  public Remove(key: string): T {
      let val = this.items[key];
      delete this.items[key];
      this.count--;
      return val;
  }

  public Clear(): void {
    this.count = 0;
    this.items = {};
  }

  public GetValue(key: string): T {
      return this.items[key];
  }

  public Keys(): string[] {
      let keySet: string[] = [];

      for (let prop in this.items) {
          if (this.items.hasOwnProperty(prop)) {
              keySet.push(prop);
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