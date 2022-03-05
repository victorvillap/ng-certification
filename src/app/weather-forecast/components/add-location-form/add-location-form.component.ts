import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'add-location-form',
  templateUrl: './add-location-form.component.html',
  styleUrls: ['./add-location-form.component.css']
})
export class AddLocationFormComponent implements OnInit {

  private readonly zipCodePattern: string = '^[+ 0-9]{5}$';
  @Output() onLocationAdded: EventEmitter<string> = new EventEmitter<string>();

  locationForm: FormGroup = this.formBuilder.group({
    zip: ['', [Validators.required, Validators.pattern(this.zipCodePattern)]]
  });


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  saveLocation(): void {
    const zipValue: string = this.locationForm.get('zip')?.value;
    this.onLocationAdded.emit(zipValue);
  }

}
