import { AbstractRule } from './AbstractRule';

export default class HasPortsAvailable extends AbstractRule {
  constructor(
    readonly equipmentsLength: number,
    readonly numberOfPorts: number,
  ) {
    super();
  }

  isSatisfied(): boolean {
    return this.equipmentsLength < this.numberOfPorts;
  }

  protected createError(): Error {
    throw new Error('Excedeu a capacidade de portas do equipamento');
  }
}
