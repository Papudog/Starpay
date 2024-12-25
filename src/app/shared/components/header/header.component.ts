import { Component, effect, EffectRef, inject, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RoutingService } from '../../../core/services/routing.service';

@Component({
  selector: 'star-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private _routingService: RoutingService = inject(RoutingService);

  private readonly _parentUrl: Signal<string> = this._routingService.parentUrl;
  public isHome: boolean = false;

  constructor() { }

  private _parentUrlEffect: EffectRef = effect(
    (): boolean => this.isHome = this._parentUrl() === 'home'
  );
}
