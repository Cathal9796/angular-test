import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { filter } from 'rxjs/operators';
import { UserPostActions } from 'src/app/store/actions/user-post.actions';
import {
  getCurrentUser,
  getOtherPosts,
  getOtherPostsLoadingState,
} from 'src/app/store/selectors/main.selectors';
import { MainState } from 'src/app/store/states';

@Component({
  selector: 'app-other-posts',
  templateUrl: './other-posts.component.html',
  styleUrls: ['./other-posts.component.scss'],
})
export class OtherPostsComponent implements OnInit {
  public loadingState$ = this.store.pipe(select(getOtherPostsLoadingState));
  public otherPosts$ = this.store.pipe(select(getOtherPosts));
  public user$ = this.store.pipe(select(getCurrentUser));

  constructor(private store: Store<MainState>) {}

  ngOnInit(): void {
    combineLatest([this.otherPosts$, this.user$])
      .pipe(filter(([otherPosts, user]) => otherPosts.length === 0))
      .subscribe(([otherPosts, user]) => {
        this.store.dispatch(
          UserPostActions.getOtherPosts({ userId: user.userInfo.id })
        );
      });
  }
}
