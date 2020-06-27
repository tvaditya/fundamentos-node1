import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    // checking if transaction value is a number
    if (typeof value !== 'number') {
      throw Error('Please provide a valid number for transaction value');
    }
    // checking if transaction type is income or outcome
    if (type !== 'income' && type !== 'outcome') {
      throw Error(
        'Please provide a valid type of transaction (income or outcome)',
      );
    }
    // checking if enough balance
    const balance = this.transactionsRepository.getBalance();
    console.log(balance.total, value);
    if (type === 'outcome' && value > balance.total) {
      throw Error('Not enough money');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;