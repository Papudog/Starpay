import { effect, EffectRef, inject, Injectable, OnDestroy, OnInit, signal, WritableSignal } from "@angular/core";
import { map } from "rxjs";
import { Crop } from "../../../core/models/crops.interface";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CropsService implements OnInit, OnDestroy {
  private _httpClient: HttpClient = inject(HttpClient);

  public seasonParam: WritableSignal<string | null> = signal<string | null>(null);
  public crops: WritableSignal<Crop[]> = signal<Crop[]>([]);
  public selectedCrop: WritableSignal<Crop> = signal<Crop>({} as Crop);

  constructor() { }

  private _fetchCropsEffect: EffectRef = effect((): void => {
    const season: string | null = this.seasonParam();

    if (season !== null)
      this._httpClient
        .get<Record<string, Crop[]>>(`/assets/data/crops.json`)
        .pipe(map((crops): Crop[] => crops[season]))
        .subscribe({
          next: (crops): void => {
            this.crops.set(crops);
          },
        });
  });

  ngOnInit(): void { }
  ngOnDestroy(): void {
    this._fetchCropsEffect.destroy();
  }
}
