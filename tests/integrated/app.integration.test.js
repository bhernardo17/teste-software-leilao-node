const { addUser, getUserById } = require('../../src/user');
const { createAuction, getAuctionById, placeBid, getBidsForAuction } = require('../../src/auction');

describe('Integração: Usuário e Leilão', () => {
  beforeEach(() => {
    // Limpa as listas de usuários, leilões e lances antes de cada teste
    users = [];
    auctions = [];
    bids = [];
  });

  test('deve adicionar um usuário e criar um leilão', () => {
    const usuario = { id: 1, name: 'Alice' };
    addUser(usuario);
    const leilao = { id: 1, name: 'Leilão de arte', startingPrice: 100 };
    createAuction(leilao);

    expect(getUserById(1)).toEqual(usuario);
    expect(getAuctionById(1)).toEqual(leilao);
  });

  test('deve permitir que um usuário faça um lance em um leilão', () => {
    const usuario = { id: 1, name: 'Bob' };
    addUser(usuario);
    const leilao = { id: 1, name: 'Leilão de arte', startingPrice: 100 };
    createAuction(leilao);
    placeBid(1, 1, 150);

    const lances = getBidsForAuction(1);
    expect(lances).toEqual([{ auctionId: 1, userId: 1, amount: 150 }]);
  });
});
