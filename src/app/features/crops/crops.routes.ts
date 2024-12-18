import { Routes } from "@angular/router";
import { CropsPageComponent } from "./pages/crops-page/crops-page.component";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./pages/crops-page/crops-page.component").then(
        (m) => m.CropsPageComponent,
      ),
  },
  {
    path: "**",
    redirectTo: "",
    pathMatch: "full",
  },
];
