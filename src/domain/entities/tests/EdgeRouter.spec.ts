import { IP } from 'src/domain/valueObjects/IP';
import Location from '../../valueObjects/Location';
import EdgeRouter from '../EdgeRouter';
import Switch from '../Switch';

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

function buildSwitch() {
  return new Switch('sw1', 'sw-model1', '10.0.0.1', 10, new Location(-10, 10));
}

test('deve adicionar um switch', () => {
  const edgeRouter = buildEdgeRouter1('10.0.0.1');
  const sw1 = buildSwitch();
  edgeRouter.addSwitch(sw1);
  expect(edgeRouter.getEquipments()).toHaveLength(1);
});

test('não deve permitir adicionar um switch com faixa de ip diferente', () => {
  const edgeRouter = buildEdgeRouter1('20.0.0.1');
  const sw1 = buildSwitch();
  expect(() => edgeRouter.addSwitch(sw1)).toThrow(
    'A faixa de ip do equipamento adicionado é inválida.',
  );
});

test('não deve permitir adicionar mais equipamentos do que a quantidade de portas do roteador', () => {
  const edgeRouter01 = buildEdgeRouter1('10.0.0.1', 2);
  const sw1 = buildSwitch();
  const sw2 = buildSwitch();
  const sw3 = buildSwitch();
  edgeRouter01.addSwitch(sw1);
  edgeRouter01.addSwitch(sw2);
  expect(() => edgeRouter01.addSwitch(sw3)).toThrow(
    'Excedeu a capacidade de portas do equipamento',
  );
});
