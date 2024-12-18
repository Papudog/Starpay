import { Component, input, InputSignal } from "@angular/core";
import {
  NavigationExtras,
  Router,
  RouterLink,
  RouterLinkActive,
} from "@angular/router";

type StringOrUndefined = string | undefined;

@Component({
  selector: "star-card",
  imports: [RouterLink, RouterLinkActive],
  templateUrl: "./card.component.html",
  styleUrl: "./card.component.css",
})
export class CardComponent {
  public title: InputSignal<string> = input.required<string>();
  public imageSrc: InputSignal<string> = input.required<string>();
  public href: InputSignal<StringOrUndefined> = input<string>();

  constructor(private _router: Router) {}

  protected navigateTo = (): void => {
    if (this.href()) {
      const navigationProps: NavigationExtras = {
        queryParams: { season: this.title().toLowerCase() },
      };

      this._router.navigate([this.href()], navigationProps);
    }
  };
}
