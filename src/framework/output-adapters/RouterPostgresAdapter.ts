import { InjectRepository } from '@nestjs/typeorm';
import {
  RouterDTO,
  RouterOutputPort,
} from 'src/application/output-ports/RouterOutputPort';
import { Router } from '../orm/router.entity';
import { Repository } from 'typeorm';

export default class RouterPostgresAdapter implements RouterOutputPort {
  constructor(
    @InjectRepository(Repository<Router>)
    private routerRepository: Repository<Router>,
  ) {}

  async save(router: RouterDTO): Promise<void> {
    const routerPersist = {
      model: router.model,
      ip: router.ip,
      numberOfPorts: router.numberOfPorts,
      latitude: router.latitude,
      longitude: router.longitude,
    } as Router;
    await this.routerRepository.save(routerPersist);
  }

  async remove(id: string): Promise<void> {
    await console.log('aaa', id);
  }
  async getRouterById(id: string): Promise<RouterDTO> {
    await console.log('aaa', id);
    return {} as RouterDTO;
  }
  async getParentRouterId(id: string): Promise<RouterDTO> {
    await console.log('aaa', id);
    return {} as RouterDTO;
  }
}
