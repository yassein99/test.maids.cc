import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CachingService {
  private cache: { [key: string]: any } = {};

  constructor() {}

  getCache(key: string): any {
    return this.cache[key] || null;
  }

  setCache(key: string, data: any): void {
    this.cache[key] = data;
  }

  clearCache(key: string): void {
    delete this.cache[key];
  }

  hasCache(key: string): boolean {
    return this.cache.hasOwnProperty(key);
  }
}
