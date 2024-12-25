import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "home",
    loadChildren: () =>
      import("./features/home/home.routes").then((r) => r.routes),
  },
  {
    path: "crops",
    loadChildren: () =>
      import("./features/crops/crops.routes").then((r) => r.routes),
  },
  {
    path: "about",
    loadChildren: () =>
      import("./features/about/about.routes").then((r) => r.routes),
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
];
