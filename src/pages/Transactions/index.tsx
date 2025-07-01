import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { SearchForm } from './components/SearchForm'
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable
} from './styles'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { dateFormatter, priceFormatter } from '../../utils/formatter'
import { useContextSelector } from 'use-context-selector'
import { useAuth } from '../../contexts/AuthContext'
import { Skeleton } from '../../components/Skeleton'
import { SkeletonContainer } from '../../components/Skeleton/styles'

export function Transactions() {
  const transactions = useContextSelector(TransactionsContext, context => {
    return context.transactions
  })

  const { authReady } = useAuth()

  if (!authReady) {
    return (
      <>
        <SkeletonContainer>
          <Skeleton width="100%" height="60px" radius="6px" />
        </SkeletonContainer>
        <SkeletonContainer>
          <Skeleton width="" height="150px" radius="6px" />
          <Skeleton width="" height="150px" radius="6px" />
          <Skeleton width="" height="150px" radius="6px" />
        </SkeletonContainer>

        <SkeletonContainer>
          <Skeleton width="100%" height="50px" radius="6px" />
        </SkeletonContainer>
      </>
    )
  }

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
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
                  <td>
                    {dateFormatter.format(new Date(transaction.createdAt))}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}
