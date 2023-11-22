import { Timestamp } from "@angular/fire/firestore";

export interface PostComment {
  content?: string;
  userId: string;
  sentDate: Timestamp;
}
