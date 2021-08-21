import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { combineLatest, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Post } from 'src/app/models';
import { UserPostService } from 'src/app/services/user-post.service';
import { UserPostActions } from '../actions/user-post.actions';
import { MainState } from '../states';

@Injectable()
export class UserPostEffects {
  constructor(
    private actions$: Actions,
    private service: UserPostService,
    private store: Store<MainState>
  ) {}

  public getUserInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserPostActions.login),
      switchMap((action) =>
        this.service.getUserInfo(action.email).pipe(
          map((response) => {
            if (response.length > 0) {
              this.store.dispatch(
                UserPostActions.getUserPosts({ userId: response[0].id })
              );
              return UserPostActions.loginSuccess({ userInfo: response[0] });
            } else {
              return UserPostActions.loginFail({
                error: 'User not found: ' + action.email,
              });
            }
          }),
          catchError((error) => {
            return of(
              UserPostActions.loginFail({
                error: 'Error while finding user: ' + action.email,
              })
            );
          })
        )
      )
    )
  );

  public getUserPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserPostActions.getUserPosts),
      switchMap((action) =>
        this.service.getUserPosts(action.userId).pipe(
          map((response) => {
            if (response.length > 0) {
              return UserPostActions.getUserPostsSuccess({ posts: response });
            } else {
              return UserPostActions.getUserPostsFail({
                error: 'Posts not found for user: ' + action.userId,
              });
            }
          }),
          catchError((error) => {
            return of(
              UserPostActions.getUserPostsFail({
                error: 'Error while finding posts for user: ' + action.userId,
              })
            );
          })
        )
      )
    )
  );

  public getOtherUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserPostActions.getOtherPosts),
      switchMap((action) =>
        combineLatest([
          this.service.getOtherUsersInfo(),
          this.service.getOtherPosts(),
        ]).pipe(
          map(([userInfos, allPosts]) => {
            let posts: Post[] = allPosts.filter(
              (posts) => posts.userId !== action.userId
            );

            posts.forEach((post) => {
              post.author = userInfos.filter(
                (userInfo) => userInfo.id === post.userId
              )[0].name;
            });

            return UserPostActions.getOtherPostsSuccess({ posts });
          }),
          catchError((error) => {
            return of(
              UserPostActions.getOtherPostsFail({
                error: 'Error while finding other users and posts',
              })
            );
          })
        )
      )
    )
  );

  public createPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserPostActions.createPost),
      switchMap((action) =>
        this.service.createPost(action.post).pipe(
          map((response) => {
            response.author = action.user.userInfo.name;
            return UserPostActions.createPostSuccess({ post: response });
          }),
          catchError((error) => {
            return of(
              UserPostActions.getUserPostsFail({
                error: 'Error while creating post: ' + action.post,
              })
            );
          })
        )
      )
    )
  );
}
