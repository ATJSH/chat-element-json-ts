import { ChatElement, renderChatElement } from '../src/index';

describe('ChatElement 컴포넌트 테스트', () => {
  it('컴포넌트 함수와 컴포넌트 타입 정의', () => {
    interface ButtonElementPropsType {
      label: string;
      action: string;
      webLinkUrl?: string;
      messageText?: string;
      phoneNumber?: string;
      blockId?: string;
      extra?: Record<string, any>;
    }

    type ButtonType = ChatElement<ButtonElementPropsType>;

    interface ButtonParameter {
      label: string;
      action: 'webLink' | 'message' | 'block' | 'phone';
      webLinkUrl?: string;
      messageText?: string;
      blockId?: string;
      phoneNumber?: string;
      extra?: Record<string, any>;
    }

    function Button({
      label,
      action,
      webLinkUrl,
      messageText,
      blockId,
      phoneNumber,
      extra,
    }: ButtonParameter): ButtonType {
      return new ChatElement('button', {
        label,
        action,
        webLinkUrl,
        messageText,
        blockId,
        phoneNumber,
        extra,
      });
    }

    const myButton: ButtonType = Button({
      label: 'myButton',
      action: 'message',
      messageText: 'Hello world!',
    });
    const renderedMyButton = renderChatElement(myButton);

    expect(renderedMyButton).toEqual({
      "button": {
        label: 'myButton',
        action: 'message',
        messageText: 'Hello world!',
      }
    });
  });
});
