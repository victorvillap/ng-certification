import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ApiError } from 'app/weather-forecast/interfaces/api-error.interface';
import { Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'zipcode-list-error',
  templateUrl: './zipcode-list-error.component.html',
  styleUrls: ['./zipcode-list-error.component.css']
})
export class ZipcodeListErrorComponent implements OnInit, OnDestroy {

  @Input('apiErrors') apiErrors$: Observable<ApiError[]> = of([]);

  zipCodesWithError: string[] = [];
  zipCodesSubscription!: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.zipCodesSubscription = this.apiErrors$
      .subscribe(errors => this.zipCodesWithError = errors.map(error => error.zipCode));
  }

  ngOnDestroy(): void {
    this.zipCodesSubscription?.unsubscribe();
  }



}
