import { TRPCError } from '@trpc/server';
import { addDays, addWeeks, endOfWeek, startOfWeek } from 'date-fns';
import { start } from 'repl';
import { z } from 'zod';
import {
  fetchAllUsersTipCount,
  fetchLatestRoundId,
  fetchLadder,
  fetchRoundsWithGamesForUser,
  fetchLatestRound,
  upsertTip,
  primeTeamNames,
  fetchAllRounds,
  fetchLatestRoundWithGames,
  createRound,
  fetchAllTeamNames,
  createTeamName,
  fetchAllGames,
  fetchAllLocations,
  createLocation,
  createGame,
  fetchAllUsers,
  updateGameResult,
} from '~/data';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '~/server/api/trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  usersWithTips: publicProcedure.query(async ({}) => {
    return fetchAllUsersTipCount();
  }),
  roundId: publicProcedure.query(async ({}) => {
    return fetchLatestRoundId();
  }),
  ladder: publicProcedure.query(async ({}) => {
    return fetchLadder();
  }),
  roundForUser: publicProcedure.input(z.string()).query(async ({ input }) => {
    return fetchRoundsWithGamesForUser(input);
  }),
  fetchLatestRound: publicProcedure.query(async ({}) => {
    return fetchLatestRound();
  }),
  upsertTip: publicProcedure
    .input(
      z.object({
        roundId: z.string(),
        gameId: z.string(),
        selectedTipId: z.string(),
        userId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return upsertTip(input.roundId, input.selectedTipId, input.userId, input.gameId);
    }),
  primeLadder: publicProcedure.mutation(async ({}) => {
    return primeTeamNames();
  }),
  getRounds: publicProcedure.query(async ({}) => {
    return fetchAllRounds();
  }),
  getLatestRoundWithGames: publicProcedure.query(async ({}) => {
    return fetchLatestRoundWithGames();
  }),
  addRound: publicProcedure
    .input(
      z.object({
        roundNumber: z.number(),
        dateStart: z.string(),
        dateEnd: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { roundNumber, dateStart, dateEnd } = input;
      return createRound(roundNumber, new Date(dateStart), new Date(dateEnd));
    }),
  getTeams: publicProcedure.query(async ({}) => {
    return fetchAllTeamNames();
  }),
  addTeam: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    return createTeamName(input);
  }),
  getGames: publicProcedure.query(async ({}) => {
    return fetchAllGames();
  }),
  getLocations: publicProcedure.query(async ({}) => {
    return fetchAllLocations();
  }),
  addLocation: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    return createLocation(input);
  }),
  createGame: publicProcedure
    .input(
      z.object({
        round: z.string(),
        homeTeam: z.string(),
        awayTeam: z.string(),
        location: z.string(),
        startDateTime: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { round, homeTeam, awayTeam, location, startDateTime } = input;
      return createGame(round, homeTeam, awayTeam, location, new Date(startDateTime));
    }),
  getUsers: publicProcedure.query(async ({}) => {
    return fetchAllUsers();
  }),
  updateGameResult: publicProcedure
    .input(
      z.object({
        gameId: z.string(),
        teamId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return updateGameResult(input.gameId, input.teamId);
    }),
  fetchSeasons: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.season.findMany({
      select: {
        id: true,
        year: true,
        rounds: {
          select: {
            id: true,
            roundNumber: true,
            dateStart: true,
            dateEnd: true,
            _count: {
              select: {
                games: true,
              },
            },
          },
          orderBy: {
            roundNumber: 'asc',
          }
        },
      },
    });
  }),
  createSeason: protectedProcedure
    .input(
      z.object({
        year: z.string(),
        startWeek: z.string().datetime(),
        roundsCount: z.number().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.user.role !== 'admin') throw new TRPCError({ code: 'UNAUTHORIZED' });
      const startWeek = new Date(input.startWeek);
      const season = await ctx.db.season.create({
        data: {
          year: input.year,
          rounds: {
            createMany: {
              data: Array.from({ length: input.roundsCount }).map((_, i) => {
                const dateStart = addWeeks(startWeek, i);
                const dateEnd = addDays(dateStart, 6);
                return {
                  roundNumber: i + 1,
                  dateStart,
                  dateEnd,
                };
              }),
            },
          },
        },
      });

      return season;
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
