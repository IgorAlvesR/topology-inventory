import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Router } from '../framework/orm/router.entity';
import { RouterConnection } from 'src/framework/orm/routerConnection.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'pguser',
  password: 'pgpassword',
  database: 'topology-inventory',
  entities: [Router, RouterConnection],
  synchronize: true,
  logging: true,
};
