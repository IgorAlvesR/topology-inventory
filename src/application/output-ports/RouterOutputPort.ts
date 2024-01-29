import Router from 'src/domain/entities/Router';
import { ID } from '../../domain/valueObjects/ID';
import { Model } from 'src/domain/valueObjects/Model';
import { IP } from 'src/domain/valueObjects/IP';

export type RouterType = 'core-router' | 'edge-router';

export class RouterDTO {
  readonly id: ID;
  readonly model: Model;
  readonly ip: IP;
  readonly numberOfPorts: number;
  readonly latitude: number;
  readonly longitude: number;

  constructor(
    private readonly router: Router,
    readonly type: RouterType,
  ) {
    this.id = this.router.getId();
    this.model = this.router.getModel();
    this.ip = this.router.getIp();
    this.latitude = this.router.getLocation().lat;
    this.longitude = this.router.getLocation().lon;
    this.numberOfPorts = this.router.getNumberOfPorts();
  }
}

export interface RouterOutputPort {
  save(router: RouterDTO): Promise<void>;
  remove(id: ID): Promise<void>;
  getRouterById(id: ID): Promise<RouterDTO>;
}
