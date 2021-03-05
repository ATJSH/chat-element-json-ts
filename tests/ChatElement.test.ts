import { ChatElement } from '../src/index';

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

    interface BasicCardElementPropsType {
      title?: string;
      description?: string;
      buttons?: ButtonType[];
    }

    type BasicCardType = ChatElement<BasicCardElementPropsType>;

    interface BasicCardParameter {
      title?: string;
      description?: string;
      buttons?: ButtonType[];
    }

    function BasicCard({ title, description, buttons }: BasicCardParameter): BasicCardType {
      return new ChatElement('basicCard', {
        title,
        description,
        buttons,
      });
    }

    const myButton: ButtonType = Button({
      label: 'myButton',
      action: 'message',
      messageText: 'Hello world!',
    });

    const myBasicCard: BasicCardType = BasicCard({
      title: 'hello',
      description: 'world',
      buttons: [
        myButton
      ]
    })

    expect(myBasicCard.render()).toEqual({
      title: 'hello',
      description: 'world',
      buttons: [
        {
          label: 'myButton',
          action: 'message',
          messageText: 'Hello world!',
        }
      ]
    });
    
  });
});
