const { addUser, getUserById } = require('../../src/user');

describe('Módulo de Usuário', () => {
  beforeEach(() => {
    // ira limpar a lista de usuários antes de cada teste
    users = [];
  });

  test('deve adicionar um usuário ao array de usuários', () => {
    const user = { id: 1, name: 'Alice' };
    addUser(user);
    expect(getUserById(1)).toEqual(user);
  });

  test('deve recuperar um usuário pelo id', () => {
    const user1 = { id: 1, name: 'Alice' };
    const user2 = { id: 2, name: 'Bob' };
    addUser(user1);
    addUser(user2);
    expect(getUserById(2)).toEqual(user2);
  });

  test('deve retornar indefinido se o usuário não for encontrado', () => {
    const resultado = getUserById(3);
    expect(resultado).toBeUndefined();
  });
});
