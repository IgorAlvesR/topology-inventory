import { Module } from '@nestjs/common';
import { RouterInputAdapter } from './framework/input-adapters/RouterInputAdapter';
import RouterUseCase from './application/use-cases/RouterUseCase';
import RouterLogAdapter from './framework/output-adapters/RouterLogAdapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/ typeorm.config';
import { Router } from './framework/orm/router.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([Router]),
  ],
  controllers: [RouterInputAdapter],
  providers: [
    {
      provide: 'RouterInputPort',
      useFactory: () => new RouterUseCase(new RouterLogAdapter()),
    },
  ],
})
export class AppModule {}
