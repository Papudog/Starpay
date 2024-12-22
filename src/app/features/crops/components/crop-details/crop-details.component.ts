import { Component, input, InputSignal, OnInit } from "@angular/core";
import { Crop } from "../../../../core/models/crops.interface";

@Component({
  selector: "star-crop-details",
  imports: [],
  templateUrl: "./crop-details.component.html",
  styleUrl: "./crop-details.component.css",
})
export class CropDetailsComponent implements OnInit {
  public crop: InputSignal<Crop> = input.required<Crop>();

  constructor() {}

  ngOnInit(): void {}
}
