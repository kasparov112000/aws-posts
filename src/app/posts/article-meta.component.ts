import { Component, Input } from '@angular/core';
import { Post } from './post.model';

@Component({
  selector: 'app-article-meta',
  templateUrl: './article-meta.component.html'
})
export class ArticleMetaComponent {
  @Input() article: Post;
}
