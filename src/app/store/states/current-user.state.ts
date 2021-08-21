import { LoadingState, User } from 'src/app/models/index';

export interface CurrentUserState {
  user: User;
  infoLoadingState: LoadingState;
  postsLoadingState: LoadingState;
}

export const initialCurrentUserState: CurrentUserState = {
  user: {
    userInfo: {
      address: {
        city: '',
        geo: undefined,
        street: '',
        suite: '',
        zipcode: '',
      },
      company: {
        bs: '',
        catchPhrase: '',
        name: '',
      },
      email: '',
      id: -1,
      name: '',
      phone: '',
      username: '',
      website: '',
    },
    posts: []
  },
  infoLoadingState: LoadingState.Unknown,
  postsLoadingState: LoadingState.Unknown
};
