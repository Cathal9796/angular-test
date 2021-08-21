
import { createReducer, on, Action } from '@ngrx/store';
import { LoadingState } from 'src/app/models/index';
import { UserPostActions } from '../actions/user-post.actions';
import { CurrentUserState, initialCurrentUserState } from '../states';

export function currentUserReducer(state: CurrentUserState | undefined, action: Action) {
  return reducer(state, action);
}

export const reducer = createReducer(
  initialCurrentUserState,
  on(UserPostActions.login, (state, { email }) => ({
    ...state,
    infoLoadingState: LoadingState.Loading
  })),
  on(UserPostActions.loginSuccess, (state, { userInfo }) => ({
    ...state,
    user: {
      userInfo,
      posts: []
    },
    infoLoadingState: LoadingState.Success
  })),
  on(UserPostActions.loginFail, (state, { error }) => ({
    ...state,
    user: initialCurrentUserState.user,
    infoLoadingState: LoadingState.Failed
  })),
  on(UserPostActions.getUserPosts, (state, { userId }) => ({
    ...state,
    postsLoadingState: LoadingState.Loading
  })),
  on(UserPostActions.getUserPostsSuccess, (state, { posts }) => ({
    ...state,
    user: {
      userInfo: state.user.userInfo,
      posts: posts
    },
    postsLoadingState: LoadingState.Success
  })),
  on(UserPostActions.getUserPostsFail, (state, { error }) => ({
    ...state,
    postsLoadingState: LoadingState.Failed
  })),
  on(UserPostActions.createPost, (state, { post }) => ({
    ...state,
    postsLoadingState: LoadingState.Loading
  })),
  on(UserPostActions.createPostSuccess, (state, { post }) => ({
    ...state,
    user:{
      userInfo: state.user.userInfo,
      posts: [...state.user.posts, post]
    },
    postsLoadingState: LoadingState.Success
  })),
  on(UserPostActions.getUserPostsFail, (state, { error }) => ({
    ...state,
    postsLoadingState: LoadingState.Failed
  }))
);

export class PostArrayExtension{
  addPostToUser
}
