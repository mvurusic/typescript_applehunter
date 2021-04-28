import * as Collections from "../../../Collections";
import { Apple } from "./Apple";
import { AppleState } from "./Apple";
import { MainAppleHunter } from "./MainAppleHunter";
import * as PIXI from "pixi.js";
import {GamesHandler} from "../../../GamesHandler";
import {Pos} from "./TreesHandler";
import {RandomArray} from "../../../Tools/RandomArray"

export class Tree {
  private apples:Collections.LinkedList<Apple> = new Collections.LinkedList<Apple>();

  private posX:number = 0;
  private posY:number = 0;
  private spriteCircle:PIXI.Sprite = new PIXI.Sprite();
  private sortingTree: number = 6;
  private applePositions:Collections.LinkedList<Pos> = new Collections.LinkedList<Pos>();

  public constructor(posX:number, posY:number, applePositions:Collections.LinkedList<Pos>) {
    this.posX = posX;
    this.posY = posY;
    this.applePositions = applePositions;

    let graphicsCircle:PIXI.Graphics = new PIXI.Graphics();
    graphicsCircle.beginFill(0xFFFFFF);
    graphicsCircle.lineStyle(10);
    graphicsCircle.drawCircle(0, 0, 150);
    graphicsCircle.alpha = 0.2;
    graphicsCircle.endFill();
    graphicsCircle.visible = MainAppleHunter.VarOut_DisplayDebugElements;
    let textureCircle = GamesHandler.VarOut_GetPIXIRenderer.generateTexture(graphicsCircle);
    this.spriteCircle = new PIXI.Sprite(textureCircle);
    this.spriteCircle.x = this.posX;
    this.spriteCircle.y = this.posY;
    this.spriteCircle.scale.x = 1;
    this.spriteCircle.scale.y = 1;
    this.spriteCircle.anchor.set(0.5, 0.5);
    this.spriteCircle.zIndex = this.sortingTree;
    GamesHandler.EventIn_SetChildOnStage.Invoke(this.spriteCircle);

    this.apples.clear();
    for(let i:number = 0; i < this.applePositions.size(); i++) {
      this.apples.add(new Apple(//0, 0, this.spriteCircle));
        i,  
        this.applePositions.elementAtIndex(i)?.x || 0,
        this.applePositions.elementAtIndex(i)?.y || 0,
        this.spriteCircle));
    }
  }

  private lastPickedApple : Apple | undefined = undefined;
  public VarOut_GetRandomFallableApple() : Apple {

    let applesColl:Collections.LinkedList<Apple> = new Collections.LinkedList<Apple>();
    for(let i = 0; i < this.apples.size(); i++) {
      let a:Apple | undefined = this.apples.elementAtIndex(i);
      if((a?.VarOut_AppleState === AppleState.Idle) ||
      (a?.VarOut_AppleState === AppleState.Growing)) {
        applesColl.add(a);
      }
    }

    let apples:Apple[] = applesColl.toArray();
    this.lastPickedApple = RandomArray.RandomSingle(apples);
    if(this.lastPickedApple !== undefined) {
      return this.lastPickedApple;
    }
    return apples[0];
  }
}
