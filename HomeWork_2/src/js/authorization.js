export function initAuth(elements, navigate, classMap) {
  const {
    form,
    loginRadio,
    claimRadio,
    loginCaption,
    passwordCaption,
    loginInput,
    passwordInput,
    forgotPasswordLink,
    logonTypeField,
    notifyContainer,
    loginBox,
  } = elements;

  if (!form || !loginRadio || !claimRadio || !loginCaption || !passwordCaption ||
      !loginInput || !passwordInput || !logonTypeField || !notifyContainer || !loginBox) {
    console.error('initAuth: не все элементы переданы');
    return;
  }

  function changeLoginType(type) {
    if (type === 'claim') {
      if (loginCaption.dataset.claimCaption) {
        loginCaption.textContent = loginCaption.dataset.claimCaption;
      }
      if (passwordCaption.dataset.claimPswdCaption) {
        passwordCaption.textContent = passwordCaption.dataset.claimPswdCaption;
      }
      loginInput.placeholder = 'Например: 123456';
      passwordInput.placeholder = 'Номер паспорта без серии или дата в формате 31.12.2000';
      if (forgotPasswordLink) {
        forgotPasswordLink.classList.add(classMap.hidden); 
      }
      logonTypeField.value = 'claim';
    } else {
      if (loginCaption.dataset.loginCaption) {
        loginCaption.textContent = loginCaption.dataset.loginCaption;
      }
      if (passwordCaption.dataset.loginPswdCaption) {
        passwordCaption.textContent = passwordCaption.dataset.loginPswdCaption;
      }
      loginInput.placeholder = 'Логин';
      passwordInput.placeholder = 'Введите пароль';
      if (forgotPasswordLink) {
        forgotPasswordLink.classList.remove(classMap.hidden); 
      }
      logonTypeField.value = 'login';
    }
  }

  const handleLoginRadioChange = () => {
    if (loginRadio.checked) changeLoginType('login');
  };
  const handleClaimRadioChange = () => {
    if (claimRadio.checked) changeLoginType('claim');
  };

  loginRadio.addEventListener('change', handleLoginRadioChange);
  claimRadio.addEventListener('change', handleClaimRadioChange);

  if (loginRadio.checked) {
    changeLoginType('login');
  }

  function showError(message) {
    notifyContainer.innerText = message;
    notifyContainer.style.color = 'red';
    notifyContainer.style.display = 'block';
  }

  function clearError() {
    notifyContainer.innerText = '';
    notifyContainer.style.display = 'none';
  }

  const origUrl = loginBox.getAttribute('data-orig-url') || '';
  function getTouristUrl() {
    if (origUrl && /^https?:\/\//i.test(origUrl)) {
      return origUrl;
    }
    const path = origUrl || '/cl_refer_person';
    return 'https://online.onetouch.travel' + path;
  }

  const handleSubmit = (e) => {
    const login = loginInput.value.trim();
    const password = passwordInput.value.trim();
    const logonType = logonTypeField.value;

    if (logonType === 'claim') {
      form.action = getTouristUrl();
      form.target = '_self';
      return;
    }

    e.preventDefault();
    clearError();

    if (!login || !password) {
      showError('Заполните логин и пароль');
      return;
    }

    const payload = {
      Login: login,
      Password: password,
      IsEmployee: true,
      ClaimValue: ''
    };

    fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      credentials: 'include',
      body: JSON.stringify(payload)
    })
      .then(response => response.json().catch(() => ({}))
        .then(data => ({ ok: response.ok, data })))
      .then(({ ok, data }) => {
        if (!ok) {
          showError(data.message || 'Ошибка авторизации');
          return;
        }

        console.log('Auth success response:', data);
        const token = data.token || data.Token || (data.data && (data.data.token || data.data.Token));

        if (token) {
          document.cookie = 'token=' + encodeURIComponent(token) + '; path=/';
        }

        if (navigate) {
          navigate('/admin');
        } else {
          window.location.href = '/admin';
        }
      })
      .catch(err => {
        console.error(err);
        showError('Ошибка соединения с сервером');
      });
  };

  form.addEventListener('submit', handleSubmit);

  return function cleanup() {
    loginRadio.removeEventListener('change', handleLoginRadioChange);
    claimRadio.removeEventListener('change', handleClaimRadioChange);
    form.removeEventListener('submit', handleSubmit);
  };
}