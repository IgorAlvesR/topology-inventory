import { IP } from 'src/domain/valueObjects/IP';
import { AbstractRule } from './AbstractRule';

export default class IsIpInRangeRule extends AbstractRule {
  constructor(
    readonly equipmentIp: IP,
    readonly equipmentIpToBeAdded: IP,
  ) {
    super();
  }

  isSatisfied(): boolean {
    return this.equipmentIp === this.equipmentIpToBeAdded;
  }

  protected createError(): Error {
    throw new Error('A faixa de ip do equipamento adicionado é inválida.');
  }
}
