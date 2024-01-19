import Router from './Router';
import { ID } from '../valueObjects/ID';
import LayerSwitch from './LayerSwitch';

export default class EdgeRouter extends Router {
  private layerSwitches: LayerSwitch[] = [];

  getSwitches() {
    return this.layerSwitches;
  }

  addSwitch(layerSwitch: LayerSwitch): void {
    this.layerSwitches.push(layerSwitch);
  }

  removeSwitch(id: ID) {
    this.layerSwitches = this.layerSwitches.filter(
      (layerSwitch) => layerSwitch.getId() !== id,
    );
  }
}
