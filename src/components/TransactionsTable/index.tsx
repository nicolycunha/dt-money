import { Transaction } from '../../contexts/TransactionsContext'
import { PriceHighlight, TransactionTable } from './style'
import { dateFormatter, priceFormatter } from '../../utils/formatter'

interface TransactionsTableProps {
  transactions: Transaction[]
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  return (
    <TransactionTable>
      <tbody>
        {transactions.map(transaction => {
          return (
            <tr key={transaction.id}>
              <td width="50%">{transaction.description}</td>
              <td>
                <PriceHighlight variant={transaction.type}>
                  {transaction.type === 'outcome' && '- '}
                  {priceFormatter.format(transaction.price)}
                </PriceHighlight>
              </td>
              <td>{transaction.category}</td>
              <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
            </tr>
          )
        })}
      </tbody>
    </TransactionTable>
  )
}
