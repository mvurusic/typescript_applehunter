import * as PIXI from "pixi.js";
import * as EventSystem  from "./EventSystem/EventSystem";
import {Dictionary} from "./MyCollections/Dictionary";

export class EventIn_AddAssetToLoadingList extends EventSystem.EventSystemT2<string, string> {};
export class EventIn_LoadAssetsFromList extends EventSystem.EventSystemT0 {};
export class EventOut_AssetsLoadingCompleted extends EventSystem.EventSystemT0 {};

export class AssetLoader {
  public static EventIn_AddAssetToLoadingList:EventIn_AddAssetToLoadingList = new EventIn_AddAssetToLoadingList();
  public static EventIn_LoadAssetsFromList:EventIn_LoadAssetsFromList = new EventIn_LoadAssetsFromList(); 
  public static EventOut_AssetsLoadingCompleted:EventOut_AssetsLoadingCompleted= new EventOut_AssetsLoadingCompleted();

  private assetsToLoad:Dictionary<string> = new Dictionary<string>();
  private assetLoader:PIXI.Loader = PIXI.Loader.shared;
  
  public Init():void {
    this.assetsToLoad = new Dictionary<string>();
    AssetLoader.EventIn_AddAssetToLoadingList.AddListener(this, this.AddAssetToLoadingList);
    AssetLoader.EventIn_LoadAssetsFromList.AddListener(this, this.LoadAssetsFromList);
    this.assetLoader.onComplete.add(this.OnAssetLoadingComplete);
  }

  private AddAssetToLoadingList(id:string, path:string):void {
    if(!this.assetsToLoad.ContainsKey(id)) {
      this.assetsToLoad.Add(id, path);
    }
  }

  private LoadAssetsFromList():void {
    try {
      if(this.assetsToLoad.Count() > 0) {
        for(let i = 0; i < this.assetsToLoad.Keys().length; i++) {
          let key:string = this.assetsToLoad.Keys()[i];
          this.assetLoader.add(key, this.assetsToLoad.GetValue(key), { crossOrigin: "anonymous" });
        }
        this.LoadAssetsAsync();
      }
    } catch (ex) {
      console.log("exception2: " + ex.message);
    }
  }
  private OnAssetLoadingComplete(): void {
    AssetLoader.EventOut_AssetsLoadingCompleted.Invoke();
  }

  private async LoadAssetsAsync() {
    try {
      await this.LoadAssets();
    } catch (error) {
      console.log("Error loading asset: " + error.message);
    }
  }
  private async LoadAssets() {
    return new Promise(() => { this.assetLoader.load(); });
  }
}