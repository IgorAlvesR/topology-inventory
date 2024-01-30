import {
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { type } from 'os';
import {
  CreateRouterArgs,
  RouterInputPort,
} from 'src/application/input-ports/RouterInputPort';

@Controller('router')
export class RouterInputAdapter {
  constructor(
    @Inject('RouterInputPort')
    private readonly routerInputPort: RouterInputPort,
  ) {}

  @Post()
  async create(@Req() request: Request): Promise<string> {
    const { id, model, ip, numberOfPorts, latitude, longitude, type } =
      request.body;

    const args: CreateRouterArgs = {
      id,
      model,
      ip,
      numberOfPorts,
      latitude,
      longitude,
      type,
    };

    if (!this.isValidCreateArgs(args)) {
      throw new HttpException('Argumentos inválidos!', HttpStatus.BAD_REQUEST);
    }

    await this.routerInputPort.create(args);
    return 'Router created successfully';
  }

  private isValidCreateArgs(args: CreateRouterArgs): boolean {
    const invalidType = !(
      args.type === 'core-router' || args.type === 'edge-router'
    );
    const existsAllArgs =
      !!args.id &&
      !!args.model &&
      !!args.ip &&
      !!args.numberOfPorts &&
      !!args.latitude &&
      !!args.longitude &&
      !!type;

    if (
      !existsAllArgs ||
      invalidType ||
      isNaN(args.numberOfPorts) ||
      isNaN(args.latitude) ||
      isNaN(args.longitude)
    ) {
      return false;
    }
    return true;
  }
}
