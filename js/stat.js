'use strict';
let cloudWidth = 420;
let cloudHeight = 270;
let CLOUD_X = 100;
let CLOUD_Y = 10;
let gap = 10;
let gapBar = 50;
let fontGap = 18;
let greetingX = 120;
let greetingY = 30;
let textHeight = 16;
let barHeight = 150;
let barWidth = 40;

let renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, cloudWidth, cloudHeight);
};

/*
let getMaxElement = function (arr) {
  let maxElement = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
};
*/
window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + gap, CLOUD_Y + gap, `rgba(0, 0, 0, 0.7)`);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, `#fff`);

  ctx.fillStyle = `#000`;
  ctx.font = `16px PT Mono`;
  ctx.textBaseline = `hanging`;
  ctx.fillText(`Ура вы победили!`, greetingX, greetingY);
  ctx.fillText(`Список результатов:`, greetingX, greetingY + fontGap);

  // let maxTime = getMaxElement(times);

  for (let i = 0; i < players.length; i++) {
    // рисует score
    ctx.fillStyle = `#000`;
    ctx.fillText(
      (times[i]).toFixed(0),
      (CLOUD_X + gap * 4) + (barWidth + gapBar) * i,
      cloudHeight - gap * 4 - barHeight
    );

    // меняет цвет bar
    if (players[i] === `Вы`) {
      ctx.fillStyle = `rgba(255, 0, 0, 1)`;
    } else {
      let saturation = Math.round(Math.random() * 100);
      ctx.fillStyle = `hsl(240, ` + saturation + `%, 50%)`;
    }
    // рисует bar
    ctx.fillRect(
      (CLOUD_X + gap * 4) + (barWidth + gapBar) * i,
      cloudHeight - gap * 2 - barHeight,
      barWidth,
      barHeight // когда меняю эту строчку на формулу (barHeight * times[i]) / maxTime + расскомметирую строки 22-30, 42 bar не отображается
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
