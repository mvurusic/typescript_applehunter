import { BackgroundHandler } from "./BackgroundHandler";
import { Basket } from "./Basket";
import { AssetLoader } from "../../../AssetLoader";
import { TreesHandler } from "./TreesHandler";
import { Tree } from "./Tree";
import { Apple } from "./Apple";
import { AppleState } from "./Apple";
import * as InputControls from "../../../InputControls";
import * as PIXI from "pixi.js";
import * as EventSystem  from "../../../EventSystem/EventSystem";
import {UIHandler} from "./UIHandler";

export class EventIn_CountUpApple extends EventSystem.EventSystemT0 {};
export class EventIn_StartAutoAppleFalling extends EventSystem.EventSystemT0 {};
export class EventIn_StopAutoAppleFalling extends EventSystem.EventSystemT0 {};
export class EventIn_AppleLandedInBasket extends EventSystem.EventSystemT0 {};
export class EventIn_AppleLandedOnGround extends EventSystem.EventSystemT0 {};

export class MainAppleHunter {
  private static Instance:MainAppleHunter;
  public static EventIn_CountUpApple:EventIn_CountUpApple = new EventIn_CountUpApple();
  public static EventIn_StartAutoAppleFalling:EventIn_StartAutoAppleFalling = new EventIn_StartAutoAppleFalling();
  public static EventIn_StopAutoAppleFalling:EventIn_StopAutoAppleFalling = new EventIn_StopAutoAppleFalling();
  public static EventIn_AppleLandedInBasket:EventIn_AppleLandedInBasket = new EventIn_AppleLandedInBasket();
  public static EventIn_AppleLandedOnGround:EventIn_AppleLandedOnGround = new EventIn_AppleLandedOnGround();
  
  public static get VarOut_DisplayDebugElements(): boolean { return false; }

  private background:BackgroundHandler = new BackgroundHandler();
  private basket: Basket = new Basket();
  private treesHandler: TreesHandler = new TreesHandler();
  private uiHandler: UIHandler = new UIHandler();
  private areApplesFalling:boolean = false;
  
  public Init() {
    MainAppleHunter.Instance = this;
    MainAppleHunter.EventIn_CountUpApple.AddListener(this, this.CountUpApple);
    MainAppleHunter.EventIn_StartAutoAppleFalling.AddListener(this, this.StartAutoAppleFalling);
    MainAppleHunter.EventIn_StopAutoAppleFalling.AddListener(this, this.StopAutoAppleFalling);
    MainAppleHunter.EventIn_AppleLandedInBasket.AddListener(this, this.AppleLandedInBasket);
    MainAppleHunter.EventIn_AppleLandedOnGround.AddListener(this, this.AppleLandedOnGround);
    

    this.background.Init();
    this.basket.Init();
    this.treesHandler.Init();
    this.uiHandler.Init();

    InputControls.InputControls.EventOut_OnKeyDown.AddListener(this, this.OnButtonPressed);
    InputControls.InputControls.EventOut_OnKeyUp.AddListener(this, this.OnButtonReleased);
    
    console.log("APPLE HUNTER READY!");
    AssetLoader.EventIn_LoadAssetsFromList.Invoke();
  }

  private StartAutoAppleFalling():void {
    this.areApplesFalling = true;
  }
  private StopAutoAppleFalling():void {
    this.areApplesFalling = false;
  }

  private AppleLandedInBasket():void {

  }
  private AppleLandedOnGround():void {

  }

  private OnButtonPressed(keyCode:InputControls.keyCode):void {
    // console.log("KEY CODE PRESSED: " + keyCode);
    if(keyCode === 97) {
      this.StartWobbleRandomApple(this.treesHandler.VarOut_GetTree(0));
    }
    if(keyCode === 98) {
      this.StartWobbleRandomApple(this.treesHandler.VarOut_GetTree(1));
    }
    if(keyCode === 99) {
      this.StartWobbleRandomApple(this.treesHandler.VarOut_GetTree(2));
    }
    if(keyCode === 37) {
      this.basket.EventIn_StartMovingLeft.Invoke();
    }
    if(keyCode === 39) {
      this.basket.EventIn_StartMovingRight.Invoke();
    }
  }

  private OnButtonReleased(keyCode:InputControls.keyCode):void {
    if(keyCode === 37) {
      this.basket.EventIn_StoppedMovingLeft.Invoke();
    }
    if(keyCode === 39) {
      this.basket.EventIn_StoppedMovingRight.Invoke();
    }
  }

  private StartWobbleRandomApple(tree:Tree|undefined) {
    if(tree !== undefined) {
      let apple:Apple = tree.VarOut_GetRandomFallableApple();
      apple.EventIn_SetAppleState.Invoke(AppleState.Wobble);
    }
  }

  public static VarOut_CheckAppleBasketCollision(rectApple:PIXI.Rectangle) : boolean {
    let boxBasket = MainAppleHunter.Instance.basket.VarOut_GetBounds();

    return boxBasket.x + boxBasket.width > rectApple.x &&
      boxBasket.x < rectApple.x + rectApple.width &&
      boxBasket.y + boxBasket.height > rectApple.y &&
      boxBasket.y < rectApple.y + rectApple.height;
  }

  private CountUpApple():void {
    this.basket.EventIn_CountUpApple.Invoke();
  }

  
}
