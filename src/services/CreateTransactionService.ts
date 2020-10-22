import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionDTO{
  title: string;

  value: number;

  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}:TransactionDTO): Transaction {
    
    if(type !== 'income' && type !== 'outcome'){
      throw Error('Tipo da transação inválido');
    }

    if(type == 'outcome'){
      const currentBalance = this.transactionsRepository.getBalance();

      if(value > currentBalance.total){
        throw Error("Saída de caixa maior que o caixa atual");
      }
    }

    const transaction = this.transactionsRepository.create({title, value, type});

    return transaction;
    
  }
}

export default CreateTransactionService;
