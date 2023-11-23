import { Component, Input, OnChanges, Output} from '@angular/core';
import { Observable } from 'rxjs';
import { PostComment } from 'src/app/services/comment';
import { CommentService } from 'src/app/services/post/comment/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnChanges {

  @Input() postId! : string
  @Output() comments$ = new Observable<PostComment[]>

  constructor(private commentService : CommentService){

  }

  //Fetch comments
  ngOnChanges(): void {
    if (this.postId !== undefined){
      this.comments$ = this.commentService.readAllCommentFromPostId(this.postId)
    }
  }
}
