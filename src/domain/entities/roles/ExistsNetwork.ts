import Network from '../../valueObjects/Network';
import { AbstractRule } from './AbstractRule';

export default class ExistsNetwork extends AbstractRule {
  constructor(
    readonly networks: Network[],
    readonly networkAdded: Network,
  ) {
    super();
  }

  isSatisfied(): boolean {
    return !this.networks.some(
      (network) =>
        network.name === this.networkAdded.name ||
        network.ip === this.networkAdded.ip,
    );
  }

  protected createError(): Error {
    throw new Error(
      'Não é permitido adicionar redes duplicadas no mesmo switch.',
    );
  }
}
