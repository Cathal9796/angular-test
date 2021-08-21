
import { createReducer, on, Action } from '@ngrx/store';
import { LoadingState } from 'src/app/models/index';
import { UserPostActions } from '../actions/user-post.actions';
import { initialOtherPostsState, OtherPostsState } from '../states';

export function otherPostsReducer(state: OtherPostsState | undefined, action: Action) {
  return reducer(state, action);
}

export const reducer = createReducer(
  initialOtherPostsState,
  on(UserPostActions.getOtherPosts, (state, { userId }) => ({
    ...state,
    loadingState: LoadingState.Loading
  })),
  on(UserPostActions.getOtherPostsSuccess, (state, { posts }) => ({
    ...state,
    loadingState: LoadingState.Success,
    posts
  })),
  on(UserPostActions.getOtherPostsFail, (state, { error }) => ({
    ...state,
    loadingState: LoadingState.Failed
  })),
);
