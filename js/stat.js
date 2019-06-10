'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP_CLOUD = 10;
var GAP_TITLE = 20;
var GAP = 50;
var BAR_WIDTH = 40;
var FONT_GAP = 16;
var barHeight = -(CLOUD_HEIGHT - (CLOUD_Y + GAP_TITLE * 2 + FONT_GAP) - GAP - FONT_GAP * 2);

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var getColor = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP_CLOUD, CLOUD_Y + GAP_CLOUD, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP / 2, CLOUD_Y + GAP_TITLE + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP / 2, CLOUD_Y + GAP_TITLE * 2 + FONT_GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, CLOUD_HEIGHT + CLOUD_Y - GAP / 2);
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, CLOUD_HEIGHT + CLOUD_Y - GAP / 2 - FONT_GAP + (barHeight * times[i]) / maxTime - FONT_GAP / 2);
    ctx.fillStyle = names[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0,' + getColor(0, 255) + ', 1)';
    // ctx.fillStyle = 'rgba(0, 0,' + (names[i] === 'Вы' ? '0' : getRandomInt(0, 255)) + ', 1)';
    ctx.fillRect(CLOUD_X + GAP + (BAR_WIDTH + GAP) * i, CLOUD_HEIGHT + CLOUD_Y - GAP / 2 - FONT_GAP, BAR_WIDTH, (barHeight * times[i]) / maxTime);
  }
};
