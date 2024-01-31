import {
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import {
  CreateRouterArgs,
  RemoveRouterArgs,
  RouterInputPort,
} from 'src/application/input-ports/RouterInputPort';

@Controller('router')
export class RouterInputAdapter {
  constructor(
    @Inject('RouterInputPort')
    private readonly routerInputPort: RouterInputPort,
  ) {}

  @Post('/create')
  async create(@Req() req: Request): Promise<string> {
    console.log('AA', req);
    const { id, model, ip, numberOfPorts, latitude, longitude, type } =
      req.body;

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
    //SERIA UM BOM LUGAR PARA COLOCAR UM TRY CATCH E MOSTRAR O ERRO
    await this.routerInputPort.create(args);
    return 'Router created successfully';
  }

  @Post('/remove')
  async remove(@Req() req: Request): Promise<string> {
    const { id } = req.body;
    const args: RemoveRouterArgs = { id };
    await this.routerInputPort.remove(args);
    return 'Roteador removido com sucesso.';
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
      !!args.type;

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
