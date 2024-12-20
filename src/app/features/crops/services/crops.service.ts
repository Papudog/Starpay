import {
  computed,
  effect,
  EffectRef,
  inject,
  Injectable,
  OnDestroy,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from "@angular/core";
import { map, Observable } from "rxjs";
import { Crop } from "../../../core/models/crops.interface";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CropsService implements OnInit, OnDestroy {
  private _httpClient: HttpClient = inject(HttpClient);

  private _crops: WritableSignal<Crop[]> = signal<Crop[]>([]);
  public readonly crops: Signal<WritableSignal<Crop[]>> = computed(
    () => this._crops,
  );

  private _seasonParam: WritableSignal<string | null> = signal<string | null>(
    null,
  );

  constructor() {}

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this._fetchCropsEffect.destroy();
  }

  set seasonParam(season: string) {
    this._seasonParam.set(season);
  }

  private _fetchCropsEffect: EffectRef = effect((): void => {
    const season: string | null = this._seasonParam();

    if (season !== null)
      this._httpClient
        .get<Record<string, Crop[]>>(`/assets/data/crops.json`)
        .pipe(map((crops): Crop[] => crops[season]))
        .subscribe({
          next: (crops): void => {
            this._crops.set(crops);
          },
        });
  });
}
