import * as UIButton from "../../../UIButton";
import {GamesHandler} from "../../../GamesHandler";
import { MainAppleHunter } from "./MainAppleHunter";

export class UIHandler {
  private btnReset:UIButton.UIButton = new UIButton.UIButton();
  private btnPlay:UIButton.UIButton = new UIButton.UIButton();
  private btnStop:UIButton.UIButton = new UIButton.UIButton();
  public Init():void {
    this.btnReset.Init("btn_restart", "./src/Games/AppleHunter/Images/ui/pic_repeat.png", GamesHandler.VarOut_CanvasElementSize.x-120, 30);
    this.btnPlay.Init("btn_play", "./src/Games/AppleHunter/Images/ui/pic_play.png", GamesHandler.VarOut_CanvasElementSize.x-60, 30);
    this.btnStop.Init("btn_stop", "./src/Games/AppleHunter/Images/ui/pic_stop.png", GamesHandler.VarOut_CanvasElementSize.x-60, 30);
    this.btnReset.SetOnClick(this, this.OnBtnReset);
    this.btnPlay.SetOnClick(this, this.OnBtnPlay);
    this.btnStop.SetOnClick(this, this.OnBtnStop);
    this.btnReset.SetSize(50, 50);
    this.btnPlay.SetSize(50, 50);
    this.btnStop.SetSize(50, 50);
    this.btnStop.SetActive(true);
    this.btnPlay.SetActive(false);
  }

  private OnBtnReset():void {
    MainAppleHunter.EventIn_OnBtnReset.Invoke();
  }

  private OnBtnPlay():void {
    this.btnStop.SetActive(true);
    this.btnPlay.SetActive(false);

    MainAppleHunter.EventIn_StartAutoAppleFalling.Invoke();
  }

  private OnBtnStop():void {
    this.btnStop.SetActive(false);
    this.btnPlay.SetActive(true);
  }
}