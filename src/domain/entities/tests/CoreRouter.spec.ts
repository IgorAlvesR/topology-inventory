import { IP } from 'src/domain/valueObjects/IP';
import Location from '../../valueObjects/Location';
import CoreRouter from '../CoreRouter';
import EdgeRouter from '../EdgeRouter';
import Switch from '../Switch';

function buildCoreRouter1(ip: IP, ports: number = 10) {
  const coreRouter1 = new CoreRouter(
    'cr1',
    'modelo',
    ip,
    ports,
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

function buildSwitch() {
  return new Switch('sw1', 'sw-model1', '10.0.0.1', 10, new Location(-10, 10));
}

test('deve adicionar um roteador CoreRouter', () => {
  const coreRouter1 = buildCoreRouter1('10.0.0.1');
  const coreRouter2 = buildCoreRouter2('10.0.0.1');
  coreRouter1.addRouter(coreRouter2);
  expect(coreRouter1.getEquipments()).toHaveLength(1);
});

test('deve adicionar dois roteadores, um EdgeRouter e um CoreRouter', () => {
  const coreRouter1 = buildCoreRouter1('10.0.0.1');
  const coreRouter2 = buildCoreRouter2('10.0.0.1');
  const edgeRouter = buildEdgeRouter1('10.0.0.1');
  coreRouter1.addRouter(edgeRouter);
  coreRouter1.addRouter(coreRouter2);
  expect(coreRouter1.getEquipments()).toHaveLength(2);
});

test('não deve permitir adicionar um router com faixa de ip diferente', () => {
  const coreRouter1 = buildCoreRouter1('10.0.0.1');
  const edgeRouter = buildEdgeRouter1('20.0.0.1');
  expect(() => coreRouter1.addRouter(edgeRouter)).toThrow(
    'A faixa de ip do equipamento adicionado é inválida.',
  );
});

test('não deve permitir adicionar mais equipamentos do que a quantidade de portas do roteador', () => {
  const coreRouter1 = buildCoreRouter1('10.0.0.1', 2);
  const edgeRouter01 = buildEdgeRouter1('10.0.0.1');
  const edgeRouter02 = buildEdgeRouter1('10.0.0.1');
  const coreRouter02 = buildCoreRouter1('10.0.0.1');
  coreRouter1.addRouter(edgeRouter01);
  coreRouter1.addRouter(edgeRouter02);
  expect(() => coreRouter1.addRouter(coreRouter02)).toThrow(
    'Excedeu a capacidade de portas do equipamento',
  );
});

test('não deve permitir remover um router que tem outros routers conectados', () => {
  const coreRouter1 = buildCoreRouter1('10.0.0.1', 2);
  const edgeRouter01 = buildEdgeRouter1('10.0.0.1');
  const sw1 = buildSwitch();
  coreRouter1.addRouter(edgeRouter01);
  edgeRouter01.addSwitch(sw1);
  expect(() => coreRouter1.removeRouter(edgeRouter01)).toThrow(
    'Não é possível remover um roteador que tenha outros equipamentos conectados.',
  );
});

test('permite remover um roteador que não tenha equipamentos conectados', () => {
  const coreRouter1 = buildCoreRouter1('10.0.0.1', 2);
  const edgeRouter01 = buildEdgeRouter1('10.0.0.1');
  coreRouter1.addRouter(edgeRouter01);
  expect(coreRouter1.getEquipments()).toHaveLength(1);
  coreRouter1.removeRouter(edgeRouter01);
  expect(coreRouter1.getEquipments()).toHaveLength(0);
});
