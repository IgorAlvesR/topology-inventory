import Network from '../../valueObjects/Network';
import { AbstractRule } from './AbstractRule';

export default class ExistsNetwork extends AbstractRule {
  constructor(
    readonly networks: Network[],
    readonly networkToBeAdded: Network,
  ) {
    super();
  }

  isSatisfied(): boolean {
    return !this.networks.some(
      (network) =>
        network.name === this.networkToBeAdded.name ||
        network.ip === this.networkToBeAdded.ip,
    );
  }

  protected createError(): Error {
    throw new Error('Não é permitido adicionar redes duplicadas.');
  }
}
