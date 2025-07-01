import { ReactNode, useEffect, useState, useCallback } from 'react'
import { createContext } from 'use-context-selector'

import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  where,
  Timestamp
} from 'firebase/firestore'
import { db } from '../lib/firebase'

interface Transaction {
  id: string
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface CreateTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface TransactionsContextType {
  transactions: Transaction[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

interface TransactionsProviderProps {
  children: ReactNode
}

// eslint-disable-next-line react-refresh/only-export-components
export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const fetchTransactions = useCallback(
    async (searchQuery?: string) => {
      const transactionsRef = collection(db, 'transactions')

      let q = query(transactionsRef, orderBy('createdAt', 'desc'))

      if (searchQuery) {
        q = query(
          transactionsRef,
          where('description', '>=', searchQuery),
          where('description', '<=', searchQuery + '\uf8ff'),
          orderBy('createdAt', 'desc')
        )
      }

      const snapshot = await getDocs(q)
      const transactions: Transaction[] = snapshot.docs.map(doc => {
        const data = doc.data()
        const type =
          data.type === 'income' || data.type === 'outcome'
            ? data.type
            : 'income'

        return {
          id: doc.id,
          description: data.description,
          price: data.price,
          category: data.category,
          type,
          createdAt: (data.createdAt as Timestamp).toDate().toISOString()
        }
      })

      setTransactions(transactions)
    },
    [setTransactions]
  )

  const createTransaction = useCallback(
    async (data: CreateTransactionInput) => {
      const { description, price, category, type } = data

      const docRef = await addDoc(collection(db, 'transactions'), {
        description,
        price,
        category,
        type,
        createdAt: new Date()
      })

      setTransactions(state => [
        {
          id: docRef.id,
          description,
          price,
          category,
          type,
          createdAt: new Date().toISOString()
        },
        ...state
      ])
    },
    [setTransactions]
  )

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
