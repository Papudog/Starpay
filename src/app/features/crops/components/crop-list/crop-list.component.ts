import { CommonModule } from "@angular/common";
import {
  Component,
  input,
  InputSignal,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { Crop } from "../../../../core/models/crops.interface";
import { CardComponent } from "../../../../shared/components/card/card.component";

@Component({
  selector: "star-crop-list",
  imports: [CommonModule, CardComponent],
  templateUrl: "./crop-list.component.html",
  styleUrl: "./crop-list.component.css",
})
export class CropListComponent implements OnInit, OnChanges {
  public title: InputSignal<string> = input.required<string>();
  public crops: InputSignal<Crop[]> = input.required<Crop[]>();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["crops"]) {
      console.log("Crops changed", this.crops());
    }
  }

  ngOnInit(): void {}
}
