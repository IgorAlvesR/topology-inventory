import Router from './Router';
import { ID } from '../valueObjects/ID';
import ShouldBeIpRange from './roles/ShouldBeEqualIpRange';

export default class CoreRouter extends Router {
  private routers: Router[] = [];

  getRouters() {
    return this.routers;
  }

  addRouter(router: Router): void {
    new ShouldBeIpRange(this.getIp(), router.getIp()).passOrThrow();
    this.routers.push(router);
  }

  removeRouter(id: ID) {
    this.routers = this.routers.filter((router) => router.getId() !== id);
  }
}
