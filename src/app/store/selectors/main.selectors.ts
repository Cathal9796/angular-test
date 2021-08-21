import { createFeatureSelector, createSelector } from "@ngrx/store";
import { mainFeatureKey } from "../reducers";
import { MainState } from "../states";

export const getMainState = createFeatureSelector<MainState>(mainFeatureKey);

export const getCurrentUserState = createSelector(getMainState, state => state.currentUser);
export const getCurrentUserLoadingState = createSelector(getCurrentUserState, state => state.infoLoadingState);
export const getCurrentUserPostsLoadingState = createSelector(getCurrentUserState, state => state.postsLoadingState);
export const getCurrentUser = createSelector(getCurrentUserState, state => state.user);
export const getCurrentUserName = createSelector(getCurrentUser, state => state.userInfo.name);
export const getCurrentUserId = createSelector(getCurrentUser, state => state.userInfo.id);
export const getCurrentUserPosts = createSelector(getCurrentUser, state => state.posts);

export const getOtherPostsState = createSelector(getMainState, state => state.otherPosts);
export const getOtherPostsLoadingState = createSelector(getOtherPostsState, state => state.loadingState);
export const getOtherPosts = createSelector(getOtherPostsState, state => state.posts);
