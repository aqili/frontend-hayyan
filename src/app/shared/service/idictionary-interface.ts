export interface IDictionary<T> {
  add(key: string, value: T);
  containsKey(key: string): boolean;
  size(): number;
  getItem(key: string): T;
  getItems(): { [index: string]: T };
  removeItem(key: string): T;
  getKeys(): string[];
  values(): T[];
}

export default class Dictionary<T> implements IDictionary<T> {
  private items: { [index: string]: T } = {};
  private count: number = 0;

  add(key: string, value: T) {
    if (!this.items.hasOwnProperty(key)) {
      this.count++;
    }

    this.items[key] = value;
  }

  containsKey(key: string): boolean {
    return this.items.hasOwnProperty(key);
  }

  size(): number {
    return this.count;
  }

  getItem(key: string): T {
      return this.items[key];

  }
  getItems():any {
    return this.items;
  }
  removeItem(key: string): T {
    let value = this.items[key];

    delete this.items[key];
    this.count--;

    return value;
  }

  getKeys(): string[] {
    let keySet: string[] = [];

    for (let property in this.items) {
      if (this.items.hasOwnProperty(property)) {
        keySet.push(property);
      }
    }

    return keySet;
  }

  values(): T[] {
    let values: T[] = [];

    for (let property in this.items) {
      if (this.items.hasOwnProperty(property)) {
        values.push(this.items[property]);
      }
    }

    return values;
  }
  toLookup(): IDictionary<T> {
    return this;
}
}






