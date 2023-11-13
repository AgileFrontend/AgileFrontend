import { Message } from "./message";

export interface Conversation {
  userIDs: string[];
  messages: Message[]
}
