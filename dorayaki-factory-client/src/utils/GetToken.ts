export const GetToken = (): string => {
  const cookies = document.cookie.replaceAll(' ', '').split(';')
  const all_key_value = cookies.map((cookie) => cookie.split('=', 2))

  const all_key = all_key_value.filter(([key]) => key === 'webadutToken')[0]
  const refreshToken = all_key_value.filter(
    ([key]) => key === 'webadutRToken'
  )[0]

  if (all_key && refreshToken) return `${all_key[1]} ${refreshToken[1]}`
  return ''
}
