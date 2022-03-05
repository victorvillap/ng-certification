import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreManagementService {
  private readonly zipCodesKey = 'zipCodes';

  private zipCodes: string[] = [];

  saveZipCode(zipCode: string): void {
    const zipCodes = this.loadZipCodes();
    if (!zipCodes.includes(zipCode)) {
      this.zipCodes.push(zipCode)
      localStorage.setItem(this.zipCodesKey, JSON.stringify(zipCodes))
    }
  }

  loadZipCodes(): string[] {
    if (this.zipCodes.length === 0) {
      this.zipCodes = this.parseZipCodesFromLocalStorage();
    }

    return this.zipCodes;
  }

  private parseZipCodesFromLocalStorage(): string[] {
    const storedZipCodes = localStorage.getItem(this.zipCodesKey);
    if (!storedZipCodes) {
      return [];
    }

    return JSON.parse(storedZipCodes);
  }

}
