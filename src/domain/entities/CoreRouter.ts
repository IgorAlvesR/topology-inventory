import Router from './Router';
import { ID } from '../valueObjects/ID';

export default class CoreRouter extends Router {
  private routers: Router[] = [];

  constructor(equipment: Router) {
    super(equipment);
  }

  getRouters() {
    return this.routers;
  }

  addRouter(router: Router): void {
    if (!(router instanceof Router)) {
      throw new Error('Esse equipamento deve ser um Router.');
    }
    if (this.routerExistsInTheList(router.getId())) {
      throw new Error('O roteador já está no inventário de topologia de rede.');
    }
    if (this.routerItself(router.getId())) {
      throw new Error('O roteador não pode inserir a si mesmo.');
    }
    this.routers.push(router);
  }

  private routerExistsInTheList(routerId: string) {
    return this.routers.some((routerList) => routerList.getId() === routerId);
  }

  private routerItself(routerId: string) {
    return this.getId() === routerId;
  }

  removeRouter(id: ID) {
    this.routers = this.routers.filter((router) => router.getId() !== id);
  }
}
