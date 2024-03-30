import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserCacheService {
  private cache: { [key: number]: any } = {}; // Dictionary to store cached data

  constructor() {}

  // Get user data from cache if available, otherwise return null
  getUser(userId: number): any {
    return this.cache[userId] || null;
  }

  // Store user data in cache
  setUser(userId: number, userData: any): void {
    this.cache[userId] = userData;
  }
}
