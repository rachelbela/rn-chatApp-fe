export interface ChatMessage {
    id: string;
    role: string;
    content?: string;
    think?: string;
    tool?: string;
    loading?: boolean;
};