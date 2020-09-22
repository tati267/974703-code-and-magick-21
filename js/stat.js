'use strict';
const cloudWidth = 420;
const cloudHeight = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const gap = 10;
const gapBar = 50;
const fontGap = 18;
const greetingX = 120;
const greetingY = 30;
const textHeight = 16;
const maxBarHeight = 150;
const barWidth = 40;

let renderCloud = (ctx, x, y, color) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, cloudWidth, cloudHeight);
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

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + gap, CLOUD_Y + gap, `rgba(0, 0, 0, 0.7)`);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, `#fff`);

  ctx.fillStyle = `#000`;
  ctx.font = `16px PT Mono`;
  ctx.textBaseline = `hanging`;
  ctx.fillText(`Ура вы победили!`, greetingX, greetingY);
  ctx.fillText(`Список результатов:`, greetingX, greetingY + fontGap);

  let maxTime = getMaxElement(times);

  for (let i = 0; i < players.length; i++) {
    // рисует score
    ctx.fillStyle = `#000`;
    ctx.fillText(
      (times[i]).toFixed(0),
      (CLOUD_X + gap * 4) + (barWidth + gapBar) * i,
      cloudHeight - gap * 4 - (maxBarHeight * times[i]) / maxTime
    );

    // меняет цвет bar
    if (players[i] === `Вы`) {
      ctx.fillStyle = `rgba(255, 0, 0, 1)`;
    } else {
      const saturation = Math.round(Math.random() * 100);
      ctx.fillStyle = `hsl(240, ` + saturation + `%, 50%)`;
    }
    // рисует bar
    ctx.fillRect(
      (CLOUD_X + gap * 4) + (barWidth + gapBar) * i,
      cloudHeight - gap * 2 - (maxBarHeight * times[i]) / maxTime,
      barWidth,
      (maxBarHeight * times[i]) / maxTime // когда меняю эту строчку на формулу (barHeight * times[i]) / maxTime + расскомметирую строки 22-30, 42 bar не отображается
    );

    // рисует имя игрока
    ctx.fillStyle = `#000`;
    ctx.fillText(
      players[i],
      (CLOUD_X + gap * 4) + (barWidth + gapBar) * i,
      cloudHeight - gap
    );
  }
};
