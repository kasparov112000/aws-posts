import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

 
import { AngularMaterialModule } from "../angular-material.module";
import { EventsRoutingModule } from "./events-routing.module";
import { FlatpickrModule } from "angularx-flatpickr";
import { DemoUtilsModule } from "./demo-utils/module";

@NgModule({
  declarations: [ ],
  imports: [CommonModule,  DemoUtilsModule, AngularMaterialModule, FormsModule, EventsRoutingModule,
     FlatpickrModule.forRoot(), ]
})
export class EventsModule {}
