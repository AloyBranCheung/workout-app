// nextjs
import 'src/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
// toastify
import ReactToastContainer from 'src/components/ToastContainer'
// react
import { useState, ReactElement, ReactNode } from 'react'
// supabase-auth
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [supbabaseClient] = useState(() => createPagesBrowserClient())

  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <SessionContextProvider
      supabaseClient={supbabaseClient}
      initialSession={pageProps.initialSession}
    >
      {getLayout(<Component {...pageProps} />)}
      <ReactToastContainer />
    </SessionContextProvider>
  )
}
