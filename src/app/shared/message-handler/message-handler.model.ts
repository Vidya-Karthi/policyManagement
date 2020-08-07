export interface MessageState {
  message: any;
  messageType: MessageTypeEnum;
}

export const MessageTypeEnum = {
  success: 'success' as 'success',
  error: 'error' as 'error',
  warning: 'warning' as 'warning'
};
export type MessageTypeEnum = (typeof MessageTypeEnum)[keyof typeof MessageTypeEnum];
