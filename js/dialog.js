'use strict';
(function () {
  var setupElement = document.querySelector('.setup');
  var dialogHandle = setupElement.querySelector('.upload');
  var setupOpenElement = document.querySelector('.setup-open');
  var setupCloseElement = setupElement.querySelector('.setup-close');
  var userNameInputElement = setupElement.querySelector('.setup-user-name');
  var defaultCoords = {
    x: setupElement.style.left,
    y: setupElement.style.top
  };

  var onPopupEscPress = function (evt) {
    window.util.isEscEvent(evt, function () {
      if (document.activeElement !== userNameInputElement) {
        closePopup();
      }
    });
  };

  var openPopup = function () {
    setupElement.classList.remove('hidden');
    formElement.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    window.wizard.openPopupAction();
  };
  var closePopup = function () {
    setupElement.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    window.wizard.closePopupAction();
    setupElement.style.left = defaultCoords.x;
    setupElement.style.top = defaultCoords.y;
  };

  setupOpenElement.addEventListener('click', function () {
    openPopup();
  });

  setupOpenElement.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  setupCloseElement.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  setupCloseElement.addEventListener('click', function () {
    closePopup();
  });

  // перемещение окна

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupElement.style.top = (setupElement.offsetTop - shift.y) + 'px';
      setupElement.style.left = (setupElement.offsetLeft - shift.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (draggedEvt) {
          draggedEvt.preventDefault();
          dialogHandle.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandle.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  var onLoad = function () {
    formElement.classList.add('hidden');
  };

  var formElement = setupElement.querySelector('.setup-wizard-form');
  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(formElement), onLoad, window.setup.onError);

  });

})();
