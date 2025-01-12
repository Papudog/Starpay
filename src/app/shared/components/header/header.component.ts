import { Component, computed, effect, EffectRef, inject, signal, Signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { RoutingService } from '../../../core/services/routing.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'star-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private readonly _routingService: RoutingService = inject(RoutingService);
  private readonly _parentUrl: Signal<string> = this._routingService.parentUrl;

  protected readonly title: Signal<string> = computed(() =>
    this._routingService.params()
      .split("")
      .map((value: string, index: number): string =>
        index === 0 ? value.toUpperCase() : value
      )
      .join("")
  );
  public readonly isHome: Signal<boolean> = computed(() => this._parentUrl() === 'home');


  constructor() { }
}
