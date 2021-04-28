import * as EventSystem  from "../../../EventSystem/EventSystem";
import {Dictionary} from "../../../MyCollections/Dictionary";
import * as PIXI from "pixi.js";
import {AssetLoader} from "../../../AssetLoader";
import {GamesHandler} from "../../../GamesHandler";
import { MainAppleHunter } from "./MainAppleHunter";

export class EventIn_StartMovingLeft extends EventSystem.EventSystemT0 {};
export class EventIn_StartMovingRight extends EventSystem.EventSystemT0 {};
export class EventIn_StoppedMovingLeft extends EventSystem.EventSystemT0 {};
export class EventIn_StoppedMovingRight extends EventSystem.EventSystemT0 {};
export class EventIn_SetPositionPercent extends EventSystem.EventSystemT1<number> {}
export class EventIn_CountUpApple extends EventSystem.EventSystemT0 {};


interface KeyValuePathID { key: string; value: string; }
export class Basket {
  public EventIn_StartMovingLeft:EventIn_StartMovingLeft = new EventIn_StartMovingLeft();
  public EventIn_StartMovingRight:EventIn_StartMovingRight = new EventIn_StartMovingRight();
  public EventIn_StoppedMovingLeft:EventIn_StoppedMovingLeft = new EventIn_StoppedMovingLeft();
  public EventIn_StoppedMovingRight:EventIn_StoppedMovingRight = new EventIn_StoppedMovingRight();
  public EventIn_SetPositionPercent:EventIn_SetPositionPercent = new EventIn_SetPositionPercent();
  public EventIn_CountUpApple:EventIn_CountUpApple = new EventIn_CountUpApple();
  
  private static readonly keyMainBasketBG:string = "main_basket_bg";
  private static readonly pathMainBasketBG:KeyValuePathID = { key:Basket.keyMainBasketBG, value:"./src/Games/AppleHunter/Images/player/basket 500x200.png" };
  
  private paths: Dictionary<string> = new Dictionary<string>();
  private sprites: Dictionary<PIXI.Sprite> = new Dictionary<PIXI.Sprite>();
  private rootBasket: PIXI.Sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
  private sortingRootBasket: number = 5;
  private isUpdating: boolean = false;
  private moveLeft:boolean = false;
  private moveRight:boolean = false;
  private offsetPercentLeft:number = 0.1;
  private offsetPercentRight:number = 0.1;
  private currentPercentPosition: number = 0;
  private startPos:number = 0;
  private endPos:number = 0;
  private distance:number = 0;
  private collectedAppleCount:number = 0;

  private txtCounter:PIXI.Text = new PIXI.Text("0");

  public Init() {
    this.EventIn_StartMovingLeft.AddListener(this, this.StartedMovingLeft);
    this.EventIn_StartMovingRight.AddListener(this, this.StartedMovingRight);
    this.EventIn_StoppedMovingLeft.AddListener(this, this.StoppedMovingLeft);
    this.EventIn_StoppedMovingRight.AddListener(this, this.StoppedMovingRight);
    this.EventIn_SetPositionPercent.AddListener(this, this.SetPositionPercent);
    this.EventIn_CountUpApple.AddListener(this, this.CountUpApple);

    this.paths.Clear();
    this.paths.Add(Basket.pathMainBasketBG.key, Basket.pathMainBasketBG.value);
    this.sprites.Clear();
    this.sprites.Add(Basket.pathMainBasketBG.key, new PIXI.Sprite(PIXI.Texture.WHITE));
    
    for(let i = 0; i < this.paths.Count(); i++) {
      let key:string = this.paths.Keys()[i];
      let value:string = this.paths.GetValue(key);
      AssetLoader.EventIn_AddAssetToLoadingList.Invoke(key, value);
    }
    AssetLoader.EventOut_AssetsLoadingCompleted.AddListener(this, this.AssetsLoadingCompleted);

    // set root basket position
    this.rootBasket.x = GamesHandler.VarOut_CanvasElementSize.x*0.5;
    this.rootBasket.y = GamesHandler.VarOut_CanvasElementSize.y*0.9;
    this.rootBasket.scale.x = 2;
    this.rootBasket.sortableChildren = true;
    this.rootBasket.zIndex = this.sortingRootBasket;
    GamesHandler.EventIn_SetChildOnStage.Invoke(this.rootBasket);

    // TODO: put that in a function like SetLevel().
    this.startPos = GamesHandler.VarOut_CanvasElementSize.x*(this.offsetPercentLeft);
    this.endPos = GamesHandler.VarOut_CanvasElementSize.x*(1-this.offsetPercentRight);
    this.distance = this.endPos-this.startPos;
    this.currentPercentPosition = 0.5;
    this.SetPositionPercent(0.5);

    // apple counter
    let style = new PIXI.TextStyle({ fontFamily : 'Arial', fontSize: 24, fill : 0x111111, align : 'center' });
    this.txtCounter = new PIXI.Text("0", style);
    this.txtCounter.anchor.set(0.5, 1);
    this.txtCounter.position.set(0, 20);
    this.txtCounter.scale.set(1, 2);
    this.txtCounter.setParent(this.rootBasket);
    this.txtCounter.zIndex = 1;
    this.collectedAppleCount = 0;
  }

  private AssetsLoadingCompleted():void {
    this.DisplayMainBasketBG();
  }

  private DisplayMainBasketBG():void {
    let key:string = Basket.keyMainBasketBG;
    let texture = PIXI.Loader.shared.resources[key].texture;
    let sprite: PIXI.Sprite = new PIXI.Sprite(texture);
    sprite.anchor.set(0.5, 0.5);
    sprite.x = 0;
    sprite.y = 0;
    sprite.width = GamesHandler.VarOut_CanvasElementSize.x*0.1;
    sprite.height = GamesHandler.VarOut_CanvasElementSize.y*0.1;
    this.rootBasket.addChild(sprite);
    this.sprites.Add(Basket.keyMainBasketBG, sprite);
  }

  private StartedMovingLeft():void {
    if(!this.isUpdating) {
      GamesHandler.EventOut_OnUpdate.AddListener(this, this.OnUpdate);
      this.isUpdating = true;
    }
    this.moveLeft = true;
    // console.log("STARTED MOVING LEFT!");
  }
  private StartedMovingRight():void {
    if(!this.isUpdating) {
      GamesHandler.EventOut_OnUpdate.AddListener(this, this.OnUpdate);
      this.isUpdating = true;
    }
    this.moveRight = true;
  }
  private StoppedMovingLeft():void {
    this.moveLeft = false;
    // console.log("STOPPED MOVING LEFT!");
  }
  private StoppedMovingRight():void {
    this.moveRight = false;
  }

  private OnUpdate(delta: number):void {
    if(this.moveLeft || this.moveRight) {
      if(this.moveLeft) {

        let value:number = Math.max((-0.01*delta)+this.currentPercentPosition, 0);
        this.currentPercentPosition = value;
        this.SetPositionPercent(value);
      }
      if(this.moveRight) {
        let value:number = Math.min((0.01*delta)+this.currentPercentPosition, 1);
        //console.log("VALUE: " + value);
        this.currentPercentPosition = value;
        this.SetPositionPercent(value);
      }
      //console.log("BOUNDS: " + this.rootBasket.getBounds());
    }
    else {
      //GamesHandler.EventOut_OnUpdate.RemoveListener(this, this.OnUpdate);
      //this.isUpdating = false;
    }
  }

  private SetPositionPercent(percent:number): void {
    
    this.rootBasket.position.set(this.startPos + (this.distance*percent), this.rootBasket.position.y);
  }

  public VarOut_GetBounds():PIXI.Rectangle {
    return this.rootBasket.getBounds();
  }

  private CountUpApple():void {
    this.collectedAppleCount++;
    this.txtCounter.text = this.collectedAppleCount.toString();
  }

  // let style = new TextStyle({
  //   fontFamily: "Arial",
  //   fontSize: 36,
  //   fill: "white",
  //   stroke: '#ff3300',
  //   strokeThickness: 4,
  //   dropShadow: true,
  //   dropShadowColor: "#000000",
  //   dropShadowBlur: 4,
  //   dropShadowAngle: Math.PI / 6,
  //   dropShadowDistance: 6,
  // });
}
