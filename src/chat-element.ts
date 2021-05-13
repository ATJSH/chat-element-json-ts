import _ from 'lodash';

type JSONPrimitive = string | number | boolean | null;
type JSONValue = JSONPrimitive | JSONObject | JSONArray;
type JSONObject = { [member: string]: JSONValue };
interface JSONArray extends Array<JSONValue> {}

/**
 * Kakao i 오픈빌더 챗봇 응답 데이터를 만들 때 사용할 수 있는, 응답 데이터의 요소.
 * @param {ElementName} name - 챗봇 응답을 만들 때 응답 데이터에 명시되는 요소의 이름.
 * @param {ElementPropsType} props - 챗봇 응답으로 노출할 응답 데이터. 기본적으로 Record<string, PropValue> 타입임. 렌더링 작업을 통해 오픈빌더 응답에 사용할 수 있는 순수 JSON 데이터를 생성함.
 * 해당 props는 제네릭 타입 ElementPropsType을 총족해야 함.
 * @typedef {ElementPropsType} ElementPropsType - props의 interface, 즉 챗봇 응답으로 노출할 데이터의 구조. 해당 interface는 챗봇 응답 JSON 스펙을 그대로 구현해야 함.
 */
export class ChatElement<ElementName = string, ElementPropsType extends Record<any, any> = object> {
  constructor(public name: ElementName, public props: ElementPropsType) {}

  /** chatElement의 props를 사용하여 챗봇 응답에 사용 가능한 순수 JSON 데이터를 생성함 */
  toJSON() {
    return _.pickBy(this.props, _.identity);
  }

  render() {
    return JSON.parse(JSON.stringify(this));
  }
}

export function renderChatElement(chatElement: ChatElement) {
  return {
    [chatElement.name]: chatElement.toJSON(),
  };
}
