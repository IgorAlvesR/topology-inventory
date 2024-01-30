import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RouterInputAdapter } from './framework/input-adapters/RouterInputAdapter';
import RouterUseCase from './application/use-cases/RouterUseCase';
import RouterLogAdapter from './framework/output-adapters/RouterLogAdapter';
@Module({
  imports: [],
  controllers: [AppController, RouterInputAdapter],
  providers: [
    AppService,
    {
      provide: 'RouterInputPort',
      useFactory: () => new RouterUseCase(new RouterLogAdapter()),
    },
  ],
})
export class AppModule {}
