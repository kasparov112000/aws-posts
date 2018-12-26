import { Component, OnInit, OnDestroy, Input } from "@angular/core";
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
  // posts = [
  //   { title: "First Post", content: "This is the first post's content" },
  //   { title: "Second Post", content: "This is the second post's content" },
  //   { title: "Third Post", content: "This is the third post's content" }
  // ];
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
  constructor(
    public postsService: PostsService,
    private authService: AuthService,
    private router: Router
  ) {}

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
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
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
    if (this.limit) {
      this.query.filters.limit = this.limit;
      this.query.filters.offset =  (this.limit * (this.currentPage - 1));
    }

   // this.articlesService.query(this.query)
 //   .subscribe(data => {
   //   this.isLoading = false;
   //   this.results = data.articles;

      // Used from http://www.jstips.co/en/create-range-0...n-easily-using-one-line/
   //   this.totalPages = Array.from(new Array(Math.ceil(data.articlesCount / this.limit)), (val, index) => index + 1);
  //  });
  }
  onChange(article:Post) {
  let favorited = this.autoRenew.value;

  article['favorited'] = favorited;
  console.log(this.autoRenew.value);

  // if (favorited) {
  //   article['favoritesCount']++;
  // } else {
  //   article['favoritesCount']--;
  // }
//console.log(article);
//console.log(article['favorited']);

  this.isSubmitting = true;
   // this.authService.getAuthStatusListener().pipe(concatMap(
    let obs = this.authService.getAuthStatusListener();

    obs.subscribe(authenticated => {
        // Not authenticated? Push to login screen
        console.log('estttttt');
        
        console.log('testtttttt' + authenticated);
        if (!authenticated) {
          this.router.navigateByUrl('/login');
        console.log('no authen');
          return of(null);
        }
        
        // Favorite the article if it isn't favorited yet
        console.log('article.favorited ' + article.favorited)
        if (!article.favorited) {
          console.log(article.favorited);
          return this.postsService.favorite(article.slug)
          .pipe(tap(
            data => {
              this.isSubmitting = false;
            //  this.toggle.emit(true);
            },
            err => this.isSubmitting = false
          ));

        // Otherwise, unfavorite the article
        } else {
          console.log('else' + article.favorited);
          return this.postsService.unfavorite(article.slug)
          .pipe(tap(
            data => {
              this.isSubmitting = false;
          //    this.toggle.emit(false);
            },
            err => this.isSubmitting = false
          ));
        }

      }
    );
} 
// onToggleFavorite(favorited: boolean) {
//   this.article['favorited'] = favorited;

//   if (favorited) {
//     this.article['favoritesCount']++;
//   } else {
//     this.article['favoritesCount']--;
//   }
// }

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

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
