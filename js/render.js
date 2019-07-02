'use strict';
(function () {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var similarListElement = document.querySelector('.setup-similar-list');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').setAttribute('style', 'fill:' + wizard.colorCoat);
    wizardElement.querySelector('.wizard-eyes').setAttribute('style', 'fill:' + wizard.colorEyes);

    return wizardElement;
  };

  window.render = function (data) {
    var fragment = document.createDocumentFragment();
    var wizardsQuantity = data.length > 4 ? 4 : data.length;
    similarListElement.innerHTML = '';
    for (var i = 0; i < wizardsQuantity; i++) {
      fragment.appendChild(renderWizard(data[i]));
    }
    document.querySelector('.setup-similar').classList.remove('hidden');
    similarListElement.appendChild(fragment);
  };

})();
