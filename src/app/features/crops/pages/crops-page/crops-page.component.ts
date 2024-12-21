import {
  AfterViewInit,
  Component,
  EffectRef,
  ElementRef,
  OnDestroy,
  OnInit,
  Signal,
  WritableSignal,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from "@angular/core";
import { CropsService } from "../../services/crops.service";
import { Crop } from "../../../../core/models/crops.interface";
import { CropListComponent } from "../../components/crop-list/crop-list.component";
import { CropDetailsComponent } from "../../components/crop-details/crop-details.component";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: "star-crops-page",
  imports: [CommonModule, CropListComponent, CropDetailsComponent],
  templateUrl: "./crops-page.component.html",
  styleUrl: "./crops-page.component.css",
})
export class CropsPageComponent implements OnInit, OnDestroy, AfterViewInit {
  private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private _cropsService: CropsService = inject(CropsService);

  private _title: WritableSignal<string> = signal<string>("");
  private _cropDialog = viewChild<ElementRef<HTMLDialogElement>>("cropDialog");

  protected readonly title: Signal<string> = computed((): string =>
    this._title()
      .split("")
      .map((value: string, index: number): string =>
        index === 0 ? value.toUpperCase() : value,
      )
      .join(""),
  );
  protected crops: WritableSignal<Crop[]> = this._cropsService.crops;
  protected selectedCrop: WritableSignal<Crop> =
    this._cropsService.selectedCrop;

  constructor() {}

  private _selectedCropEffect: EffectRef = effect((): void => {
    if (Object.keys(this.selectedCrop()).length > 0 && this._cropDialog()) {
      this._cropDialog()?.nativeElement.showModal();
    }
  });

  private _resetCrop = (): void => this.selectedCrop.set({} as Crop);

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params: ParamMap): void => {
      const seasonParam: string | null = params.get("season");
      if (seasonParam) {
        this._cropsService.seasonParam.set(seasonParam);
        this._title.set(seasonParam);
      }
    });
  }

  ngAfterViewInit(): void {
    this._cropDialog()?.nativeElement.addEventListener(
      "close",
      this._resetCrop,
    );
  }

  ngOnDestroy(): void {
    this._selectedCropEffect.destroy();
    this._cropDialog()?.nativeElement.removeEventListener(
      "close",
      this._resetCrop,
    );
  }
}
