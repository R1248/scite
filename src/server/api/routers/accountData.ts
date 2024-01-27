import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const accountDataRouter = createTRPCRouter({
  access: protectedProcedure.query(({ ctx }) => {
    return ctx.db.accountData.findMany({
      where: {
        userId: ctx.session.user.id,
      }
    });
  }),

  update: protectedProcedure
  .input(z.object({newCash: z.number(),}))
  .mutation(async ({ctx, input}) => {
    return ctx.db.accountData.update({
      where: {
        id: ctx.session.user.id,
      },
      data: {
        cash: input.newCash,
      },
    });
  }),
});
