import Location from '../valueObjects/Location';
import EdgeRouter from './EdgeRouter';
import Equipment from './Equipment';
import LayerSwitch from './LayerSwitch';

test('deve retornar o id do switch adiconado', () => {
  const edgeRouter = new EdgeRouter(
    new Equipment('er1', 'modelo2', '10.0.0.2', 15, new Location(123, 321)),
  );
  const layerSwitch1 = new LayerSwitch(
    new Equipment('sw1', 'modelo1', '192.168.0.0', 10, new Location(123, 31)),
  );
  edgeRouter.addSwitch(layerSwitch1);
  expect(edgeRouter.getSwitches()).toHaveLength(1);
});
