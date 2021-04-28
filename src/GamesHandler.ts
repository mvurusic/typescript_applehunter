import * as PIXI from "pixi.js";
// import * as Charm from "charm";
import * as TWEEN from "@tweenjs/tween.js";
import { MainAppleHunter } from "./Games/AppleHunter/Scripts/MainAppleHunter";
import * as EventSystem from "./EventSystem/EventSystem";
import { AssetLoader } from "./AssetLoader";
import * as Collections from "./Collections";
import { InputControls } from "./InputControls";

export class EventOut_OnUpdate extends EventSystem.EventSystemT1<number> {}
export class EventIn_SetChildOnStage extends EventSystem.EventSystemT1<PIXI.Sprite> {}
export class EventIn_RunTweenerFor extends EventSystem.EventSystemT2<string, boolean> {}

export class GamesHandler {
  private static Instance: GamesHandler;
  public static EventOut_OnUpdate: EventOut_OnUpdate = new EventOut_OnUpdate();
  public static EventIn_SetChildOnStage: EventIn_SetChildOnStage = new EventIn_SetChildOnStage();
  public static EventIn_RunTweenerFor: EventIn_RunTweenerFor = new EventIn_RunTweenerFor();

  // PIXI
  private canvasSize: PIXI.Point = new PIXI.Point(1280, 768);
  // private canvasSize: PIXI.Point = new PIXI.Point(1280, 375);
  private canvas: any;
  private app: PIXI.Application;
  // tweener
  private objectsRequireTween: Collections.LinkedList<string> = new Collections.LinkedList<string>();
  // components
  private assetLoader: AssetLoader = new AssetLoader();
  private inputControls: InputControls = new InputControls();
  // games
  private mainAppleHunter: MainAppleHunter = new MainAppleHunter();

  public constructor(canvas: HTMLElement | null) {
    GamesHandler.Instance = this;
    this.canvas = canvas;
    GamesHandler.EventIn_SetChildOnStage.AddListener(
      this,
      this.SetChildOnStage
    );
    GamesHandler.EventIn_RunTweenerFor.AddListener(this, this.RunTweenFor);

    this.app = new PIXI.Application({
      view: this.canvas,
      width: this.canvasSize.x,
      height: this.canvasSize.y,
      backgroundColor: 0x5c812f
    });
    PIXI.settings.SORTABLE_CHILDREN = true;
    this.app.ticker.add((delta) => this.onUpdate(delta));

    // init components
    this.assetLoader.Init();
    this.inputControls.Init();

    // start game
    this.StartGame();
  }

  private StartGame() {
    this.mainAppleHunter.Init();
  }

  private SetChildOnStage(sprite: PIXI.Sprite): void {
    GamesHandler.Instance.app.stage.addChild(sprite);
    GamesHandler.Instance.app.stage.sortChildren();
  }

  private RunTweenFor(objectName: string, runIt: boolean): void {
    if (runIt) {
      this.objectsRequireTween.add(objectName);
    } else {
      for (let i = 0; i < this.objectsRequireTween.size(); i++) {
        if (this.objectsRequireTween.elementAtIndex(i) === objectName) {
          this.objectsRequireTween.removeElementAtIndex(i);
          return;
        }
      }
    }
  }

  public static get VarOut_CanvasElementSize(): PIXI.Point {
    return GamesHandler.Instance.canvasSize;
  }

  public static get VarOut_GetMainStage(): PIXI.Container {
    return GamesHandler.Instance.app.stage;
  }

  public static get VarOut_GetPIXIRenderer():
    | PIXI.Renderer
    | PIXI.AbstractRenderer {
    return GamesHandler.Instance.app.renderer;
  }

  private onUpdate(delta: number) {
    if (GamesHandler.EventOut_OnUpdate.HasListeners()) {
      GamesHandler.EventOut_OnUpdate.Invoke(delta);
    }
    if (this.objectsRequireTween.size() > 0) {
      // console.log("ON RUN TWEEN! " + GamesHandler.Instance.app.ticker.elapsedMS);
      TWEEN.update(); //GamesHandler.Instance.app.ticker.elapsedMS);
    }
  }
}
