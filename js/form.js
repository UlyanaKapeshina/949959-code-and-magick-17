'use strict';
(function () {

  var userNameInputElement = document.querySelector('.setup-user-name');

  userNameInputElement.addEventListener('invalid', function () {
    if (userNameInputElement.validity.tooShort) {
      userNameInputElement.setCustomValidity('Имя должно состоять минимум из 2-х символов');
    } else if (userNameInputElement.validity.tooLong) {
      userNameInputElement.setCustomValidity('Имя не должно превышать 25-ти символов');
    } else {
      userNameInputElement.setCustomValidity('');
    }
  });
})();
