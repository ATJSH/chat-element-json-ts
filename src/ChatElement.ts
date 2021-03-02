import _ from 'lodash';

type JSONPrimitive = string | number | boolean | null;
type JSONValue = JSONPrimitive | JSONObject | JSONArray;
type JSONObject = { [member: string]: JSONValue };
interface JSONArray extends Array<JSONValue> {}

/**
 * Kakao i 오픈빌더 챗봇 응답 데이터를 만들 때 사용할 수 있는, 응답 데이터의 요소.
 * @param {string} name - 챗봇 응답을 만들 때 응답 데이터에 명시되는 요소의 이름. 인스턴스를 만들 때 Kakao i 오픈빌더에 정의된 이름을 그대로 명시해야 함. 예) 'basicCard', 'button' 등
 * @param {ElementPropsType} props - 챗봇 응답으로 노출할 응답 데이터. 기본적으로 Record<string, PropValue> 타입임. 렌더링 작업을 통해 오픈빌더 응답에 사용할 수 있는 순수 JSON 데이터를 생성함.
 * 해당 props는 제네릭 타입 ElementPropsType을 총족해야 함.
 * @typedef {ElementPropsType} ElementPropsType - props의 interface, 즉 챗봇 응답으로 노출할 데이터의 구조. 해당 interface는 Kakao i 오픈빌더에 정의된 엘리먼트별 상세 필드 구조를 그대로 구현해야 함.
 *
 * 해당 ChatElement 클래스는 React 라이브러리 (https://github.com/facebook/react)의 'ReactElement' 구현 구조 일부를 참고하여 작성하였음.
 */
export class ChatElement<ElementPropsType = object> {
  constructor(public name: string, public props: ElementPropsType) {}
}

/**
 * Map 형식인 ChatElement.props의 Value에 할당 가능한 타입들.
 */
type PropValue = ChatElement | ChatElement[] | number | string | number | boolean | JSONObject;

/** chatElement의 props를 사용하여 챗봇 응답에 사용 가능한 순수 JSON 데이터를 생성함 */
export function renderChatElement(chatElement: ChatElement): Record<string, any> {
  return _.mapValues(chatElement.props, (propValue: PropValue) => {
    if (propValue instanceof ChatElement) {
      return renderChatElement(propValue);
    } else if (Array.isArray(propValue)) {
      return renderUnknownObject(propValue);
    } else if (typeof propValue === 'object') {
      return renderUnknownObject(propValue);
    }
    return propValue;
  });
}

function renderUnknownObject(unknownObject: any): Record<string, any> {
  if (unknownObject instanceof ChatElement) {
    return renderChatElement(unknownObject);
  } else if (Array.isArray(unknownObject)) {
    return unknownObject.map((unknownObjectValue) => {
      if (unknownObjectValue instanceof ChatElement) {
        return renderChatElement(unknownObjectValue);
      }
      if (typeof unknownObjectValue === 'object') {
        return renderUnknownObject(unknownObjectValue);
      } else {
        return unknownObjectValue;
      }
    });
  } else if (typeof unknownObject === 'object') {
    return _.mapValues(unknownObject, (unknownObjectValue) => {
      return renderUnknownObject(unknownObjectValue);
    });
  }

  return unknownObject;
}
