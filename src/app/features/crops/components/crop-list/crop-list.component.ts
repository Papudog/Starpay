import { CommonModule } from "@angular/common";
import { Component, input, InputSignal, OnInit, inject } from "@angular/core";
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

  public title: InputSignal<string> = input.required<string>();
  public crops: InputSignal<Crop[]> = input.required<Crop[]>();

  constructor() {}

  protected onSelectedCrop = (title: string): void => {
    const crop: Crop | undefined = this.crops().find(
      (crop: Crop): boolean => crop.name === title,
    );
    if (crop) this._cropService.selectedCrop.set(crop);
  };

  ngOnInit(): void {}
}
