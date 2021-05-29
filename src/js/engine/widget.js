import { unit, container, userPic } from './template';

export default class Widget {
  constructor() {
    this.user = undefined;
    // this.webSocket = new WebSocket(`ws://localhost:3000`);
    // this.server = `https://vp-ahj-chat.herokuapp.com/`;
    this.webSocket = new WebSocket(`wss://vp-ahj-chat.herokuapp.com/`);
  }
  async init() {
    this.render();
    this.bindToDOM();
    this.signupListen();
  }

  render() {
    document.body.append(container());
  }

  bindToDOM() {
    // Получаем поле чата
    this.chat = document.querySelector('ul.msg-container');
    // Получаем поле пользователей
    this.usersContainer = document.querySelector('ul.users-container');

    // Получаем форму ввода имени
    this.loginForm = document.querySelector('#loginForm');
    // Получаем строку ввода имени
    this.loginInput = document.querySelector('#loginInput');
    // Получаем кнопку для ввода имени
    this.loginSend = document.querySelector('#loginSend');

    // Получаем форму отправки сообщений
    this.sendMsgForm = document.querySelector('#msgForm');
    // Получаем строку ввода сообщения
    this.msgInput = document.querySelector('#msgInput');
    // Получаем кнопку для ввода сообщения
    this.btnMsgSend = document.querySelector('#msgSend');
  }

  signupListen() {
    this.loginInput.focus();

    // Получаем сообщение от сервера
    this.webSocket.addEventListener(
      'message',
      (event) => {
        event.preventDefault();
        this.socketMsgHandler(event);
      },
      false
    );

    // Отслеживаем нажатие мыши
    this.loginSend.addEventListener(
      'click',
      (event) => {
        event.preventDefault();
        this.signup();
      },
      false
    );

    // Отслеживаем отправку формы
    this.loginForm.addEventListener(
      'submit',
      (event) => {
        event.preventDefault();
        this.signup();
      },
      false
    );
  }

  async signup() {
    const login = this.loginInput.value;
    await this.webSocket.send(
      JSON.stringify({
        type: 'login',
        login,
        time: new Date(),
      })
    );
  }

  socketMsgHandler(event) {
    const data = JSON.parse(event.data);
    const { type, usersList, error, state } = data;

    if (state === 'loginTrue') {
      this.loginForm.classList.add('visually-hidden');
      this.sendMsgForm.classList.remove('visually-hidden');
      this.user = data.user;
      this.chatInit();
    }
    if (error) {
      const newMsg = unit(data);
      newMsg.classList.add('error');
      this.chat.append(newMsg);
      this.chat.lastElementChild.scrollIntoView();
      return;
    }
    if (type === 'msg' && this.user) {
      let newMsg;
      if (data.name === this.user.name) {
        data.name = 'You';
        newMsg = unit(data);
        newMsg.classList.add('myself');
      } else {
        newMsg = unit(data);
      }
      this.chat.append(newMsg);
      this.chat.lastElementChild.scrollIntoView();
    }
    if (usersList) {
      this.users = JSON.parse(usersList);
      this.renderUsers();
    }
  }

  renderUsers() {
    this.usersContainer.innerHTML = '';
    for (let user of this.users) {
      this.usersContainer.append(userPic(user));
    }
  }

  async chatInit() {
    this.msgInput.focus();

    // Отслеживаем нажатие мыши
    this.btnMsgSend.addEventListener(
      'click',
      (event) => {
        event.preventDefault();
        this.sendMsg();
      },
      false
    );

    // Отслеживаем отправку формы
    this.sendMsgForm.addEventListener(
      'submit',
      (event) => {
        event.preventDefault();
        this.sendMsg();
      },
      false
    );
  }

  async sendMsg() {
    const message = this.msgInput.value;
    await this.webSocket.send(
      JSON.stringify({
        type: 'msg',
        message: message,
        userId: this.user.id,
        time: new Date(),
      })
    );
    this.msgInput.value = '';
  }
}
