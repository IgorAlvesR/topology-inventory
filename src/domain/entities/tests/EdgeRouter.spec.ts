import { IP } from 'src/domain/valueObjects/IP';
import Location from '../../valueObjects/Location';
import EdgeRouter from '../EdgeRouter';
import Switch from '../Switch';
import Network from '../../valueObjects/Network';

function buildEdgeRouter1(ip: IP, ports: number = 10) {
  const edgeRouter = new EdgeRouter(
    'er1',
    'modelo2',
    ip,
    ports,
    new Location(123, 321),
  );
  return edgeRouter;
}

function buildSwitch(ip: IP) {
  return new Switch('sw1', 'sw-model1', ip, 10, new Location(-10, 10));
}

test('deve adicionar um switch', () => {
  const edgeRouter = buildEdgeRouter1('10.0.0.1');
  const sw1 = buildSwitch('10.0.0.2');
  edgeRouter.addSwitch(sw1);
  expect(edgeRouter.getEquipments()).toHaveLength(1);
});

test('não deve permitir adicionar um switch com faixa de ip igual', () => {
  const edgeRouter = buildEdgeRouter1('10.0.0.2');
  const sw1 = buildSwitch('10.0.0.2');
  expect(() => edgeRouter.addSwitch(sw1)).toThrow(
    'A faixa de ip do equipamento adicionado é inválida.',
  );
});

test('não deve permitir adicionar mais equipamentos do que a quantidade de portas do roteador', () => {
  const edgeRouter01 = buildEdgeRouter1('10.0.0.1', 2);
  const sw1 = buildSwitch('10.0.0.2');
  const sw2 = buildSwitch('10.0.0.3');
  const sw3 = buildSwitch('10.0.0.4');
  edgeRouter01.addSwitch(sw1);
  edgeRouter01.addSwitch(sw2);
  expect(() => edgeRouter01.addSwitch(sw3)).toThrow(
    'Excedeu a capacidade de portas do equipamento',
  );
});

test('não deve permitir remover um switch que tenha redes', () => {
  const edgeRouter01 = buildEdgeRouter1('10.0.0.1', 2);
  const sw1 = buildSwitch('10.0.0.2');
  const network = new Network('nw01', '10.0.0.2', 8);
  sw1.addNetwork(network);
  edgeRouter01.addSwitch(sw1);
  expect(() => edgeRouter01.removeSwitch(sw1)).toThrow(
    'Não é possível remover um switch que possui redes.',
  );
});

test('deve permitir remover um switch de um edge router', () => {
  const edgeRouter01 = buildEdgeRouter1('10.0.0.1', 2);
  const sw1 = buildSwitch('10.0.0.2');
  const network = new Network('nw01', '10.0.0.3', 8);
  sw1.addNetwork(network);
  edgeRouter01.addSwitch(sw1);
  sw1.removeNetwork(network.ip);
  expect(edgeRouter01.getEquipments()).toHaveLength(1);
  edgeRouter01.removeSwitch(sw1);
  expect(edgeRouter01.getEquipments()).toHaveLength(0);
});
