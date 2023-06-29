import { httpBatchLink } from "@trpc/client"
import { createTRPCNext } from "@trpc/next"
import type { AppRouter } from "../server/routers/_app"
import * as trpcNext from "@trpc/server/adapters/next"
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs"
import { TRPCError, inferAsyncReturnType } from "@trpc/server"

function getBaseUrl() {
  if (typeof window !== "undefined")
    // browser should use relative path
    return ""
  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`
  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`
  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export const trpc = createTRPCNext<AppRouter>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  config(opts) {
    return {
      links: [
        httpBatchLink({
          /**
           * If you want to use SSR, you need to use the server's full URL
           * @link https://trpc.io/docs/ssr
           **/
          url: `${getBaseUrl()}/api/trpc`,

          // You can pass any HTTP headers you wish here
          async headers() {
            return {
              // authorization: getAuthCookie(),
            }
          },
        }),
      ],
    }
  },
  /**
   * @link https://trpc.io/docs/ssr
   **/
  ssr: false,
})

export const createContextFn = async ({
  req,
  res,
}: trpcNext.CreateNextContextOptions) => {
  const supabase = createPagesServerClient({ req, res })
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session)
      return new TRPCError({ code: "UNAUTHORIZED", message: "No session." })

    return { user: session.user, req, res }
  } catch (error) {
    return new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Error getting session.",
      cause: error,
    })
  }
}

export type Context = inferAsyncReturnType<typeof createContextFn>
