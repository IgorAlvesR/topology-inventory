import {
  RouterDTO,
  RouterInputPort,
} from 'src/application/input-ports/RouterInputPort';
import { ID } from 'src/domain/valueObjects/ID';

export default class RouterHttpAdapter implements RouterInputPort {
  getRouterById(id: string): Promise<RouterDTO> {
    return new Promise((resolve) => {
      console.log('buscou no banco', id);
      resolve({} as RouterDTO);
    });
  }

  save(router: RouterDTO): Promise<void> {
    return new Promise((resolve) => {
      console.log('salvou no banco', router);
      resolve();
    });
  }

  remove(id: ID): Promise<void> {
    return new Promise((resolve) => {
      console.log('removeu do banco', id);
      resolve();
    });
  }
}
