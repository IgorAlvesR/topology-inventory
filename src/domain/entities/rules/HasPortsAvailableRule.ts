import { AbstractRule } from './AbstractRule';

export default class HasPortsAvailableRule extends AbstractRule {
  constructor(
    readonly numberOfPortsUsed: number,
    readonly numberOfPorts: number,
  ) {
    super();
  }

  isSatisfied(): boolean {
    return this.numberOfPortsUsed < this.numberOfPorts;
  }

  protected createError(): Error {
    throw new Error('Excedeu a capacidade de portas do equipamento');
  }
}
