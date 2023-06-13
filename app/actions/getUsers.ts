import "server-only";

import { prisma } from "@/app/libs/db";
import getSession from "./getSession";
import { cache } from "react";

const getUsers = cache(async () => {
  const session = await getSession();

  if (!session?.user?.email) {
    return [];
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email: session.user.email,
        },
      },
    });

    return users;
  } catch (error: any) {
    return [];
  }
});

export default getUsers;
