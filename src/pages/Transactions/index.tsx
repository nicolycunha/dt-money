import { Header } from '../../components/Header'
import { Summary } from '../../components/Summary'
import { SearchForm } from './components/SearchForm'
import { TransactionsContainer } from './styles'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { useContextSelector } from 'use-context-selector'
import { useAuth } from '../../contexts/AuthContext'
import { Skeleton } from '../../components/Skeleton'
import { SkeletonContainer } from '../../components/Skeleton/styles'
import { TransactionsList } from '../../components/TransactionsCard'
import { TransactionsTable } from '../../components/TransactionsTable'
import { useIsMobile } from '../../hooks/useIsMobile'

export function Transactions() {
  const transactions = useContextSelector(TransactionsContext, context => {
    return context.transactions
  })

  const { authReady } = useAuth()
  const isMobile = useIsMobile()

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
        {isMobile ? (
          <TransactionsList transactions={transactions} />
        ) : (
          <TransactionsTable transactions={transactions} />
        )}
      </TransactionsContainer>
    </div>
  )
}
