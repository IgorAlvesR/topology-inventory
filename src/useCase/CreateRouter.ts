import {
  RouterDTO,
  RouterGateway,
  RouterType,
} from 'src/interfaceAdapter/RouterGateway';
import CoreRouter from 'src/domain/entities/CoreRouter';
import Location from 'src/domain/valueObjects/Location';
import { IP } from 'src/domain/valueObjects/IP';
import { Model } from 'src/domain/valueObjects/Model';
import { ID } from 'src/domain/valueObjects/ID';
import EdgeRouter from 'src/domain/entities/EdgeRouter';

type Input = {
  id: ID;
  model: Model;
  ip: IP;
  numberOfPorts: number;
  latitude: number;
  longitude: number;
  targetRouterId?: RouterType;
};

export default class CreateRouter {
  constructor(private routerGateway: RouterGateway) {}

  async execute(input: Input) {
    let router: EdgeRouter | CoreRouter;
    let routerType: RouterType;

    if (input.targetRouterId) {
      router = new EdgeRouter(
        input.id,
        input.model,
        input.ip,
        input.numberOfPorts,
        new Location(input.latitude, input.longitude),
      );
      routerType = 'edge-router';
    } else {
      router = new CoreRouter(
        input.id,
        input.model,
        input.ip,
        input.numberOfPorts,
        new Location(input.latitude, input.longitude),
      );
      routerType = 'core-router';
    }
    const routerDTO = new RouterDTO(router, routerType);
    await this.routerGateway.save(routerDTO);
  }
}
