import { Timestamp } from '@firebase/firestore';

export interface Message {
  senderID: string;
  recieverIDs: string[];
  sentDate: Timestamp;
  content: string;
}
