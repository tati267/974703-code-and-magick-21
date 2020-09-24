'use strict';
const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const GAP = 10;
const GAP_BAR = 50;
const FONT_GAP = 18;
const GREETING_X = 120;
const GREETING_Y = 30;
const MAX_BAR_HEIGHT = 150;
const BAR_WIDTH = 40;

const renderCloud = (ctx, x, y, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};
const getMaxElement = (arr) => {
  let maxElement = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = (ctx, players, times) => {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, `rgba(0, 0, 0, 0.7)`);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, `#fff`);

  ctx.fillStyle = `#000`;
  ctx.font = `16px PT Mono`;
  ctx.textBaseline = `hanging`;
  ctx.fillText(`Ура вы победили!`, GREETING_X, GREETING_Y);
  ctx.fillText(`Список результатов:`, GREETING_X, GREETING_Y + FONT_GAP);

  let maxTime = getMaxElement(times);

  for (let i = 0; i < players.length; i++) {
    // рисует score
    ctx.fillStyle = `#000`;
    ctx.fillText(
        (times[i]).toFixed(0),
        (CLOUD_X + GAP * 4) + (BAR_WIDTH + GAP_BAR) * i,
        CLOUD_HEIGHT - GAP * 4 - (MAX_BAR_HEIGHT * times[i]) / maxTime
    );

    // меняет цвет bar
    if (players[i] === `Вы`) {
      ctx.fillStyle = `rgba(255, 0, 0, 1)`;
    } else {
      const saturation = Math.round(Math.random() * 100);
      ctx.fillStyle = `hsl(240, ${saturation}%, 50%)`;
    }
    // рисует bar
    ctx.fillRect(
        (CLOUD_X + GAP * 4) + (BAR_WIDTH + GAP_BAR) * i,
        CLOUD_HEIGHT - GAP * 2 - (MAX_BAR_HEIGHT * times[i]) / maxTime,
        BAR_WIDTH,
        (MAX_BAR_HEIGHT * times[i]) / maxTime
    );

    // рисует имя игрока
    ctx.fillStyle = `#000`;
    ctx.fillText(
        players[i],
        (CLOUD_X + GAP * 4) + (BAR_WIDTH + GAP_BAR) * i,
        CLOUD_HEIGHT - GAP
    );
  }
};
