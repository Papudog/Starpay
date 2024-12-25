import { computed, inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  private _router: Router = inject(Router);

  private _url: WritableSignal<string> = signal<string>(this._router.url);

  public readonly parentUrl: Signal<string> =
    computed((): string => this._url()
      .split('/')
      .filter((value: string) => value !== '')[0]
    );

  constructor() {
    this._router.events.subscribe((events) => {
      if (events instanceof NavigationEnd) {
        this._url.set(events.urlAfterRedirects);
      }
    });
  }


}
