import { NgModule } from "@angular/core";
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatDialogModule,
  MatSlideToggleModule,
  MatButtonToggleModule,
  MatIconModule,
  MatAutocompleteModule


} from "@angular/material";

@NgModule({
  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatIconModule,
    MatAutocompleteModule
  ]
})
export class AngularMaterialModule { }
