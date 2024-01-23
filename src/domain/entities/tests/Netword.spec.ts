import Network from '../../valueObjects/Network';

test('não deve permitir criar uma rede com CIDR inválido', () => {
  expect(() => new Network('nw01', '10.0.0.1', 1)).toThrow('Cidr inválido.');
  expect(() => new Network('nw01', '10.0.0.1', 32)).toThrow('Cidr inválido.');
});

test('deve criar uma rede com um cidr válido', () => {
  const network = new Network('nw01', '10.0.0.1', 8);
  expect(network.name).toBe('nw01');
});
