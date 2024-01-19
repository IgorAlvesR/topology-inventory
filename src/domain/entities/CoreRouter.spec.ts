import Location from '../valueObjects/Location';
import CoreRouter from './CoreRouter';
import EdgeRouter from './EdgeRouter';
import Equipment from './Equipment';

function buildCoreRouter1() {
  const coreRouter1 = new CoreRouter(
    new Equipment('cr1', 'modelo', '10.0.0.1', 15, new Location(123, 321)),
  );
  return coreRouter1;
}

function buildCoreRouter2() {
  const coreRouter2 = new CoreRouter(
    new Equipment('cr2', 'modelo2', '10.0.0.2', 15, new Location(123, 321)),
  );
  return coreRouter2;
}

function buildEdgeRouter1() {
  const edgeRouter = new EdgeRouter(
    new Equipment('er1', 'modelo2', '10.0.0.2', 15, new Location(123, 321)),
  );
  return edgeRouter;
}

test('deve retornar um erro ao adicionar o próprio CoreRouter na lista', () => {
  const coreRouter1 = buildCoreRouter1();
  expect(() => coreRouter1.addRouter(coreRouter1)).toThrow(
    'O roteador não pode inserir a si mesmo.',
  );
});

test('deve retornar um erro ao adicionar um CoreRouter já existente na lista', () => {
  const coreRouter1 = buildCoreRouter1();
  const coreRouter2 = buildCoreRouter2();
  coreRouter1.addRouter(coreRouter2);
  expect(() => coreRouter1.addRouter(coreRouter2)).toThrow(
    'O roteador já está no inventário de topologia de rede.',
  );
});

test('deve adicionar um roteador CoreRouter', () => {
  const coreRouter1 = buildCoreRouter1();
  const coreRouter2 = buildCoreRouter2();
  coreRouter1.addRouter(coreRouter2);
  expect(coreRouter1.getRouters()).toHaveLength(1);
});

test('deve adicionar dois roteadores, um EdgeRouter e um CoreRouter', () => {
  const coreRouter1 = buildCoreRouter1();
  const coreRouter2 = buildCoreRouter2();
  const edgeRouter = buildEdgeRouter1();
  coreRouter1.addRouter(edgeRouter);
  coreRouter1.addRouter(coreRouter2);
  expect(coreRouter1.getRouters()).toHaveLength(2);
});
