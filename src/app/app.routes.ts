import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "home",
    loadChildren: () =>
      import("./features/home/home.routes").then((m) => m.routes),
  },
  {
    path: "crops",
    loadChildren: () =>
      import("./features/crops/crops.routes").then((m) => m.routes),
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
];
