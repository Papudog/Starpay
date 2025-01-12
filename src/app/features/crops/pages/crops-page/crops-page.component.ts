import { Component, EffectRef, ElementRef, OnDestroy, OnInit, Signal, WritableSignal, computed, effect, inject, signal, viewChild } from "@angular/core";
import { CropsService } from "../../services/crops.service";
import { Crop, CropModel } from "../../../../core/models/crops.interface";
import { CropListComponent } from "../../components/crop-list/crop-list.component";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { CropDialogComponent } from "../../components/crop-dialog/crop-dialog.component";
import { Subscription } from "rxjs";
import { RoutingService } from "../../../../core/services/routing.service";

@Component({
  selector: "star-crops-page",
  imports: [CropListComponent, CropDialogComponent],
  templateUrl: "./crops-page.component.html",
  styleUrl: "./crops-page.component.css",
  providers: [CropsService],
})
export class CropsPageComponent implements OnInit, OnDestroy {
  // Injections
  private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private _cropsService: CropsService = inject(CropsService);
  private _routingService: RoutingService = inject(RoutingService);

  // Subscriptions
  private _subscriptions: Subscription = new Subscription();

  // Writable signals
  private _cropDialog = viewChild<ElementRef<HTMLDialogElement>>("cropDialog");
  protected selectedCrop: WritableSignal<Crop> = this._cropsService.selectedCrop;
  protected isSelectedCrop: WritableSignal<boolean> = signal<boolean>(false);

  // Computed signals
  protected readonly crops: Signal<Crop[]> = computed(() => this._cropsService.crops.value() ?? []);


  constructor() {
    effect((): void => {
      const dialogRef = this._cropDialog();
      if (dialogRef) this._cropsService.dialogRef.set(dialogRef);
    })
  }

  private _selectedCropEffect: EffectRef =
    effect((): void => {
      if (!this._isEmptyCrop(this.selectedCrop())) {
        this.isSelectedCrop.set(true);
        const dialogRef = this._cropDialog()

        if (dialogRef) {
          dialogRef.nativeElement.showModal();
          dialogRef.nativeElement.addEventListener("close", this._resetCrop, { once: true });
        }
      } else this.isSelectedCrop.set(false);
    });

  private _isEmptyCrop(crop: Crop): boolean {
    return Object.values(crop).every(value =>
      value === null || value === "" || value === 0
    );
  }

  private _resetCrop = (): void => { this.selectedCrop.set(CropModel.empty()) };

  ngOnInit(): void {
    this._subscriptions.add(
      this._activatedRoute.paramMap.subscribe((params: ParamMap): void => {
        const seasonParam = params.get("season");
        if (seasonParam) {
          this._cropsService.seasonParam.set(seasonParam);
          this._routingService.params = seasonParam;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this._selectedCropEffect.destroy();
    this._subscriptions.unsubscribe();

    const cropDialog = this._cropDialog();

    if (cropDialog) cropDialog.nativeElement.removeEventListener("close", this._resetCrop);
  }
}
