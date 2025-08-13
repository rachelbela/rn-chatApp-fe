export interface ChatMessage {
    id: string;
    role: string;
    content: string;
    think?: string;
    tool?: "get_stock_price",
};