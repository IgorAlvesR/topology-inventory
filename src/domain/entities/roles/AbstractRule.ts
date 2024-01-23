export abstract class AbstractRule {
  abstract isSatisfied(): boolean;

  protected abstract createError(): Error;

  passOrThrow(): void | never {
    if (!this.isSatisfied()) {
      throw this.createError();
    }
  }
}
