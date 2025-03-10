import { createVNode, render } from "vue";
import Message from "./Message.vue";

var MessageLength = 0
var RxMessageID = 0

const RxaserMessage = (options) => {
  MessageLength++
  const id = `message_${RxMessageID++}`

  const container = document.createElement('div');

  // const props = typeof options === 'string' ? { content: options } : options;
  const props = {
    ...options,
    id
  }

  const vnode = createVNode(Message, props);
  render(vnode, container);

  const MessageDiv = container.firstElementChild
  document.body.appendChild(MessageDiv);
  addLoadMsg(MessageDiv)

  const instance = {
    vnode,
    container,
    close() {
      render(null, container);
      MessageLength--
      removeLoadMsg(MessageDiv)
    }
  };

  setTimeout(() => {
    instance.close();
  }, props.duration || 2000);

  return instance;
}

var LoadMsg = []
function addLoadMsg(element) {
  LoadMsg.push(element)
}
function removeLoadMsg(element) {
  LoadMsg.splice(element, 1)
}

export default RxaserMessage;