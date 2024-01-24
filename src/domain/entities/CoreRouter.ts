import Router from './Router';
import { ID } from '../valueObjects/ID';
import HasPortsAvailableRule from './rules/HasPortsAvailableRule';
import IsIpInRangeRule from './rules/IsIpInRangeRule';

export default class CoreRouter extends Router {
  private routers: Router[] = [];

  getRouters() {
    return this.routers;
  }

  addRouter(router: Router): void {
    new IsIpInRangeRule(this.getIp(), router.getIp()).passOrThrow();
    new HasPortsAvailableRule(
      this.routers.length,
      this.getNumberOfPorts(),
    ).passOrThrow();
    this.routers.push(router);
  }

  removeRouter(id: ID) {
    this.routers = this.routers.filter((router) => router.getId() !== id);
  }
}
