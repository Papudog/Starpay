import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { CardComponent } from "../../../../shared/components/card/card.component";
import { CommonModule } from "@angular/common";

const seasons = [
  {
    season: "Spring",
    imageSrc: "/png/Strawberry.png",
    imageAlt: "Strawberry",
    href: "/crops/?season=spring",
  },
  {
    season: "Summer",
    imageSrc: "/png/Starfruit.png",
    imageAlt: "Starfruit",
    href: "/crops/?season=summer",
  },
  {
    season: "Fall",
    imageSrc: "/png/Pumpkin.png",
    imageAlt: "Pumpkin",
    href: "/crops/?season=fall",
  },
  {
    season: "Winter",
    imageSrc: "/png/Powdermelon.png",
    imageAlt: "Powdermelon",
    href: "/crops/?season=winter",
  },
];

@Component({
  selector: "star-home-page",
  imports: [CommonModule, RouterLink, RouterLinkActive, CardComponent],
  templateUrl: "./home-page.component.html",
  styleUrl: "./home-page.component.css",
})
export class HomePageComponent {
  protected seasons = seasons;

  constructor() {}
}
