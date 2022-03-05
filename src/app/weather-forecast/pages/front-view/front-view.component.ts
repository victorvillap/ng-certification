import { Component, OnInit } from '@angular/core';
import { FrontViewService } from 'app/weather-forecast/services/front-view.service';

@Component({
  selector: 'app-front-view',
  templateUrl: './front-view.component.html',
  styleUrls: ['./front-view.component.css']
})
export class FrontViewComponent implements OnInit {

  constructor(private viewService: FrontViewService) { }

  ngOnInit(): void {
  }

  addLocation(zipCode: string) {
    console.log('view service graba', zipCode);
    this.viewService.addZipCode(zipCode);
  }

}
