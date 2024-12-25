import { Component } from "@angular/core";
import { CardComponent } from "../../../../shared/components/card/card.component";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

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
  protected seasons = seasons;

  constructor() { }
}
