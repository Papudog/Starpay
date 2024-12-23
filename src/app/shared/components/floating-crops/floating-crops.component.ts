import { Component, OnInit } from "@angular/core";

@Component({
  selector: "star-floating-crops",
  imports: [],
  templateUrl: "./floating-crops.component.html",
  styleUrl: "./floating-crops.component.css",
})
export class FloatingCropsComponent implements OnInit {
  protected icons: string[] = [
    "/assets/png/Amaranth.png",
    "/assets/png/Artichoke.png",
    "/assets/png/Blue_Jazz.png",
    "/assets/png/Blueberry.png",
    "/assets/png/Cauliflower.png",
    "/assets/png/Cranberries.png",
    "/assets/png/Hops.png",
    "/assets/png/Melon.png",
    "/assets/png/Parsnip.png",
    "/assets/png/Potato.png",
    "/assets/png/Powdermelon.png",
    "/assets/png/Pumpkin.png",
    "/assets/png/Strawberry.png",
    "/assets/png/Starfruit.png",
    "/assets/png/Red_Cabbage.png",
  ];

  protected positions: { top: number; left: number }[] = [];

  private _generateRandomPosition = (): void => {
    this.positions = this.icons.map(() => ({
      top: Math.random() * 95,
      left: Math.random() * 95,
    }));
  };

  ngOnInit(): void {
    this._generateRandomPosition();
  }
}
