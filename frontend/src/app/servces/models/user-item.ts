import { User } from './user';
import { Item } from './item.model';

export interface UserItemIn {
  id: number;
  user_id: User;
  item_id: Item;
}

export interface UserItemOut {
  id: number;
  user: number;
  item: number;
}
