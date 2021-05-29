function container() {
  const newContainer = document.createElement('main');
  newContainer.classList.add('wrapper');
  newContainer.innerHTML = `
  <div class="widget-container">
  <h2 class="chat-header">AHJ-WS-Chat</h2>
  <div class="chat-container">
    <div class="list-wrapper">
      <ul id="usersContainer" class="list-container users-container"></ul>
    </div>
    <div class="list-wrapper">
      <ul id="msgContainer" class="msg-container list-container"></ul>
    </div>
  </div>

  <form id="loginForm" class="form__input-button-holder ">
    <input
      id="loginInput"
      class="form__input"
      type="text"
      placeholder="Введите псевдоним.."
      name="name"
      required
    />
    <button id="loginSend" type="button" class="btn btn-submit">Войти</button>
  </form>

  <form id="msgForm" class="form__input-button-holder visually-hidden">
    <input
      id="msgInput"
      class="form__input"
      type="text"
      placeholder="Введите сообщение.."
      name="msg"
      required
    />
    <button id="msgSend" type="button" class="btn btn-submit">Отправить</button>
  </form>
</div>
  `;
  return newContainer;
}

function unit(data) {
  const newUnit = document.createElement('li');
  newUnit.classList.add('unit');
  newUnit.innerHTML = `${data.name}<br>${data.time}<br>${data.message}`;
  return newUnit;
}

function userPic(data) {
  const newUnit = document.createElement('li');
  newUnit.classList.add('unit');
  newUnit.dataset.userId = `${data.id}`;
  newUnit.innerHTML = `<img class="userpic">&nbsp<span class="username">${data.name}</span>`;
  return newUnit;
}

export { container, unit, userPic };
