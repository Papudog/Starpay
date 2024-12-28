import { Component, ElementRef, inject, input, InputSignal, OnDestroy, OnInit, signal, viewChild, WritableSignal } from "@angular/core";
import { Crop } from "../../../../core/models/crops.interface";
import { CardComponent } from "../../../../shared/components/card/card.component";
import { CropDetailsComponent } from "../crop-details/crop-details.component";
import { CropIncomingComponent } from "../crop-incoming/crop-incoming.component";
import { CropsService } from "../../services/crops.service";

@Component({
  selector: "star-crop-dialog",
  imports: [CardComponent, CropDetailsComponent, CropIncomingComponent],
  templateUrl: "./crop-dialog.component.html",
  styleUrl: "./crop-dialog.component.css",
})
export class CropDialogComponent implements OnInit {
  private _cropsService: CropsService = inject(CropsService);

  public crop: InputSignal<Crop> = input.required<Crop>();

  protected refLocation: WritableSignal<boolean> = signal<boolean>(true);
  protected sliderRef = viewChild.required<ElementRef<HTMLDivElement>>("sliderContainer");

  constructor() { }

  ngOnInit(): void { }

  protected closeDialog = () => {
    const cropDialog: HTMLDialogElement = this._cropsService.dialogRef().nativeElement as HTMLDialogElement;
    cropDialog.close();
  }

  protected nextSlide = (): void => {
    const sliderWidth: number = this.sliderRef().nativeElement.offsetWidth as number;
    const sliderRef: HTMLElement = this.sliderRef().nativeElement as HTMLElement;

    if (this.refLocation()) {
      sliderRef.scrollLeft += sliderWidth;
      this.refLocation.set(false);
    } else {
      sliderRef.scrollLeft -= sliderWidth;
      this.refLocation.set(true);
    }
  };
}
