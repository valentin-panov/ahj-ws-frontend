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
  newUnit.innerHTML = `${data.name}`;
  return newUnit;
}

function unitForm(data) {
  const title = data.id ? 'Изменить тикет' : 'Добавить тикет';
  const formElement = document.createElement('div');
  formElement.classList.add('unitForm');
  formElement.innerHTML = `
    <form name="unitForm" data-id="${data.id}" novalidate class="form">
      
      <h2 class="unitForm__header">${title}</h2>

      <input class="form__input" type="text" name="name" value="${
        data.name
      }" required placeholder="Введите имя тикета"></textarea>
      
      <textarea class="form__input" type="text" name="description" required placeholder="Введите описание тикета">${data.description.replace(
        /<br\s*\/?>/gm,
        '\n'
      )}</textarea>
      
      <div class="form__input-button-holder">
        <button type="button" class="btn btn-cancel">Отмена</button>
        <button type="submit" class="btn btn-submit">Ok</button>
      </div>
    </form>
  `;
  return formElement;
}

function unitDelete(data) {
  const formElement = document.createElement('div');
  formElement.classList.add('unitForm');
  formElement.innerHTML = `
    <form name="unitDeleteForm" data-id="${data}" novalidate class="form">
      
      <h2 class="unitForm__header">Удалить тикет</h2>

      <span class="unit-delete-text">Вы уверены, что хотите удалить тикет? Это действие необратимо.</span>
      
      <div class="form__input-button-holder">
        <button type="button" class="btn btn-cancel">Отмена</button>
        <button type="submit" class="btn btn-submit">Ok</button>
      </div>
    </form>
  `;
  return formElement;
}

export { container, unit, userPic, unitForm, unitDelete };
