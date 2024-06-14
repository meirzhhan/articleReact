import { User } from '@/entities/User';

export interface CommentType {
  id: string;
  user: User;
  text: string;
}
