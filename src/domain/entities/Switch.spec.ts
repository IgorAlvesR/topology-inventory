import Location from '../valueObjects/Location';
import Network from '../valueObjects/Network';
import Switch from './Switch';

function buildSwitch() {
  return new Switch('sw1', 'sw-model1', '10.0.0.1', 10, new Location(-10, 10));
}

test('não deve adicionar um switch com redes que tem o mesmo nome', () => {
  const switch01 = buildSwitch();
  const network01 = new Network('nw01', '20.0.0.1', 8);
  const network02 = new Network('nw01', '20.0.0.1', 8);
  switch01.addNetwork(network01);
  expect(() => switch01.addNetwork(network02)).toThrow(
    'Não é permitido adicionar redes duplicadas no mesmo switch.',
  );
});

test('não deve adicionar um switch com redes que tem o mesmo ip', () => {
  const switch01 = buildSwitch();
  const network01 = new Network('nw01', '20.0.0.1', 8);
  const network02 = new Network('nw02', '20.0.0.1', 8);
  switch01.addNetwork(network01);
  expect(() => switch01.addNetwork(network02)).toThrow(
    'Não é permitido adicionar redes duplicadas no mesmo switch.',
  );
});
