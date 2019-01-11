import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { PostCreateComponent } from "./post-create/post-create.component";
import { PostListComponent } from "./post-list/post-list.component";
import { AngularMaterialModule } from "../angular-material.module";
import { FavoriteButtonComponent } from "./buttons/favorite-button.component";
import { ArticleMetaComponent } from "./article-meta.component";
import { PostSearchComponent } from "../post-search/post-search.component";
import { DemoModule } from "../events/calendar/module";
import { PostCommentComponent } from "./post-comment/post-comment.component";


@NgModule({

  declarations: [PostCommentComponent, PostSearchComponent, PostSearchComponent, PostCreateComponent, PostListComponent, FavoriteButtonComponent, ArticleMetaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,
    DemoModule
  ]
})
export class PostsModule { }
