import {
  RouterDTO,
  RouterOutputPort,
} from 'src/application/output-ports/RouterOutputPort';
import { ID } from 'src/domain/valueObjects/ID';

export default class RouterLogAdapter implements RouterOutputPort {
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
