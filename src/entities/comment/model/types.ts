import { UserData } from 'entities/user/model/types';

export interface CommentItem {
  user: Pick<UserData, 'fullName' | 'avatarUrl'>;
  text: string;
}
