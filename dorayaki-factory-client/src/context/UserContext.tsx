import {
  createContext,
  memo,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react'
import { useHistory } from 'react-router'
import { me } from 'api'

const UserContext = createContext<User>({ email: '', nama: '' })
const UpdateUserContext = createContext<() => void>(() => {
  //
})

export const useUser = (): User => useContext(UserContext)
export const useUpdateUser = (): (() => void) => useContext(UpdateUserContext)

type UserContextProps = {
  children: ReactNode
}

export const UserContextProvider = memo(function UserContextProvider({
  children,
}: UserContextProps) {
  const history = useHistory()
  const [user, setUser] = useState<User>({ email: '', nama: '' })

  const updateUser = useCallback(() => {
    me().then((result) => setUser(result))
  }, [])

  useEffect(() => {
    updateUser()
    const interval = setInterval(updateUser, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [updateUser])

  useEffect(() => {
    if (user.email && user.nama) {
      history.push('/')
    } else if (!user.email && !user.nama) {
      history.push('/login')
    }
    console.log(user)
  }, [user, history])

  return (
    <UserContext.Provider value={user}>
      <UpdateUserContext.Provider value={updateUser}>
        {children}
      </UpdateUserContext.Provider>
    </UserContext.Provider>
  )
})
