'use strict';
(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var setupElement = document.querySelector('.setup');
  var coatColorInputElement = setupElement.querySelector('input[name=coat-color]');
  var eyesColorInputElement = setupElement.querySelector('input[name=eyes-color]');
  var fireballColorInputElement = setupElement.querySelector('input[name=fireball-color]');
  var wizardCoatElement = setupElement.querySelector('.wizard-coat');
  var wizardEyesElement = setupElement.querySelector('.wizard-eyes');
  var wizardFireballElement = setupElement.querySelector('.setup-fireball-wrap');

  // создание магов
  var wizards = [];
  var coatColor = coatColorInputElement.value;
  var eyesColor = eyesColorInputElement.value;

  var onLoad = function (data) {
    wizards = data;
    updateWizards();
  };

  var onError = function (errorMessage) {
    var message = document.createElement('div');
    message.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    message.style.position = 'absolute';
    message.style.left = 0;
    message.style.right = 0;
    message.style.fontSize = '30px';
    message.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', message);
    var closeError = function () {
      message.classList.add('hidden');
      document.removeEventListener('click', closeError);
    };
    document.addEventListener('click', closeError);
  };

  var getRating = function () {
    wizards.forEach(function (wizard) {
      wizard.rating = 0;
      if (wizard.colorCoat === coatColor) {
        wizard.rating += 2;
      }
      if (wizard.colorEyes === eyesColor) {
        wizard.rating += 1;
      }

    });
  };

  var updateWizards = function () {
    getRating();
    var sortWizards = wizards.sort(function (leftWizard, rightWizard) {

      var leftRating = leftWizard.rating;
      var rightRating = rightWizard.rating;
      if (leftRating < rightRating) {
        return 1;
      }
      if (leftRating > rightRating) {
        return -1;
      }
      return 0;
    });
    window.render(sortWizards);
  };


  window.backend.load(onLoad, onError);

  // изменение цветов магов

  var getRandomElement = function (array) {
    var random = Math.floor(Math.random() * array.length);
    return array[random];
  };

  var onCoatClick = function () {
    var color = getRandomElement(COAT_COLORS);
    wizardCoatElement.style.fill = color;
    coatColorInputElement.value = color;
    coatColor = color;
    window.debounce(updateWizards);
  };

  var onEyesClick = function () {
    var color = getRandomElement(EYES_COLORS);
    wizardEyesElement.style.fill = color;
    eyesColorInputElement.value = color;
    eyesColor = color;
    window.debounce(updateWizards);
  };
  var onFireballClick = function () {
    var color = getRandomElement(FIREBALL_COLORS);
    wizardFireballElement.style.background = color;
    fireballColorInputElement.value = color;
  };

  window.setup = {
    openPopupAction: function () {
      wizardCoatElement.addEventListener('click', onCoatClick);
      wizardEyesElement.addEventListener('click', onEyesClick);
      wizardFireballElement.addEventListener('click', onFireballClick);

    },
    closePopupAction: function () {
      wizardCoatElement.removeEventListener('click', onCoatClick);
      wizardEyesElement.removeEventListener('click', onEyesClick);
      wizardFireballElement.removeEventListener('click', onFireballClick);
    },

    onError: onError

  };
})();
