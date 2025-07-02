import { Transaction } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { PriceHighlight } from '../TransactionsTable/style'
import { MobileCard } from './styles'

interface TransactionsListProps {
  transactions: Transaction[]
}

export function TransactionsList({ transactions }: TransactionsListProps) {
  return (
    <>
      {transactions.map(transaction => (
        <MobileCard key={transaction.id}>
          <div>
            <span className="label">Título</span>
            <span className="value">{transaction.description}</span>
          </div>
          <div>
            <span className="label">Valor</span>
            <span className="value">
              <PriceHighlight variant={transaction.type}>
                {transaction.type === 'outcome' && '- '}
                {priceFormatter.format(transaction.price)}
              </PriceHighlight>
            </span>
          </div>
          <div>
            <span className="label">Categoria</span>
            <span className="value">{transaction.category}</span>
          </div>
          <div>
            <span className="label">Data</span>
            <span className="value">
              {dateFormatter.format(new Date(transaction.createdAt))}
            </span>
          </div>
        </MobileCard>
      ))}
    </>
  )
}
