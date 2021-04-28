import * as PIXI from "pixi.js";
import {GamesHandler} from "./GamesHandler";
import {AssetLoader} from "./AssetLoader";

export class UIButton {

  private icon:PIXI.Sprite = new PIXI.Sprite();
  private id:string = "";
  private posX:number = 0;
  private posY:number = 0;
  public btnWidth:number = -1;
  public btnHeight:number = -1;
  private onPointerUpReceiver:any;
  private onPointerUpAction:any;
  private onPointerDownReceiver:any;
  private onPointerDownAction:any;
  private onPointerOverReceiver:any;
  private onPointerOverAction:any;
  private onPointerOutReceiver:any;
  private onPointerOutAction:any;


  // private textureIcon:PIXI.Texture = undefined;// = new PIXI.Texture();

  public Init(id:string, path:string, posX:number, posY:number) {
    this.id = id;
    this.posX = posX;
    this.posY = posY;

    AssetLoader.EventIn_AddAssetToLoadingList.Invoke(id, path);
    AssetLoader.EventOut_AssetsLoadingCompleted.AddListener(this, this.AssetsLoadingCompleted);
  }

  private AssetsLoadingCompleted():void {
    let textureIcon:PIXI.Texture | undefined = PIXI.Loader.shared.resources[this.id].texture;
    this.icon = new PIXI.Sprite(textureIcon);
    this.icon.buttonMode = true;

    this.icon.anchor.set(0.5);
    this.icon.x = this.posX;
    this.icon.y = this.posY;
    if(this.btnWidth > 0) {
      this.icon.width = this.btnWidth;
      this.icon.height = this.btnHeight;
    }

    // make the button interactive...
    this.icon.interactive = true;
    this.icon.buttonMode = true;

    this.icon
      // Mouse & touch events are normalized into
      // the pointer* events for handling different
      // button events.
      .on('pointerdown', this.OnPointerDown, this)
      .on('pointerup', this.OnPointerUp, this)
      .on('pointerupoutside', this.OnPointerUp, this)
      .on('pointerover', this.OnPointerOver, this)
      .on('pointerout', this.OnPointerOut, this);

    GamesHandler.EventIn_SetChildOnStage.Invoke(this.icon);
      // Use mouse-only events
      // .on('mousedown', onButtonDown)
      // .on('mouseup', onButtonUp)
      // .on('mouseupoutside', onButtonUp)
      // .on('mouseover', onButtonOver)
      // .on('mouseout', onButtonOut)

      // Use touch-only events
      // .on('touchstart', onButtonDown)
      // .on('touchend', onButtonUp)
      // .on('touchendoutside', onButtonUp)
  }

  public SetOnClick(receiver: any, action: any) {
    this.receiver = receiver;
    this.action = action;
    //console.log("SET ON CLICK: " + receiver + " " + action);
  }

  public SetSize(width:number, height:number) {
    this.icon.width = width;
    this.icon.height = height;
    this.btnWidth = width;
    this.btnHeight = height;
  }

  public SetActive(active:boolean) {
    this.icon.visible = active;
  }

  private OnPointerDown():void {
    
    // this.isdown = true;
    // this.texture = textureButtonDown;
    // this.alpha = 1;
  }

  private OnPointerUp():void {
    console.log("ON POINT: " + (this.action) + " " + this.receiver + " " + this.btnWidth + " " + this.btnHeight + " " + this.posX + " " + this.posY);
    this.action.call(this.receiver);
    // this.isdown = false;
    // if (this.isOver) {
    //     this.texture = textureButtonOver;
    // }
    // else {
    //     this.texture = textureButton;
    // }
  }

  private OnPointerOver():void {
    // this.isOver = true;
    // if (this.isdown) {
    //     return;
    // }
    // this.texture = textureButtonOver;
  }

  private OnPointerOut() {
    // this.isOver = false;
    // if (this.isdown) {
    //     return;
    // }
    // this.texture = textureButton;
  }

}