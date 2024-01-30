import { ID } from 'src/domain/valueObjects/ID';
import { IP } from 'src/domain/valueObjects/IP';
import { Model } from 'src/domain/valueObjects/Model';
import { RouterType } from '../output-ports/RouterOutputPort';

export type CreateRouterArgs = {
  id: ID;
  model: Model;
  ip: IP;
  numberOfPorts: number;
  latitude: number;
  longitude: number;
  type: RouterType;
};

export type RemoveRouterArgs = {
  id: ID;
  routerTargetId: ID;
};

export interface RouterInputPort {
  create(args: CreateRouterArgs): Promise<void>;
  remove(args: RemoveRouterArgs): Promise<void>;
}
