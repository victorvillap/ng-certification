import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForecastViewService } from 'app/weather-forecast/services/forecast-view.service';

@Component({
  selector: 'app-forecast-view',
  templateUrl: './forecast-view.component.html',
  styleUrls: ['./forecast-view.component.css']
})
export class ForecastViewComponent implements OnInit {

  constructor(private route: ActivatedRoute, public viewService: ForecastViewService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const zipCode = params['zipcode'];
      this.viewService.initView(zipCode);
    })
  }

}
