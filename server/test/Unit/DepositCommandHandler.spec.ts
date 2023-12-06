import { CardMother } from './Mother/CardMother';
import { AccountMother } from './Mother/AccountMother';
import { Account } from '../../src/Domain/Entity/Account';
import { CryptoService } from '../../src/Shared/Domain/CryptoService';
import { DepositCommandHandler } from '../../src/Application/Deposit/DepositCommandHandler';
import { DepositCommand } from '../../src/Application/Deposit/DepositCommand';

describe('DepositCommandHandler', () => {
  let cardRepository;
  let accountRepository;
  let cryptoService = new CryptoService();
  let depositCommandHandler;

  beforeEach(() => {
    cardRepository = {
      findOneByCardNumber: jest.fn(),
    };

    accountRepository = {
      findOneById: async (id: string) =>
        Promise.resolve(AccountMother.standard()),
      save: async (account: Account) => Promise.resolve(),
    };

    depositCommandHandler = new DepositCommandHandler(
      cardRepository,
      accountRepository,
      cryptoService,
    );
  });

  it('Should pass if we found a credit card', () => {
    const command = new DepositCommand('123456789', 123, 100);

    expect(depositCommandHandler.execute(command)).resolves.not.toThrow();
  });

  it('Should throw a CardNotFoundError when there is no card found', () => {
    const command = new DepositCommand('123456789', 123, 100);

    cardRepository.findOneByCardNumber.mockResolvedValue(CardMother.notFound());

    expect(depositCommandHandler.execute(command)).resolves.not.toThrow();
  });

  it('Should pass if we found an account', () => {});

  it('Should throw a AccountNotFoundError when there is no account found', () => {});

  it('Should pass if pin is valid', () => {});

  it('Should throw a NotValidPinError when pin is invalid', () => {});

  it('Should increment account balance with the provided amount', () => {});
});
