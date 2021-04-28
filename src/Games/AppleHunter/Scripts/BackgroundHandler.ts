import {Dictionary} from "../../../MyCollections/Dictionary";
import * as PIXI from "pixi.js";
import {AssetLoader} from "../../../AssetLoader";
import {GamesHandler} from "../../../GamesHandler";

interface KeyValuePathID { key: string; value: string; }
export class BackgroundHandler {
  private static readonly keyBGGradient:string = "bg_gradient";
  private static readonly keyBGMountain:string = "bg_mountain";
  private static readonly keyBGTrees:string = "bg_trees";
  private static readonly keyFGGrass:string = "bg_grassFront";
  private static readonly pathBGGradient:KeyValuePathID = { key:BackgroundHandler.keyBGGradient, value:"./src/Games/AppleHunter/Images/environment/BgGradient_4x512 3.png" };
  private static readonly pathBGMountain: KeyValuePathID = { key:BackgroundHandler.keyBGMountain, value:"./src/Games/AppleHunter/Images/environment/mountain_comic 1.png"};
  private static readonly pathBGTrees: KeyValuePathID = { key:BackgroundHandler.keyBGTrees, value:"./src/Games/AppleHunter/Images/environment/background_trees.png"};
  private static readonly pathFGGrass: KeyValuePathID = { key:BackgroundHandler.keyFGGrass, value:"./src/Games/AppleHunter/Images/environment/Grass 2000x146.png"};

  private paths: Dictionary<string> = new Dictionary<string>();
  private sprites: Dictionary<PIXI.Sprite> = new Dictionary<PIXI.Sprite>();
  private rootSpriteBG: PIXI.Sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
  private rootSpriteFG: PIXI.Sprite = new PIXI.Sprite(PIXI.Texture.WHITE);
  private sortingRootSpriteBG: number = -20;
  private sortingRootSpriteFG: number = 20;

  public Init(): void {
    this.paths.Clear();
    this.paths.Add(BackgroundHandler.pathBGGradient.key, BackgroundHandler.pathBGGradient.value);
    this.paths.Add(BackgroundHandler.pathBGMountain.key, BackgroundHandler.pathBGMountain.value);
    this.paths.Add(BackgroundHandler.pathBGTrees.key, BackgroundHandler.pathBGTrees.value);
    this.paths.Add(BackgroundHandler.pathFGGrass.key, BackgroundHandler.pathFGGrass.value);
    this.sprites.Clear();
    this.sprites.Add(BackgroundHandler.pathBGGradient.key, new PIXI.Sprite(PIXI.Texture.WHITE));
    this.sprites.Add(BackgroundHandler.pathBGMountain.key, new PIXI.Sprite(PIXI.Texture.WHITE));
    this.sprites.Add(BackgroundHandler.pathBGTrees.key, new PIXI.Sprite(PIXI.Texture.WHITE));
    this.sprites.Add(BackgroundHandler.pathFGGrass.key, new PIXI.Sprite(PIXI.Texture.WHITE));
    
    for(let i = 0; i < this.paths.Count(); i++) {
      let key:string = this.paths.Keys()[i];
      let value:string = this.paths.GetValue(key);
      AssetLoader.EventIn_AddAssetToLoadingList.Invoke(key, value);
    }
    AssetLoader.EventOut_AssetsLoadingCompleted.AddListener(this, this.AssetsLoadingCompleted);
    this.rootSpriteBG.zIndex = this.sortingRootSpriteBG;
    this.rootSpriteFG.zIndex = this.sortingRootSpriteFG;
    GamesHandler.EventIn_SetChildOnStage.Invoke(this.rootSpriteBG);
    GamesHandler.EventIn_SetChildOnStage.Invoke(this.rootSpriteFG);
  }

  private AssetsLoadingCompleted():void {
    this.DisplayBGGradient();
    this.DisplayBGMountain();
    this.DisplayBGTrees();
    this.DisplayFGGrass();
  }
  private DisplayBGGradient(): void {
    let key:string = BackgroundHandler.keyBGGradient;
    let texture = PIXI.Loader.shared.resources[key].texture;
    let sprite: PIXI.Sprite = new PIXI.Sprite(texture);
    sprite.width = GamesHandler.VarOut_CanvasElementSize.x;
    sprite.height = GamesHandler.VarOut_CanvasElementSize.y;
    this.rootSpriteBG.addChild(sprite);
    this.sprites.Add(BackgroundHandler.keyBGGradient, sprite);
  }

  private DisplayBGMountain(): void {
    let key:string = BackgroundHandler.keyBGMountain;
    let texture = PIXI.Loader.shared.resources[key].texture;
    let sprite: PIXI.Sprite = new PIXI.Sprite(texture);
    sprite.x = GamesHandler.VarOut_CanvasElementSize.x*-0.1;
    sprite.y = GamesHandler.VarOut_CanvasElementSize.y*0;
    sprite.width = GamesHandler.VarOut_CanvasElementSize.x*1.2;
    sprite.height = GamesHandler.VarOut_CanvasElementSize.y;
    this.rootSpriteBG.addChild(sprite);
    this.sprites.Add(BackgroundHandler.keyBGMountain, sprite);
  }

  private DisplayBGTrees(): void {
    let key:string = BackgroundHandler.keyBGTrees;
    let texture = PIXI.Loader.shared.resources[key].texture;
    let sprite: PIXI.Sprite = new PIXI.Sprite(texture);
    sprite.x = GamesHandler.VarOut_CanvasElementSize.x*-0.05;
    sprite.y = GamesHandler.VarOut_CanvasElementSize.y*0.15;
    sprite.width = GamesHandler.VarOut_CanvasElementSize.x*1.1;
    sprite.height = GamesHandler.VarOut_CanvasElementSize.y*0.85;
    this.rootSpriteBG.addChild(sprite);
    this.sprites.Add(BackgroundHandler.keyBGTrees, sprite);
  }

  private DisplayFGGrass():void {
    let key:string = BackgroundHandler.keyFGGrass;
    let texture = PIXI.Loader.shared.resources[key].texture;
    let sprite: PIXI.Sprite = new PIXI.Sprite(texture);
    sprite.x = GamesHandler.VarOut_CanvasElementSize.x*0;
    sprite.y = GamesHandler.VarOut_CanvasElementSize.y*0.89;
    sprite.width = GamesHandler.VarOut_CanvasElementSize.x;
    sprite.height = GamesHandler.VarOut_CanvasElementSize.y*0.12;
    this.rootSpriteFG.addChild(sprite);
    this.sprites.Add(BackgroundHandler.keyFGGrass, sprite);
  }
}
