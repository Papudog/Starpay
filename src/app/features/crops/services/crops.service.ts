import { ElementRef, inject, Injectable, OnDestroy, OnInit, ResourceRef, Signal, signal, WritableSignal } from "@angular/core";
import { map } from "rxjs";
import { Crop } from "../../../core/models/crops.interface";
import { HttpClient } from "@angular/common/http";
import { rxResource } from "@angular/core/rxjs-interop";

type CropRecord = Record<string, Crop[]>;

@Injectable({
  providedIn: "root",
})
export class CropsService implements OnInit {
  private _httpClient: HttpClient = inject(HttpClient);

  public seasonParam: WritableSignal<string> = signal<string>('');
  public selectedCrop: WritableSignal<Crop> = signal<Crop>({} as Crop);

  public dialogRef: WritableSignal<ElementRef<HTMLDialogElement>> = signal({} as ElementRef<HTMLDialogElement>);

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
  ngOnInit(): void { }
}
