import { IP } from 'src/domain/valueObjects/IP';
import { AbstractRule } from './AbstractRule';

export default class ShouldBeEqualIpRange extends AbstractRule {
  constructor(
    readonly ip: IP,
    readonly ipRouterAdded: IP,
  ) {
    super();
  }

  isSatisfied(): boolean {
    return this.ip === this.ipRouterAdded;
  }

  protected createError(): Error {
    throw new Error('A faixa de ip do router adicionado é inválida.');
  }
}
