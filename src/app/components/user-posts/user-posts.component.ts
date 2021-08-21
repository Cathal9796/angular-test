import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { filter, map, take } from 'rxjs/operators';
import { Post, User } from 'src/app/models';
import { UserPostActions } from 'src/app/store/actions/user-post.actions';
import { getCurrentUser, getCurrentUserPostsLoadingState } from 'src/app/store/selectors/main.selectors';
import { MainState } from 'src/app/store/states';
import { CreatePostModalComponent } from '../create-post-modal/create-post-modal.component';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss'],
})
export class UserPostsComponent implements OnInit {
  public user$ = this.store.pipe(select(getCurrentUser));
  public posts$ = this.user$.pipe(filter(user=>user.posts.length>0), map((x) => x.posts.slice().sort((a, b) => b.id - a.id)));
  public postsLoadingState$ = this.store.pipe(select(getCurrentUserPostsLoadingState));

  user: User = undefined;

  constructor(private store: Store<MainState>, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.user$.subscribe((user) => (this.user = user));
  }

  createPost() {
    if (this.dialog.openDialogs.length === 0) {
      const modal = this.dialog.open(CreatePostModalComponent, {
        width: '640px',
        data: { user: this.user },
      });
      modal
        .afterClosed()
        .pipe(take(1))
        .subscribe((result: { createPost: boolean; post: Post }) => {
          if (result && result.createPost) {
            this.store.dispatch(
              UserPostActions.createPost({ user: this.user, post: result.post })
            );
          }
        });
    }
  }
}
