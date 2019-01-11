import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Comment } from '../comment.model';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthData } from 'src/app/auth/auth-data.model';



@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html'
})
export class PostCommentComponent implements OnInit {
  currentUser: any;


  constructor(
    private userService: AuthService
  ) { }

  @Input() comment: any = {};
  @Output() deleteComment = new EventEmitter<boolean>();

  canModify: boolean;

  ngOnInit() {
    // Load the current user's data
    // this.userService.getUserListener.map((userData) => {
    //     this.canModify = (userData.email === this.comment.author.email);
    //   });

  }


  deleteClicked() {
    this.deleteComment.emit(true);
  }


}
