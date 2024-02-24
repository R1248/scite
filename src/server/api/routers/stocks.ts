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

  transaction: protectedProcedure
  .input(z.object({owned: z.number(), stockId: z.string(), buyPrice: z.number()}))
  .mutation(async ({ctx, input}) => {
    return ctx.db.stock.update({
      where: {
        id: input.stockId,
      },
      data: {
        owned: input.owned,
        buyPrice: input.buyPrice,
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
      },
    });
  }),

  allPriceMoves: protectedProcedure
  .input(z.object({stockId: z.string()}))
  .query(async ({ctx, input}) => {
    return ctx.db.priceMove.findMany({
      where: {
        stockId: input.stockId,
      },
    });
  }),
});
