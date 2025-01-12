import { CommonModule } from "@angular/common";
import { Component, input, InputSignal, OnInit, inject, effect } from "@angular/core";
import { Crop } from "../../../../core/models/crops.interface";
import { CardComponent } from "../../../../shared/components/card/card.component";
import { CropsService } from "../../services/crops.service";

@Component({
  selector: "star-crop-list",
  imports: [CommonModule, CardComponent],
  templateUrl: "./crop-list.component.html",
  styleUrl: "./crop-list.component.css",
})
export class CropListComponent implements OnInit {
  private _cropService: CropsService = inject(CropsService);

  public crops: InputSignal<Crop[]> = input.required<Crop[]>();

  constructor() { }

  protected onSelectedCrop = (name: string): void => {
    const crop = this.crops().find((crop: Crop): boolean => crop.name === name);
    if (crop)
      this._cropService.selectedCrop.set(crop);
  };

  ngOnInit(): void { }


}
