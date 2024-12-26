import { Component, ElementRef, input, InputSignal, OnDestroy, OnInit, signal, viewChild, WritableSignal } from "@angular/core";
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

  protected sliderRef = viewChild<ElementRef<HTMLDivElement>>("sliderContainer");

  protected refLocation: WritableSignal<boolean> = signal<boolean>(true);

  constructor() { }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.nextSlide();
  }

  protected nextSlide = (): void => {
    const sliderWidth: number = this.sliderRef()?.nativeElement.offsetWidth as number;
    const sliderRef: HTMLElement = this.sliderRef()?.nativeElement as HTMLElement;
    if (this.refLocation()) {
      sliderRef.scrollLeft += sliderWidth;
      this.refLocation.set(false);
    } else {
      sliderRef.scrollLeft -= sliderWidth;
      this.refLocation.set(true);
    }
  };
}
