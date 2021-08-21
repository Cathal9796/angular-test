import { Post } from "./post";
import { UserInfo } from "./user-info";

export interface User {
  userInfo: UserInfo,
  posts: Post[]
}
