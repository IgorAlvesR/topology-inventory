import Equipment from './Equipment';

export default abstract class Router extends Equipment {
  constructor(e: Equipment) {
    super(
      e.getId(),
      e.getModel(),
      e.getIp(),
      e.getNumberOfPorts(),
      e.getLocation(),
    );
  }
}
