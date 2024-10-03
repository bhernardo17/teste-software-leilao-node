const { createAuction, getAuctionById, placeBid, getBidsForAuction } = require('../../src/auction');

describe('Módulo de Leilão', () => {
  beforeEach(() => {
    // Limpar as listas de leilões e lances antes de cada teste
    auctions = [];
    bids = [];
  });

  test('deve criar um novo leilão', () => {
    const auction = { id: 1, name: 'Leilão de arte', startingPrice: 100 };
    createAuction(auction);
    expect(getAuctionById(1)).toEqual(auction);
  });

  test('deve recuperar um leilão pelo id', () => {
    const auction = { id: 2, name: 'Leilão de carros', startingPrice: 5000 };
    createAuction(auction);
    expect(getAuctionById(2)).toEqual(auction);
  });

  test('deve lançar erro se o leilão não for encontrado', () => {
    expect(() => placeBid(999, 1, 200)).toThrow('Leilão não encontrado.');
  });

  test('deve lançar erro se o valor do lance for menor que o preço inicial', () => {
    const auction = { id: 3, name: 'Leilão de imóveis', startingPrice: 10000 };
    createAuction(auction);
    expect(() => placeBid(3, 1, 5000)).toThrow('O valor do lance deve ser maior do que o preço inicial.');
  });

  test('deve registrar um lance válido em um leilão', () => {
    const auction = { id: 1, name: 'Leilão de arte', startingPrice: 100 };
    createAuction(auction);
    placeBid(1, 2, 150);
    const lances = getBidsForAuction(1);
    expect(lances).toEqual([{ auctionId: 1, userId: 2, amount: 150 }]);
  });

  test('deve recuperar todos os lances de um leilão', () => {
    const auction = { id: 1, name: 'Leilão de arte', startingPrice: 100 };
    createAuction(auction);
    placeBid(1, 1, 120);
    placeBid(1, 2, 150);
    const lances = getBidsForAuction(1);
    expect(lances.length).toBe(3);
  });
});
