import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../lib/firebase'
import { onAuthStateChanged, signInAnonymously, User } from 'firebase/auth'

interface AuthContextType {
  user: User | null
  authReady: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  authReady: false
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [authReady, setAuthReady] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      if (!currentUser) {
        signInAnonymously(auth)
          .then(res => setUser(res.user))
          .finally(() => setAuthReady(true))
      } else {
        setUser(currentUser)
        setAuthReady(true)
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, authReady }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)
