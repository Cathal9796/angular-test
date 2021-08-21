import { CurrentUserState, initialCurrentUserState } from "./current-user.state";
import { initialOtherPostsState, OtherPostsState } from "./other-posts.state";

export interface MainState {
  currentUser: CurrentUserState
  otherPosts: OtherPostsState
}

export const initialMainState: MainState = {
  currentUser: initialCurrentUserState,
  otherPosts: initialOtherPostsState
}

