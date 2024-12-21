import {
  Component,
  effect,
  EffectRef,
  input,
  InputSignal,
  OnInit,
  WritableSignal,
} from "@angular/core";
import { Crop } from "../../../../core/models/crops.interface";
import { CardComponent } from "../../../../shared/components/card/card.component";

@Component({
  selector: "star-crop-details",
  imports: [CardComponent],
  templateUrl: "./crop-details.component.html",
  styleUrl: "./crop-details.component.css",
})
export class CropDetailsComponent implements OnInit {
  public crop: InputSignal<Crop> = input.required<Crop>();

  constructor() {}

  ngOnInit(): void {}
}
