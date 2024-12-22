import {
  AfterViewInit,
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
export class CropDialogComponent {
  private _sliderRef = viewChild<ElementRef<HTMLDivElement>>("sliderRef");

  protected crop: InputSignal<Crop> = input.required<Crop>();

  constructor() {}

  protected onButtonScroll = (id: string): void => {
    const slideToScroll: HTMLElement = document.getElementById(
      id,
    ) as HTMLElement;

    if (slideToScroll && this._sliderRef()) {
      const offSet: number =
        slideToScroll.offsetLeft - this._sliderRef()!.nativeElement.offsetLeft;
      const sliderRef = this._sliderRef()!.nativeElement;

      sliderRef.scrollTo({
        left: offSet,
        behavior: "smooth",
      });
    }
  };
}
