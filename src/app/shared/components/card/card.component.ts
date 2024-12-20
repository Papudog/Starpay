import { Component, input, InputSignal } from "@angular/core";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";

type StringOrUndefined = string | undefined;

@Component({
  selector: "star-card",
  imports: [],
  templateUrl: "./card.component.html",
  styleUrl: "./card.component.css",
})
export class CardComponent {
  public title: InputSignal<string> = input.required<string>();
  public imageSrc: InputSignal<string> = input.required<string>();
  public param: InputSignal<StringOrUndefined> = input<string>();

  constructor(private _router: Router) {}

  protected navigateTo = (): void => {
    if (this.param()) {
      this._router.navigate(["crops", this.param()]);
    }
  };
}
