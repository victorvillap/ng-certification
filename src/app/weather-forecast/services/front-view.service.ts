import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, zip } from 'rxjs';
import { StoreManagementService } from './store-management.service';

@Injectable({
  providedIn: 'root'
})
export class FrontViewService {

  private storedZipCodes$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  storedZipCodes: Observable<string[]> = this.storedZipCodes$.asObservable();
  constructor(private storageService: StoreManagementService) { }

  initView(): void {
    this.updateSavedZipCodes();
  }

  addZipCode(zipCode: string): void {
    this.storageService.saveZipCode(zipCode);
    this.updateSavedZipCodes();
  }

  private updateSavedZipCodes(): void {
    this.storedZipCodes$.next(this.storageService.getStoredZipCodes());
  }
}
