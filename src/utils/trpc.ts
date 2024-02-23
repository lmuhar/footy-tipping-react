/**
 * This is the client-side entrypoint for your tRPC API. It is used to create the `api` object which
 * contains the Next.js App-wrapper, as well as your type-safe React Query hooks.
 *
 * We also create a few inference helpers for input and output types.
 */
import { httpBatchLink, loggerLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server';
import { AppRouter } from 'server/routers/_app';
import { ssrPrepass } from '@trpc/next/ssrPrepass';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''; // browser should use relative url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

/** A set of type-safe react-query hooks for your tRPC API. */
export const trpc = createTRPCNext<AppRouter>({
  config(opts) {
    const { ctx } = opts;
    if (typeof window !== 'undefined') {
      return {
        links: [
          httpBatchLink({
            url: '/api/trpc',
          }),
          loggerLink({
            enabled: (opts) =>
              process.env.NODE_ENV === 'development' || (opts.direction === 'down' && opts.result instanceof Error),
          }),
        ],
      };
    }
    return {
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          headers() {
            if (!ctx?.req?.headers) return {};
            return { cookie: ctx.req.headers.cookie };
          },
        }),
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' || (opts.direction === 'down' && opts.result instanceof Error),
        }),
      ],
    };
  },
  ssr: true,
  ssrPrepass,
  responseMeta({ clientErrors }) {
    if (clientErrors.length) {
      // propagate first http error from API calls
      return {
        status: clientErrors[0]?.data?.httpStatus ?? 500,
      };
    }

    // cache full page for 1 day + revalidate once every second
    const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
    return {
      'Cache-Control': `s-maxage=1, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
    };
  },
});

export type RouterInputs = inferRouterInputs<AppRouter>;

export type RouterOutputs = inferRouterOutputs<AppRouter>;
