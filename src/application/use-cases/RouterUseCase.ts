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
    const targetRouterData: RouterDTO =
      await this.routerOutputPort.getRouterById(args.routerTargetId);
    const coreRouter = new CoreRouter(
      targetRouterData.id,
      targetRouterData.model,
      targetRouterData.ip,
      targetRouterData.numberOfPorts,
      new Location(targetRouterData.latitude, targetRouterData.longitude),
    );
    coreRouter.removeRouter(args.id);
    await this.routerOutputPort.remove(args.id);
  }
}
