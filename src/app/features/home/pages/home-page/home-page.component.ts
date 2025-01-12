import { Component, inject } from "@angular/core";
import { CardComponent } from "../../../../shared/components/card/card.component";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";
import { RoutingService } from "../../../../core/services/routing.service";

const seasons = [
  {
    season: "Spring",
    imageSrc: "/assets/png/Strawberry.png",
    imageAlt: "Strawberry",
    param: "spring",
  },
  {
    season: "Summer",
    imageSrc: "/assets/png/Starfruit.png",
    imageAlt: "Starfruit",
    param: "summer",
  },
  {
    season: "Fall",
    imageSrc: "/assets/png/Pumpkin.png",
    imageAlt: "Pumpkin",
    param: "fall",
  },
];

@Component({
  selector: "star-home-page",
  imports: [CommonModule, CardComponent, RouterLink],
  templateUrl: "./home-page.component.html",
  styleUrl: "./home-page.component.css",
})
export class HomePageComponent {
  private readonly _routingService: RoutingService = inject(RoutingService);

  protected seasons = seasons;

  constructor() {
    this._routingService.params = "";
  }
}
