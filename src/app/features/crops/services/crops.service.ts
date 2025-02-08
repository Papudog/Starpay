import { ElementRef, inject, Injectable, ResourceRef, signal, WritableSignal } from "@angular/core";
import { map } from "rxjs";
import { Crop, CropModel } from "../../../core/models/crops.interface";
import { HttpClient } from "@angular/common/http";
import { rxResource } from "@angular/core/rxjs-interop";

type CropRecord = Record<string, Crop[]>;
type DialogRef = ElementRef<HTMLDialogElement> | null;

@Injectable()
export class CropsService {
  // Injections
  private _httpClient: HttpClient = inject(HttpClient);

  // Writable signals
  public seasonParam: WritableSignal<string> = signal<string>('');
  public selectedCrop: WritableSignal<Crop> = signal<Crop>(CropModel.empty());
  public dialogRef: WritableSignal<DialogRef> = signal<DialogRef>(null);

  constructor() { }

  // Resource
  public crops: ResourceRef<Crop[] | undefined> =
    rxResource<Crop[], { seasonParam: string }>({
      request: () => ({
        seasonParam: this.seasonParam(),
      }),
      loader: ({ request }) => this._httpClient
        .get<CropRecord>(`/assets/data/crops.json`)
        .pipe(map((crops): Crop[] => crops[request.seasonParam] ?? [])),
    })
}
