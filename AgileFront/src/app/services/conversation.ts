import { Message } from "./message";

export interface Conversation {
  conversationName? : string
  userIDs: string[];
  messages: Message[]
}
