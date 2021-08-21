import { ActionReducerMap } from '@ngrx/store';
import { MainState } from '../states/main.state';
import { currentUserReducer } from './current-user.reducers';
import { otherPostsReducer } from './other-posts.reducers';

export const mainFeatureKey = 'main';

export const reducers: ActionReducerMap<MainState> = {
  currentUser: currentUserReducer,
  otherPosts: otherPostsReducer,
};
