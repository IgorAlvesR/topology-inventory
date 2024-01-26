import {
  RouterDTO,
  RouterInputPort,
} from 'src/application/input-ports/RouterInputPort';
import CoreRouter from 'src/domain/entities/CoreRouter';
import Location from 'src/domain/valueObjects/Location';

export default class RemoveRouterUseCase {
  constructor(private routerGateway: RouterInputPort) {}

  async execute(id: string, targetId?: string) {
    const routerData: RouterDTO = await this.routerGateway.getRouterById(
      targetId || id,
    );
    const coreRouter = new CoreRouter(
      routerData.id,
      routerData.model,
      routerData.ip,
      routerData.numberOfPorts,
      new Location(routerData.latitude, routerData.longitude),
    );
    coreRouter.removeRouter(id);
    await this.routerGateway.remove(id);
  }
}
