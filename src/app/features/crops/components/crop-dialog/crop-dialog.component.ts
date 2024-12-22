import { Component, input, InputSignal } from "@angular/core";
import { Crop } from "../../../../core/models/crops.interface";
import { CardComponent } from "../../../../shared/components/card/card.component";
import { CropDetailsComponent } from "../crop-details/crop-details.component";

@Component({
  selector: "star-crop-dialog",
  imports: [CardComponent, CropDetailsComponent],
  templateUrl: "./crop-dialog.component.html",
  styleUrl: "./crop-dialog.component.css",
})
export class CropDialogComponent {
  public crop: InputSignal<Crop> = input.required<Crop>();
}
