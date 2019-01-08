import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Subject, of, Observable, Subscription } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";
import { Router } from "@angular/router";


import { environment } from "../../environments/environment";
import { Post } from "./post.model";
import { ApiService } from "./api.service";
import { ArticleListConfig } from "./article-list-config.model";
import { MessageService1 } from "./message1.service";


const BACKEND_URL = environment.apiUrl + "/posts/";

@Injectable({ providedIn: "root" })

export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<{ posts: Post[]; postCount: number }>();
  private sub = Subscription;

  constructor(private http: HttpClient, private router: Router,
    private apiService: ApiService, private messageService1: MessageService1) { }

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    const userData = {}
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        BACKEND_URL + queryParams
      )
      .pipe(
        map(postData => {
          return {
            posts: postData.posts.map(post => {
              //  console.log(post);
              return {
                title: post.title,
                content: post.content,
                id: post._id,
                imagePath: post.imagePath,
                creator: post.creator,
                favorited: post.favorited,
                slug: post.slug
              };

            }),
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        //    console.log('tramsformed data' + transformedPostData)
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      content: string;
      imagePath: string;
      creator: string;
    }>(BACKEND_URL + id);
  }

  get(slug): Observable<Post> {
    return this.apiService.get('/articles/' + slug)
      .pipe(map(data => data.article));
  }


  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);
    this.http
      .post<{ message: string; post: Post }>(
        BACKEND_URL,
        postData
      )
      .subscribe(responseData => {
        this.router.navigate(["/"]);
      });
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    let postData: Post | FormData;
    if (typeof image === "object")
    {
      postData = new FormData();
      postData.append("id", id);
      postData.append("title", title);
      postData.append("content", content);
      postData.append("image", image, title);
    } else
    {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image,
        creator: null,
        favorited: false
      };
    }
    this.http
      .put(BACKEND_URL + id, postData)
      .subscribe(response => {
        this.router.navigate(["/"]);
      });
  }

  deletePost(postId: string) {
    console.log(postId);

    return this.http.delete(BACKEND_URL + postId);
  }
  unfavorite(slug) {
    // return this.apiService.delete('/articles/' + slug + '/favorite');
    this.http.delete<any>(BACKEND_URL + slug + '/favorite').subscribe(responseData => {
      console.log('favorite post response' + responseData);
      // this.router.navigate(["/auth/login"]);
    });
  }
  favorite(post: Post, userId) {
    console.log('I am in post.service favorite function slug is:' + post)
    const postData = new FormData();

    postData.append("userId", userId);
    postData.append("slug", post.slug);

    const body: any = {

      'userId': userId,
      'slug': post.slug,
      'post': post

    }
    // ).set(';userId', userId).set(thePost);
    // postData.append("slug", 'slug');
    console.log('paramsss:' + JSON.stringify(body));
    // console.log('postData:'+ JSON.stringify(postData));
    const theBody = JSON.stringify(body);

    console.log('i am in post.service.ts favorite function' + post);
    return this.http.post<any>(BACKEND_URL + post.slug + '/favorite', body).subscribe(responseData => {
     // console.log('favorite post response' + responseData);
      // this.router.navigate(["/auth/login"]);
    });
  }

  private log1(message: string) {
    this.messageService1.add(`PostService: ${message}`);
  }
  /* GET heroes whose name contains search term */
  searchHeroes1(term: string): Observable<Post[]> {
    if (!term.trim())
    {
      // if not search term, return empty hero array.
      return of([]);
    }
  
   return this.http.get<Post[]>(`${BACKEND_URL}?name=${term}`);
   
   //.pipe(
   //    tap(_ => this.log1(`found posts "${term}"`),
  //     catchError(this.handleError<Post[]>('searchHeroes', []))
   //    )

   //  );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log1(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
    /** Log a HeroService message with the MessageService */
  }


}