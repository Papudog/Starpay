import { Routes } from "@angular/router";
import { AboutPageComponent } from "./pages/about-page/about-page.component";

export const routes: Routes = [
  {
    path: "",
    component: AboutPageComponent,
  },
  {
    path: "**",
    redirectTo: "",
    pathMatch: "full",
  },
]