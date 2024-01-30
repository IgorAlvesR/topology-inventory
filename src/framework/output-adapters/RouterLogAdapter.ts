import {
  RouterDTO,
  RouterOutputPort,
} from 'src/application/output-ports/RouterOutputPort';
import { ID } from 'src/domain/valueObjects/ID';

export default class RouterLogAdapter implements RouterOutputPort {
  getRouterById(id: string): Promise<RouterDTO> {
    return new Promise((resolve) => {
      console.log('buscou no banco o roteador', id);
      resolve({
        id: '123',
        model: 'r1-model',
        ip: '10.0.0.1',
        numberOfPorts: 10,
        latitude: 123,
        longitude: 321,
        type: 'core-router',
      } as RouterDTO);
    });
  }

  save(router: RouterDTO): Promise<void> {
    return new Promise((resolve) => {
      console.log('salvou no banco o roteador', router.id);
      resolve();
    });
  }

  remove(id: ID): Promise<void> {
    return new Promise((resolve) => {
      console.log('removeu do banco o roteador', id);
      resolve();
    });
  }

  getParentRouterId(id: ID): Promise<RouterDTO> {
    return new Promise((resolve) => {
      console.log('buscou o roteaor pai do routeador', id);
      resolve({
        id: '123',
        model: 'r1-model',
        ip: '10.0.0.1',
        numberOfPorts: 10,
        latitude: 123,
        longitude: 321,
        type: 'core-router',
      } as RouterDTO);
    });
  }
}
