import {
  Component,
  ElementRef,
  input,
  InputSignal,
  OnDestroy,
  OnInit,
  viewChild,
} from "@angular/core";
import { Crop } from "../../../../core/models/crops.interface";
import { CardComponent } from "../../../../shared/components/card/card.component";
import { CropDetailsComponent } from "../crop-details/crop-details.component";
import { CropIncomingComponent } from "../crop-incoming/crop-incoming.component";

@Component({
  selector: "star-crop-dialog",
  imports: [CardComponent, CropDetailsComponent, CropIncomingComponent],
  templateUrl: "./crop-dialog.component.html",
  styleUrl: "./crop-dialog.component.css",
})
export class CropDialogComponent implements OnInit, OnDestroy {
  public crop: InputSignal<Crop> = input.required<Crop>();

  protected sliderRef =
    viewChild<ElementRef<HTMLDivElement>>("sliderContainer");

  constructor() {}

  ngOnDestroy(): void {
    console.log("CropDialogComponent destroyed");
  }

  ngOnInit(): void {
    console.log("CropDialogComponent initialized");
  }

  protected nextSlide = (): void => {
    const sliderWidth: number = this.sliderRef()?.nativeElement
      .offsetWidth as number;
    const sliderRef: HTMLElement = this.sliderRef()
      ?.nativeElement as HTMLElement;
    sliderRef.scrollLeft += sliderWidth;
  };
}
