import { AfterViewInit, Component, ElementRef, inject, input, InputSignal, viewChild } from "@angular/core";
import { Crop } from "../../../../core/models/crops.interface";
import { CardComponent } from "../../../../shared/components/card/card.component";
import { CropDetailsComponent } from "../crop-details/crop-details.component";
import { CropIncomingComponent } from "../crop-incoming/crop-incoming.component";
import { CropsService } from "../../services/crops.service";
import { NgIf } from "@angular/common";

interface SliderProps {
  sliderWidth: number;
  sliderRef: HTMLElement;
}

@Component({
  selector: "star-crop-dialog",
  imports: [CardComponent, CropDetailsComponent, CropIncomingComponent, NgIf],
  templateUrl: "./crop-dialog.component.html",
  styleUrl: "./crop-dialog.component.css",
})
export class CropDialogComponent implements AfterViewInit {
  private _cropsService: CropsService = inject(CropsService);

  public crop: InputSignal<Crop> = input.required<Crop>();

  protected showIncoming = false;
  protected sliderRef = viewChild.required<ElementRef<HTMLDivElement>>("sliderContainer");

  constructor() { }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.sliderRef().nativeElement.scrollTo({ left: 0, behavior: "instant" });
    });
  }

  protected closeDialog = (): void => this._cropsService.dialogRef().nativeElement.close();

  protected sliderProps = (): SliderProps => {
    const sliderWidth: number = this.sliderRef().nativeElement.offsetWidth as number;
    const sliderRef: HTMLElement = this.sliderRef().nativeElement as HTMLElement;

    return { sliderWidth, sliderRef };
  }

  protected nextSlide = (): void => {
    const { sliderWidth, sliderRef } = this.sliderProps();
    sliderRef.scrollLeft += sliderWidth;

    if (!this.showIncoming) this.showIncoming = !this.showIncoming;
  };

  protected previousSlide = (): void => {
    const { sliderWidth, sliderRef } = this.sliderProps();
    sliderRef.scrollLeft -= sliderWidth;
  }
}
