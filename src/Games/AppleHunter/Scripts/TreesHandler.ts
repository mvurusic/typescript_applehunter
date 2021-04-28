import * as Collections from "../../../Collections";
import * as PIXI from "pixi.js";
import { Tree } from "./Tree";
import {GamesHandler} from "../../../GamesHandler";
import {AssetLoader} from "../../../AssetLoader";
import {Dictionary} from "../../../MyCollections/Dictionary";
import * as EventSystem  from "../../../EventSystem/EventSystem";

export interface Pos { x: number; y: number; }
export class TreesHandler {
  private static instance: TreesHandler;
  private trees:Collections.LinkedList<Tree> = new Collections.LinkedList<Tree>();
  private appleTextures:Dictionary<PIXI.Texture | undefined> = new Dictionary<PIXI.Texture | undefined>(); 

  public Init() {
    TreesHandler.instance = this;
    AssetLoader.EventIn_AddAssetToLoadingList.Invoke("apple_green", "./src/Games/AppleHunter/Images/apples/Apple green 90x92.png");
    AssetLoader.EventIn_AddAssetToLoadingList.Invoke("apple_yellow", "./src/Games/AppleHunter/Images/apples/Apple yellow 90x92.png");
    AssetLoader.EventIn_AddAssetToLoadingList.Invoke("apple_red", "./src/Games/AppleHunter/Images/apples/Apple red 90x92.png");
    AssetLoader.EventIn_AddAssetToLoadingList.Invoke("apple_broken", "./src/Games/AppleHunter/Images/apples/Apple broken 90x92.png");
    AssetLoader.EventOut_AssetsLoadingCompleted.AddListener(this, this.AssetsLoadingCompleted);
  }

  public static VarOut_GetAppleTexture(appleID:string):PIXI.Texture | undefined
  {
    return TreesHandler.instance.appleTextures.GetValue(appleID);
  }

  private AssetsLoadingCompleted():void {
    this.appleTextures.Clear();
    this.appleTextures.Add("apple_green", PIXI.Loader.shared.resources["apple_green"].texture);
    this.appleTextures.Add("apple_yellow", PIXI.Loader.shared.resources["apple_yellow"].texture);
    this.appleTextures.Add("apple_red", PIXI.Loader.shared.resources["apple_red"].texture);
    this.appleTextures.Add("apple_broken", PIXI.Loader.shared.resources["apple_broken"].texture);
    this.CreateTrees();
  }

  private CreateTrees() {
    let treePositions1:Collections.LinkedList<Pos> = new Collections.LinkedList<Pos>();
    treePositions1.add({x:-90, y:90});
    treePositions1.add({x:20, y:-50});
    treePositions1.add({x:-30, y:-120});
    treePositions1.add({x:120, y:0});
    treePositions1.add({x:27, y:20});
    treePositions1.add({x:50, y:100});
    treePositions1.add({x:-110, y:-40});
    treePositions1.add({x:70, y:-100 });
    treePositions1.add({x:-50, y:30});
    let treePositions2:Collections.LinkedList<Pos> = new Collections.LinkedList<Pos>();
    treePositions2.add({x:-60, y:-90});
    treePositions2.add({x:-100, y:50});
    treePositions2.add({x:0, y:-40});
    treePositions2.add({x:100, y:0});
    treePositions2.add({x:-30, y:80});
    treePositions2.add({x:50, y:-80});
    treePositions2.add({x:30, y:20});
    treePositions2.add({x:-110, y:-30 });
    treePositions2.add({x:70, y:100});
    let treePositions3:Collections.LinkedList<Pos> = new Collections.LinkedList<Pos>();
    treePositions3.add({x:-40, y:120});
    treePositions3.add({x:-120, y:40});
    treePositions3.add({x:-60, y:-90});
    treePositions3.add({x:100, y:0});
    treePositions3.add({x:20, y:-35});
    treePositions3.add({x:70, y:100});
    treePositions3.add({x:60, y:-95});
    treePositions3.add({x:-50, y:0 });
    treePositions3.add({x:20, y:35});

    this.trees.add(new Tree(GamesHandler.VarOut_CanvasElementSize.x*0.2, GamesHandler.VarOut_CanvasElementSize.y*0.4, treePositions1));
    this.trees.add(new Tree(GamesHandler.VarOut_CanvasElementSize.x*0.5, GamesHandler.VarOut_CanvasElementSize.y*0.4, treePositions2));
    this.trees.add(new Tree(GamesHandler.VarOut_CanvasElementSize.x*0.8, GamesHandler.VarOut_CanvasElementSize.y*0.4, treePositions3));
  }

  public VarOut_GetTree(treeIndex:number):Tree | undefined {
    return this.trees.elementAtIndex(treeIndex);
  }
}