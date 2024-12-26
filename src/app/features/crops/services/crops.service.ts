import { inject, Injectable, OnDestroy, OnInit, ResourceRef, signal, WritableSignal } from "@angular/core";
import { map } from "rxjs";
import { Crop } from "../../../core/models/crops.interface";
import { HttpClient } from "@angular/common/http";
import { rxResource } from "@angular/core/rxjs-interop";

type CropRecord = Record<string, Crop[]>;

@Injectable({
  providedIn: "root",
})
export class CropsService implements OnInit, OnDestroy {
  private _httpClient: HttpClient = inject(HttpClient);

  public seasonParam: WritableSignal<string> = signal<string>('');
  public selectedCrop: WritableSignal<Crop> = signal<Crop>({} as Crop);

  constructor() { }

  public crops: ResourceRef<Crop[]> =
    rxResource<Crop[], { seasonParam: string }>({
      request: () => ({
        seasonParam: this.seasonParam(),
      }),
      loader: ({ request }) => this._httpClient
        .get<CropRecord>(`/assets/data/crops.json`)
        .pipe(map((crops): Crop[] => crops[request.seasonParam] ?? [])),
    })

  // private _fetchCropsEffect: EffectRef = effect((): void => {
  //   const season: string | null = this.seasonParam();

  //   if (season !== null)
  //     this._httpClient
  //       .get<Record<string, Crop[]>>(`/assets/data/crops.json`)
  //       .pipe(map((crops): Crop[] => crops[season]))
  //       .subscribe({
  //         next: (crops): void => {
  //           this.crops.set(crops);
  //         },
  //       });
  // });

  ngOnInit(): void { }
  ngOnDestroy(): void {
    // this._fetchCropsEffect.destroy();
  }
}
