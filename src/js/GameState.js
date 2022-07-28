export default class GameState {
  static from(object) {
    // TODO: create object
    this.player = object.player;
    this.currentLevel = object.currentLevel;
    return null;
  }
}
