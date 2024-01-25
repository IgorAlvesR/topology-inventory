import Router from '../Router';
import { AbstractRule } from './AbstractRule';

export default class IsRouterEmptyRule extends AbstractRule {
  constructor(readonly router: Router) {
    super();
  }

  isSatisfied(): boolean {
    return !this.router.getEquipments().length;
  }

  protected createError(): Error {
    throw new Error(
      'Não é possível remover um roteador que tenha outros equipamentos conectados.',
    );
  }
}
