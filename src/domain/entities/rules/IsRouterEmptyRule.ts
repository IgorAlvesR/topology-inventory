import { AbstractRule } from './AbstractRule';

export default class IsRouterEmptyRule extends AbstractRule {
  constructor(readonly isRouterEmpty: boolean) {
    super();
  }

  isSatisfied(): boolean {
    return this.isRouterEmpty;
  }

  protected createError(): Error {
    throw new Error(
      'Não é possível remover um roteador que tenha outros equipamentos conectados.',
    );
  }
}
