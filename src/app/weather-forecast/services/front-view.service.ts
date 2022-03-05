import { Injectable } from '@angular/core';
import { zip } from 'rxjs';
import { StoreManagementService } from './store-management.service';

@Injectable({
  providedIn: 'root'
})
export class FrontViewService {

  constructor(private storageService: StoreManagementService) { }

  addZipCode(zipCode: string): void {
    this.storageService.saveZipCode(zipCode);
  }
}
