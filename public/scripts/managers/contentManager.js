import {
  checkForArray,
  isBool,
  isFunction,
  isNonEmptyString,
  noCacheInit,
  removeFromArray,
} from "../utilities/utilities.js";
import Debug from "../utilities/debug.js";

export default class ContentManager {
  constructor() {
    this.assetsCurrentlyLoading = new Array();
    this.loadingAllTriggered = false;
  }
  get assetsCurrentlyLoading() {
    return this._assetsCurrentlyLoading;
  }
  set assetsCurrentlyLoading(value) {
    if (this.assetsCurrentlyLoading !== undefined) {
      throw new Error("assetsCurrentlyLoading can only be set once");
    }
    checkForArray(value, "assetsCurrentlyLoading");
    this._assetsCurrentlyLoading = value;
  }
  get finishedLoadingAssets() {
    return this.loadingAllTriggered && this.assetsCurrentlyLoading.length == 0;
  }
  get onFinishedLoading() {
    return this._onFinishedLoading;
  }
  set onFinishedLoading(value) {
    if (!isFunction(value)) {
      throw new TypeError("onFinishedLoading must be a function");
    }
    this._onFinishedLoading = value;
  }
  get loadingAllTriggered() {
    return this._loadingAllTriggered;
  }
  set loadingAllTriggered(value) {
    if (!isBool(value)) {
      throw new TypeError("loadingAllTriggered must be a bool");
    }
    this._loadingAllTriggered = value;
  }
  get loadingId() {
    return this.assetsCurrentlyLoading.length;
  }
  loadContent() {
    this.loadImages();
    this.loadSounds();
    this.loadData();

    this.loadingAllTriggered = true;
  }
  loadData() {
    this.loadJsonObject((json) => {
      this.map = json;
    }, "./assets/data/map.json");
  }
  loadSounds() {
    // this.loadAudio((audio) => {
    //   this.sound = audio;
    // }, "./assets/music/sound.ogg");
  }
  loadImages() {
    this.loadImage((image) => {
      this.pc = image;
    }, "./assets/images/pc.png");

    this.loadImage((image) => {
      this.pcPortrait = image;
    }, "./assets/images/pc-portrait.png");
  }
  loadImage(assetInjection, filePath) {
    this.debugLogAssetLoading(filePath);
    this.addToLoadingArray(filePath);

    const image = new Image();
    image.src = filePath;
    assetInjection(image);

    const onLoad = () => {
      this.debugLogAssetLoaded(filePath);
      this.removeFromLoadingArray(filePath);
    };

    image.onload = (e) => {
      onLoad();

      image.onload = (e) => {};
    };

    if (image.complete) {
      onLoad();
    }
  }
  loadAudio(assetInjection, filePath) {
    this.debugLogAssetLoading(filePath);
    this.addToLoadingArray(filePath);

    const audio = new Audio(filePath);

    audio.oncanplay = (e) => {
      assetInjection(audio);
      this.debugLogAssetLoaded(filePath);
      this.removeFromLoadingArray(filePath);

      audio.oncanplay = (e) => {};
    };
  }
  loadJsonObject(assetInjection, filePath) {
    this.debugLogAssetLoading(filePath);
    this.addToLoadingArray(filePath);

    const request = new Request(filePath);
    const init = noCacheInit();

    fetch(request, init)
      .then((response) => response.json())
      .then((json) => {
        assetInjection(json);
        this.debugLogAssetLoaded(filePath);
        this.removeFromLoadingArray(filePath);
      });
  }
  debugLogAssetLoading(filePath) {
    if (!isNonEmptyString(filePath)) {
      throw new TypeError("path must be a non-empty string");
    }
    Debug.log("loading: " + filePath);
  }
  debugLogAssetLoaded(filePath) {
    if (!isNonEmptyString(filePath)) {
      throw new TypeError("path must be a non-empty string");
    }
    Debug.log(filePath + " ...LOADED");
  }
  addToLoadingArray(filePath) {
    this.assetsCurrentlyLoading.push(filePath);
  }
  removeFromLoadingArray(filePath) {
    removeFromArray(this.assetsCurrentlyLoading, filePath);

    this.checkIfLoadingFinished();
  }
  checkIfLoadingFinished() {
    if (!this.finishedLoadingAssets) {
      return;
    }

    Debug.log("finished loading assets");

    if (isFunction(this.onFinishedLoading)) {
      this.onFinishedLoading();
    }
  }
  debugLogLoadingStatus() {
    Debug.log(
      "assets currently loading: " + this.assetsCurrentlyLoading.length
    );
    Debug.log("loading all assets triggered: " + this.loadingAllTriggered);
  }
}
