import { Routes } from "@angular/router";
import { CropsPageComponent } from "./pages/crops-page/crops-page.component";

export const routes: Routes = [
  {
    path: ":season",
    component: CropsPageComponent,
  },
  {
    path: "**",
    redirectTo: "",
    pathMatch: "full",
  },
];
