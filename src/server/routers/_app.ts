import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import {
  createGame,
  createLocation,
  createNewUser,
  createRound,
  createTeamName,
  fetchAllGames,
  fetchAllLocations,
  fetchAllRounds,
  fetchAllTeamNames,
  fetchAllUsers,
  fetchAllUsersTipCount,
  fetchLadder,
  fetchLatestRound,
  fetchLatestRoundId,
  fetchLatestRoundWithGames,
  fetchRoundsWithGamesForUser,
  fetchUserByEmail,
  primeTeamNames,
  updateGameResult,
  updateUsername,
  upsertTip,
} from 'data';
import * as jwt from 'jsonwebtoken';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { TRPCError } from '@trpc/server';

export const appRouter = router({
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
  login: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { email, password } = input;

      const user = await fetchUserByEmail(email);

      if (!user) throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid credentials' });

      const isMatch = compareSync(password, user.password);
      if (!isMatch) throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid credentials' });

      const token = jwt.sign({ user }, String(process.env.SECRET_TOKEN));
      return { token: token };
    }),
  updateUsername: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        username: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      console.info('Update Username Request');
      const { username, userId } = input;

      const user = await updateUsername(userId, username);

      if (!user) throw new TRPCError({ code: 'NOT_FOUND', message: 'no matching user found' });

      const token = jwt.sign({ user }, process.env.SECRET_TOKEN as string);
      return { token: token };
    }),
  register: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
        email: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { username, password, email } = input;

      const hashedPassword = hashSync(password, genSaltSync(10));
      const user = await createNewUser(username, hashedPassword, email);

      if (!user) throw new TRPCError({ code: 'NOT_FOUND', message: 'no matching user found' });

      const token = jwt.sign({ user }, process.env.SECRET_TOKEN as string);
      return { token: token };
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
});

export type AppRouter = typeof appRouter;
