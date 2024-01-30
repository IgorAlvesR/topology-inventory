import CoreRouter from 'src/domain/entities/CoreRouter';
import Location from 'src/domain/valueObjects/Location';
import EdgeRouter from 'src/domain/entities/EdgeRouter';
import { RouterDTO, RouterOutputPort } from '../output-ports/RouterOutputPort';
import {
  CreateRouterArgs,
  RemoveRouterArgs,
  RouterInputPort,
} from '../input-ports/RouterInputPort';

export default class RouterUseCase implements RouterInputPort {
  constructor(private routerOutputPort: RouterOutputPort) {}

  async create(args: CreateRouterArgs): Promise<void> {
    let router: EdgeRouter | CoreRouter;

    if (args.type === 'edge-router') {
      router = new EdgeRouter(
        args.id,
        args.model,
        args.ip,
        args.numberOfPorts,
        new Location(args.latitude, args.longitude),
      );
    } else if (args.type === 'core-router') {
      router = new CoreRouter(
        args.id,
        args.model,
        args.ip,
        args.numberOfPorts,
        new Location(args.latitude, args.longitude),
      );
    }
    const routerDTO = new RouterDTO(router, args.type);
    await this.routerOutputPort.save(routerDTO);
  }

  async remove(args: RemoveRouterArgs): Promise<void> {
    const routerToBeRemoved = await this.routerOutputPort.getRouterById(
      args.id,
    );

    if (!routerToBeRemoved) {
      throw new Error('Não foi possível encontrar esse roteador.');
    }
    const routerInstance = this.getInstanceRouter(routerToBeRemoved);
    const hasEquipment = !!routerInstance.getEquipments().length;
    if (hasEquipment) {
      throw new Error(
        'Não foi possível remover roteador com equipamentos conectados.',
      );
    }
    const parentRouterId = await this.routerOutputPort.getParentRouterId(
      args.id,
    );
    if (!parentRouterId) {
      await this.routerOutputPort.remove(args.id);
      return;
    }
    const coreRouter = new CoreRouter(
      parentRouterId.id,
      parentRouterId.model,
      parentRouterId.ip,
      parentRouterId.numberOfPorts,
      new Location(parentRouterId.latitude, parentRouterId.longitude),
    );
    coreRouter.removeRouter(args.id);
    const routerDTO = new RouterDTO(coreRouter, 'core-router');
    await this.routerOutputPort.remove(args.id);
    await this.routerOutputPort.save(routerDTO);
  }

  private getInstanceRouter(router: RouterDTO): CoreRouter | EdgeRouter {
    if (router.type === 'edge-router') {
      return new EdgeRouter(
        router.id,
        router.model,
        router.ip,
        router.numberOfPorts,
        new Location(router.latitude, router.longitude),
      );
    }

    if (router.type === 'core-router') {
      return new CoreRouter(
        router.id,
        router.model,
        router.ip,
        router.numberOfPorts,
        new Location(router.latitude, router.longitude),
      );
    }
  }
}
