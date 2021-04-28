// import { TMEmendoBaseJS /*.GamesHandler*/ } from "./GamesHandler";
// /// <reference path="./GamesHandler.ts" />

import { GamesHandler } from "./GamesHandler";

// export{};
// const test = new TMEmendoBaseJS.GamesHandler()
let canvas:HTMLElement | null = document.getElementById("gamecanvas");
let gamesHandler = new GamesHandler(canvas);



// canvas.strokeRect(5, 5, 25, 15);
// canvas.scale(2, 2);
// canvas.strokeRect(5, 5, 25, 15);

// import * as PIXI from "pixi.js";

// export module TMEmendoBaseJS {

//   export class index {
//     constructor() {

// canvasSize = 256;
// const canvas = document.getElementById("gamecanvas");
// const app = new PIXI.Application({
//   view: canvas,
//   width: canvasSize,
//   height: canvasSize,
//   backgroundColor: 0x5c812f
// });

// let squareWidth = 32;
// const square = new PIXI.Sprite(PIXI.Texture.WHITE);
// square.anchor.set(0.5);
// square.position.set(app.screen.width / 2, app.screen.height / 2);
// square.width = square.height = squareWidth;
// square.tint = 0xea985d;

// app.stage.addChild(square);
//     }
//   }
// }
