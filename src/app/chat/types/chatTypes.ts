export interface Chat {
    id: string;
    name: string;
  }
  
  export interface ChatItem extends Chat {
    lastMessage: string;
  }

  export interface Message {
    text: string;
    created_at: Date;
  }

  export type RootStackParamList = {
    ChatView: { chatName: string }; 
};
