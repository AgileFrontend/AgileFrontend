import { Timestamp } from "@angular/fire/firestore";

export interface Post {
  content?: string;
  userId: string;
  sentDate: Timestamp;
}
