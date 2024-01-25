import Switch from '../Switch';
import { AbstractRule } from './AbstractRule';

export default class IsSwitchEmptyRule extends AbstractRule {
  constructor(readonly sw: Switch) {
    super();
  }

  isSatisfied(): boolean {
    return !this.sw.getNetworks().length;
  }

  protected createError(): Error {
    throw new Error('Não é possível remover um switch que possui redes.');
  }
}
