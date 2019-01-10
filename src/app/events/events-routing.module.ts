import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DemoComponent } from "./calendar/component";

 

const routes: Routes = [
  { path: "calendar", component: DemoComponent }
 
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class EventsRoutingModule {}
