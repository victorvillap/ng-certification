import { Component, OnDestroy, OnInit } from '@angular/core';
import { FrontViewService } from 'app/weather-forecast/services/front-view.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-front-view',
  templateUrl: './front-view.component.html',
  styleUrls: ['./front-view.component.css']
})
export class FrontViewComponent implements OnInit, OnDestroy {

  storedZipCodes: string[] = [];
  private zipCodesSubscription!: Subscription;

  constructor(private viewService: FrontViewService) { }

  ngOnInit(): void {
    this.viewService.initView();
    this.zipCodesSubscription = this.viewService.storedZipCodes.subscribe(zipCodes => this.storedZipCodes = zipCodes);
  }

  ngOnDestroy(): void {
    this.zipCodesSubscription?.unsubscribe();
  }

  addLocation(zipCode: string) {
    this.viewService.addZipCode(zipCode);
  }

}
