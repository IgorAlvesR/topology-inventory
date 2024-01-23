import { IP } from 'src/domain/valueObjects/IP';
import Location from '../../valueObjects/Location';
import CoreRouter from '../CoreRouter';
import EdgeRouter from '../EdgeRouter';

function buildCoreRouter1(ip: IP) {
  const coreRouter1 = new CoreRouter(
    'cr1',
    'modelo',
    ip,
    15,
    new Location(123, 321),
  );
  return coreRouter1;
}

function buildCoreRouter2(ip: IP) {
  const coreRouter2 = new CoreRouter(
    'cr2',
    'modelo2',
    ip,
    15,
    new Location(123, 321),
  );

  return coreRouter2;
}

function buildEdgeRouter1(ip: IP) {
  const edgeRouter = new EdgeRouter(
    'er1',
    'modelo2',
    ip,
    15,
    new Location(123, 321),
  );
  return edgeRouter;
}

test('deve adicionar um roteador CoreRouter', () => {
  const coreRouter1 = buildCoreRouter1('10.0.0.1');
  const coreRouter2 = buildCoreRouter2('10.0.0.1');
  coreRouter1.addRouter(coreRouter2);
  expect(coreRouter1.getRouters()).toHaveLength(1);
});

test('deve adicionar dois roteadores, um EdgeRouter e um CoreRouter', () => {
  const coreRouter1 = buildCoreRouter1('10.0.0.1');
  const coreRouter2 = buildCoreRouter2('10.0.0.1');
  const edgeRouter = buildEdgeRouter1('10.0.0.1');
  coreRouter1.addRouter(edgeRouter);
  coreRouter1.addRouter(coreRouter2);
  expect(coreRouter1.getRouters()).toHaveLength(2);
});

test('não deve permitir adicionar um router com faixa de ip diferente', () => {
  const coreRouter1 = buildCoreRouter1('10.0.0.1');
  const edgeRouter = buildEdgeRouter1('20.0.0.1');
  expect(() => coreRouter1.addRouter(edgeRouter)).toThrow(
    'A faixa de ip do router adicionado é inválida.',
  );
});
