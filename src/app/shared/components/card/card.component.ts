import {
  Component,
  input,
  InputSignal,
  output,
  Output,
  OutputEmitterRef,
} from "@angular/core";
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

  public titleEmitter: OutputEmitterRef<string> = output<string>();

  constructor(private _router: Router) {}

  protected navigateTo = (): void => {
    if (this.param()) {
      this._router.navigate(["crops", this.param()]);
    }
  };

  protected onClickEvent = (): void => this.titleEmitter.emit(this.title());
}
