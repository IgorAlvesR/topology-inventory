import {
  RouterDTO,
  RouterInputPort,
} from 'src/application/input-ports/RouterInputPort';
import CoreRouter from 'src/domain/entities/CoreRouter';
import Location from 'src/domain/valueObjects/Location';

type Input = {
  id: string;
  routerTargetId: string;
};

export default class RemoveRouterUseCase {
  constructor(private routerInputPort: RouterInputPort) {}

  async execute(input: Input) {
    const targetRouterData: RouterDTO =
      await this.routerInputPort.getRouterById(input.routerTargetId);
    const coreRouter = new CoreRouter(
      targetRouterData.id,
      targetRouterData.model,
      targetRouterData.ip,
      targetRouterData.numberOfPorts,
      new Location(targetRouterData.latitude, targetRouterData.longitude),
    );
    coreRouter.removeRouter(input.id);
    await this.routerInputPort.remove(input.id);
  }
}
