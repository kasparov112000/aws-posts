import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Post } from '../posts/post.model';
import { PostsService } from '../posts/posts.service';

@Component({
  selector: 'app-post-search',
  templateUrl: './post-search.component.html',
  styleUrls: ['./post-search.component.css']
})
export class PostSearchComponent implements OnInit {
  heroes$: Observable<Post[]>;
  hers: Post[];
  private searchTerms = new Subject<string>();

  constructor(private heroService: PostsService) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term)
    this.heroes$.subscribe(heroes => {
      this.hers = heroes as Post[];
      console.log('$$$$$$$$$$$$$$$$$$$$$$');
      console.log(this.hers);

    }

    )

  }

  ngOnInit(): void {

    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchHeroes1(term))
    );
    console.log('the heroues**************************');
    console.log(this.heroes$);
  }
}
