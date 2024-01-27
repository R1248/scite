import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const stockRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.db.stock.findMany({
      where: {
        userId: ctx.session.user.id,
      }
    });
  }),

  one: protectedProcedure
  .input(z.object({name: z.string()}))
  .query(({ctx, input}) => {
    return ctx.db.stock.findMany({
      where: {
        userId: ctx.session.user.id,
        name: input.name,
      },
    });
  }),

  create: protectedProcedure
  .input(z.object({ logo: z.string(), name: z.string(), symbol: z.string(), category: z.string(), firstPrice: z.number(), priceMoves: z.array(z.object({price: z.number(), date: z.string()})) }))
  .mutation(({ctx, input}) => {
    return ctx.db.stock.create({
      data: {
        logo: input.logo,
        name: input.name,
        symbol: input.symbol,
        category: input.category,
        firstPrice: input.firstPrice,
        owned: 0,
        userId: ctx.session.user.id,
      },
    });
  }),

  transaction: protectedProcedure
  .input(z.object({owned: z.number(), stockId: z.string()}))
  .mutation(async ({ctx, input}) => {
    return ctx.db.stock.update({
      where: {
        id: input.stockId,
      },
      data: {
        owned: input.owned,
      },
    });
  }),

  newPriceMove: protectedProcedure
  .input(z.object({stockId: z.string(), price: z.number(), date: z.string()}))
  .mutation(async ({ctx, input}) => {
    return ctx.db.priceMove.create({
      data: {
        stockId: input.stockId,
        price: input.price,
        date: input.date,
      },
    });
  }),
});
