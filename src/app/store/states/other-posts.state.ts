import { LoadingState, Post, User } from "src/app/models/index";

export interface OtherPostsState {
  posts: Post[];
  loadingState: LoadingState
}

export const initialOtherPostsState: OtherPostsState = {
  posts: [],
  loadingState: LoadingState.Unknown
}

