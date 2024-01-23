import Location from '../../valueObjects/Location';
import EdgeRouter from '../EdgeRouter';
import Switch from '../Switch';

test('deve retornar o id do switch adiconado', () => {
  const edgeRouter = new EdgeRouter(
    'er1',
    'modelo2',
    '10.0.0.2',
    15,
    new Location(123, 321),
  );
  const Switch1 = new Switch(
    'sw1',
    'modelo1',
    '192.168.0.0',
    10,
    new Location(123, 31),
  );

  edgeRouter.addSwitch(Switch1);
  expect(edgeRouter.getSwitches()).toHaveLength(1);
});
