import { createAction, props } from '@ngrx/store';
import { Post, User, UserInfo } from 'src/app/models/index';


export const UserPostActions = {
  login: createAction('login', props<{ email: string }>()),
  loginSuccess: createAction(
    'loginSuccess',
    props<{ userInfo: UserInfo }>()
  ),
  loginFail: createAction('loginFail', props<{ error: string }>()),

  getUserPosts: createAction('getUserPosts', props<{ userId: number }>()),
  getUserPostsSuccess: createAction(
    'getUserPostsSuccess',
    props<{ posts: Post[] }>()
  ),
  getUserPostsFail: createAction('getUserPostsFail', props<{ error: string }>()),

  getOtherPosts: createAction('getOtherPosts', props<{ userId: number }>()),
  getOtherPostsSuccess: createAction(
    'getOtherPostsSuccess',
    props<{ posts: Post[] }>()
  ),
  getOtherPostsFail: createAction('getOtherPostsFail', props<{ error: string }>()),

  createPost: createAction('createPost', props<{ user: User, post: Post }>()),
  createPostSuccess: createAction(
    'createPostSuccess',
    props<{ post: Post }>()
  ),
  createPostFail: createAction('createPostFail', props<{ error: string }>())
};
