import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from "@angular/core";
import { PageEvent } from "@angular/material";
import { Subscription, of } from "rxjs";

import { Post } from "../post.model";
import { PostsService } from "../posts.service";
import { AuthService } from "../../auth/auth.service";
import { FormControl } from "@angular/forms";
import { tap, concatMap } from "rxjs/operators";
import { Router } from "@angular/router";
import { ArticleListConfig } from "../article-list-config.model";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.scss"]
})
export class PostListComponent implements OnInit, OnDestroy {

  @Input()
  view: string;

  @Input()
  viewDate: Date;

  @Input()
  locale: string = 'en';

  @Output()
  viewChange: EventEmitter<string> = new EventEmitter();

  @Output()
  viewDateChange: EventEmitter<Date> = new EventEmitter();


  posts: Post[] = [];
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  private postsSub: Subscription;
  private authStatusSub: Subscription;
  autoRenew = new FormControl();
  private authSub: Subscription;
  checked = true;
  disabled = false;
  color = 'warn';

  constructor(
    public postsService: PostsService,
    private authService: AuthService,
    private router: Router
  ) { }

  @Input() limit: number;

  isSubmitting = false;
  query: ArticleListConfig;
  results: Post[];
  totalPages: Array<number> = [1];

  ngOnInit() {

    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((postData: { posts: Post[]; postCount: number }) => {
        this.isLoading = false;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
        console.log(this.posts);

      });

    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  setPageTo(pageNumber) {
    this.currentPage = pageNumber;
    this.runQuery();
  }
  runQuery() {
    this.isLoading = true;
    this.results = [];
    //console.log(Object.entries(this.query));
    // Create limit and offset filter (if necessary)
    if (this.limit)
    {
      this.query.filters.limit = this.limit;
      this.query.filters.offset = (this.limit * (this.currentPage - 1));
    }

    // this.articlesService.query(this.query)
    //   .subscribe(data => {
    //   this.isLoading = false;
    //   this.results = data.articles;

    // Used from http://www.jstips.co/en/create-range-0...n-easily-using-one-line/
    //   this.totalPages = Array.from(new Array(Math.ceil(data.articlesCount / this.limit)), (val, index) => index + 1);
    //  });
  }
  onChange(article) {

    console.log('useer is auth' + this.userIsAuthenticated);
    this.isSubmitting = true;

    if (!this.userIsAuthenticated)
    {
      this.router.navigateByUrl('auth/login');
      return of(null);
    }

    // Favorite the article if it isn't favorited yet
    console.log('article.favorited::: ' + article.slug)
    if (!article.favorited)
    {
      console.log('article not favorited ' + article.favorited);
      // this.postsService.favorite(article.slug,article);
      return this.postsService.favorite(article, this.userId);
      // Otherwise, unfavorite the article
    } else
    {

      //   return this.postsService.unfavorite(article.slug)
      console.log('article favorited ' + article.favorited);

      return this.postsService.unfavorite(article.slug)
    }
  }


  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    }, () => {
      this.isLoading = false;
    });
  }

   myFunction(x) {
    x.classList.toggle("fa-thumbs-down");
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
