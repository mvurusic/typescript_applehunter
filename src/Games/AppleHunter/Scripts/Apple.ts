import * as PIXI from "pixi.js";
import * as TWEEN from "@tweenjs/tween.js";

import {GamesHandler} from "../../../GamesHandler";
import {MainAppleHunter} from "./MainAppleHunter";
import {TreesHandler} from "./TreesHandler";
import { Texture } from "pixi.js";
import { EventSystemT1 } from "../../../EventSystem/EventSystem";
import { Basket } from "./Basket";

export enum AppleState {
  Growing = 0,
  Idle = 1,
  Wobble = 2,
  Fall = 3,
  Broken = 4
}

export class EventIn_SetAppleState extends EventSystemT1<AppleState> {}

export class Apple {

  public EventIn_SetAppleState:EventIn_SetAppleState = new EventIn_SetAppleState();

  private startingPointX:number = 0;
  private startingPointY:number = 0;
  private spriteAppleHolder:PIXI.Sprite = new PIXI.Sprite();
  private spriteApple:PIXI.Sprite = new PIXI.Sprite();
  private index:number = 0;
  public VarOut_AppleState: AppleState = AppleState.Growing;
  private appleScaling:number = 0.6;
  private wobbleRotation:number = 45;
  private tween = new TWEEN.Tween<{}>({});
  private fallingSpeed:number = 1;

  public constructor(index:number, posX:number, posY:number, parent:PIXI.Sprite) {
    this.EventIn_SetAppleState.AddListener(this, this.SetAppleState);

    GamesHandler.EventIn_RunTweenerFor.Invoke("apple_" + index, true);
    this.startingPointX = posX;
    this.startingPointY = posY;
    this.index = index;

    // debug holder
    let graphicsCircleHolder:PIXI.Graphics = new PIXI.Graphics();
    graphicsCircleHolder.beginFill(0x333333);
    graphicsCircleHolder.lineStyle(1);
    graphicsCircleHolder.drawCircle(0, 0, 4);
    graphicsCircleHolder.alpha = 0.7;
    graphicsCircleHolder.endFill();
    graphicsCircleHolder.visible = MainAppleHunter.VarOut_DisplayDebugElements;
    let textureCircleHolder = GamesHandler.VarOut_GetPIXIRenderer.generateTexture(graphicsCircleHolder);
    this.spriteAppleHolder = new PIXI.Sprite(textureCircleHolder);
    this.spriteAppleHolder.setParent(parent);
    this.spriteAppleHolder.x = this.startingPointX;
    this.spriteAppleHolder.y = this.startingPointY;
    this.spriteAppleHolder.scale.x = 1;
    this.spriteAppleHolder.scale.y = 1;
    this.spriteAppleHolder.anchor.set(0.5, 0.5);
    this.spriteAppleHolder.zIndex = 0;

    // apple texture
    let textureApple;
    
    if(MainAppleHunter.VarOut_DisplayDebugElements) {
      let graphicsCircleApple:PIXI.Graphics = new PIXI.Graphics();
      graphicsCircleApple.beginFill(0xFF0000);
      graphicsCircleApple.lineStyle(1);
      graphicsCircleApple.drawCircle(0, 0, 20);
      graphicsCircleApple.alpha = 0.2;
      graphicsCircleApple.endFill();
      graphicsCircleApple.visible = MainAppleHunter.VarOut_DisplayDebugElements;
      textureApple = GamesHandler.VarOut_GetPIXIRenderer.generateTexture(graphicsCircleApple);
      this.spriteApple = new PIXI.Sprite(textureApple);
      this.spriteApple.x = 0;
      this.spriteApple.y = 20;
      this.spriteApple.scale.x = 1;
      this.spriteApple.scale.y = 1;
    }
    else {
      textureApple = TreesHandler.VarOut_GetAppleTexture("apple_green");
      this.spriteApple = new PIXI.Sprite(textureApple);
      this.spriteApple.x = 5;
      this.spriteApple.y = 27;
      this.spriteApple.scale.x = this.appleScaling;
      this.spriteApple.scale.y = this.appleScaling;
    }
    this.spriteApple.setParent(this.spriteAppleHolder);
    this.spriteApple.anchor.set(0.5, 0.5);
    this.spriteApple.zIndex = 0;

    if(MainAppleHunter.VarOut_DisplayDebugElements) {
      // debug text
      let style = new PIXI.TextStyle({ fontFamily : 'Arial', fontSize: 24, fill : 0x1010ff, align : 'center' });
      let text = new PIXI.Text(index.toString(), style);
      text.anchor.set(0.5, 0.5);
      text.position.set(0, 20);
      text.setParent(this.spriteAppleHolder);
    }

    // // tween test
    // GamesHandler.EventIn_RunTweenerFor.Invoke("apple_" + index, true);
    // // const coords = {x: 0, y: 0} // Start at (0, 0)
    // let position = { x: this.spriteAppleHolder.x, y: this.spriteAppleHolder.y, rotation: -45 };
    // const tween = new TWEEN.Tween(position) // Create a new tween that modifies 'coords'.
    //   .to({x: this.spriteAppleHolder.x, y: this.spriteAppleHolder.y, rotation:45/*(Math.PI/180)*45*/}, 500) // Move to (300, 200) in 1 second.
    //   .easing(TWEEN.Easing.Quadratic.InOut) // Use an easing function to make the animation smooth.
    //   .yoyo(true)
    //   .repeat(Infinity)
    //   .onUpdate(() => {
    //     this.spriteAppleHolder.angle = position.rotation;//.setProperty('transform', `translate(${coords.x}px, ${coords.y}px)`)
    // });
    // tween.start() // Start the tween immediately.
    // //console.log("TWEEN STARTED!");

    this.SetAppleState(AppleState.Growing);
  }

  private SetAppleState(appleState:AppleState):void {
    this.tween.stop();
    this.VarOut_AppleState = appleState;
    this.spriteAppleHolder.angle = 0;
    // this.spriteApple.scale.set(this.appleScaling, this.appleScaling);
    this.spriteApple.zIndex = 0;
    this.spriteAppleHolder.zIndex = 0;
    switch(this.VarOut_AppleState) {
      case AppleState.Growing: this.SetStateGrow(); break;
      case AppleState.Idle: this.SetStateIdle(); break;
      case AppleState.Wobble: this.SetStateWobble(); break;
      case AppleState.Fall: this.SetStateFall(); break;
      case AppleState.Broken: this.SetStateBroken(); break;
    }
  }

  private SetStateGrow():void {
    this.VarOut_AppleState = AppleState.Growing;
    this.spriteAppleHolder.position.set(this.startingPointX, this.startingPointY);
    let texture = TreesHandler.VarOut_GetAppleTexture("apple_green");
    if(texture !== undefined){
      this.spriteApple.texture = texture;
    }
    this.appleScaling = 0.45 + (Math.random()*0.2);
    let scale = { scale: 0 };
    let randGrowSpeed:number = (Math.random()*1000)+500;
    this.tween = new TWEEN.Tween(scale)
      .to({scale: this.appleScaling}, randGrowSpeed)
      .easing(TWEEN.Easing.Quadratic.In)
      .yoyo(false)
      .repeat(0)
      .onComplete(() => this.SetAppleState(AppleState.Idle))
      .onUpdate(() => {
        this.spriteApple.scale.set(scale.scale, scale.scale);
    });
    this.tween.start();
    console.log("GROWING AGAIN!");
  }

  private SetStateIdle():void {
    this.VarOut_AppleState = AppleState.Idle;
    let texture = TreesHandler.VarOut_GetAppleTexture("apple_green");
    if(texture !== undefined){
      this.spriteApple.texture = texture;
    }
    let randRot:number = Math.random()*20;
    randRot -= (randRot*0.5);
    let randSpeed:number = (Math.random()*1000)+1000;
    let idleRot = { rot: randRot};
    this.tween = new TWEEN.Tween(idleRot)
      .to({rot: -randRot}, randSpeed)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .yoyo(true)
      .repeat(Infinity)
      .onUpdate(() => {
        this.spriteAppleHolder.angle = idleRot.rot;
    });
    this.tween.start();
  }

  private SetStateWobble():void {
    this.VarOut_AppleState = AppleState.Wobble;
    let texture = TreesHandler.VarOut_GetAppleTexture("apple_yellow");
    if(texture !== undefined){
      this.spriteApple.texture = texture;
    }
    let wobbleRot = { rot: this.wobbleRotation};
    this.tween = new TWEEN.Tween(wobbleRot)
      .to({rot: -this.wobbleRotation}, 500)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .yoyo(true)
      .repeat(3)
      .onComplete(() => this.SetAppleState(AppleState.Fall))
      .onUpdate(() => {
        this.spriteAppleHolder.angle = wobbleRot.rot;
    });
    this.tween.start();
  }

  private SetStateFall():void {
    this.VarOut_AppleState = AppleState.Fall;
    this.spriteApple.zIndex = 1;
    this.spriteAppleHolder.zIndex = 1;
    let texture = TreesHandler.VarOut_GetAppleTexture("apple_red");
    if(texture !== undefined){
      this.spriteApple.texture = texture;
    }
    GamesHandler.EventOut_OnUpdate.AddListener(this, this.OnUpdateFall);
    
    // let position = { posY: this.spriteAppleHolder.position.y };
    // this.tween = new TWEEN.Tween(position)
    //   .to({posY: -this.wobbleRotation}, 500)
    //   .easing(TWEEN.Easing.Quadratic.Linear)
    //   .yoyo(false)
    //   .repeat(0)
    //   .onComplete(() => this.SetState(AppleState.Broken))
    //   .onUpdate(() => {
    //     this.spriteAppleHolder.position.y = position.posY;
    // });
  }
  private OnUpdateFall(deltaTime:number):void {
    this.spriteAppleHolder.position.y += this.fallingSpeed * deltaTime;
    //this.spriteAppleHolder.hitArea.contains()
    if(this.spriteAppleHolder.position.y > 320) {
      if(MainAppleHunter.VarOut_CheckAppleBasketCollision(this.spriteAppleHolder.getBounds())){
        console.log("COOLLISIONNEEEEE!!!");
        GamesHandler.EventOut_OnUpdate.RemoveListener(this, this.OnUpdateFall);
        this.SetAppleState(AppleState.Growing);
        MainAppleHunter.EventIn_CountUpApple.Invoke();   
      }
      //Basket.EventIn_CheckAppleCollision(this.spriteAppleHolder.position);
    }
    if(this.spriteAppleHolder.position.y > 370) {
      console.log("BOOM APPLE!");
     GamesHandler.EventOut_OnUpdate.RemoveListener(this, this.OnUpdateFall);
     this.SetStateBroken();
    }
  }

  private SetStateBroken():void {
    this.VarOut_AppleState = AppleState.Broken;
    let texture = TreesHandler.VarOut_GetAppleTexture("apple_broken");
    if(texture !== undefined){
      this.spriteApple.texture = texture;
    }
    // console.log("PIVOT: " + this.spriteAppleHolder.pivot + " " + this.spriteAppleHolder.anchor);
    // let originalPivotY:number = this.spriteApple.anchor.y;
    // //this.spriteApple.pivot.set(this.spriteApple.pivot.x, 1);
    // this.spriteApple.anchor.set(this.spriteApple.anchor.x, 1);
    // this.spriteApple.position.set(this.spriteApple.position.x, )
    
    let scale = { scaleY: this.appleScaling, posY: this.spriteAppleHolder.position.y};
    this.tween = new TWEEN.Tween(scale)
      .to({scaleY: 0, posY: this.spriteAppleHolder.position.y+40}, 2000)
      .delay(2000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .yoyo(false)
      .repeat(0)
      .onComplete(() => {
        // this.spriteApple.anchor.set(this.spriteApple.anchor.x, originalPivotY);
        this.tween.stop();
        this.SetAppleState(AppleState.Growing);
      })
      .onUpdate(() => {
        this.spriteApple.scale.set(this.appleScaling, scale.scaleY);
        this.spriteAppleHolder.position.set(this.spriteAppleHolder.position.x, scale.posY);
    });
    this.tween.start();
  }

  // public Init(position:Pos | undefined) {
  //    this.posX = position?.x || 0;
  //    this.posY = position?.y || 0;
  //   //  this.spriteApple.x = this.posX;
  //   //  this.spriteApple.y = this.posY;
  //   console.log("POSITION: " + this.posX + " " + this.posY);
  //   this.spriteApple.position.set(this.posX, this.posY);
  // }
}