import {
  Component,
  OnChanges,
  OnInit,
  Signal,
  WritableSignal,
  computed,
  inject,
  signal,
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
export class CropsPageComponent implements OnInit {
  private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private _cropsService: CropsService = inject(CropsService);

  private _title: WritableSignal<string> = signal<string>("");
  protected readonly title: Signal<string> = computed((): string =>
    this._title()
      .split("")
      .map((value: string, index: number): string =>
        index === 0 ? value.toUpperCase() : value,
      )
      .join(""),
  );
  protected crops: WritableSignal<Crop[]> = this._cropsService.crops();

  constructor() {}
  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params: ParamMap): void => {
      const seasonParam: string | null = params.get("season");
      if (seasonParam) {
        this._cropsService.seasonParam = seasonParam;
        this._title.set(seasonParam);
      }
    });
  }
}
