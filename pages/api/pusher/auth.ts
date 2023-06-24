import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { pusherServer } from "@/app/libs/pusherServer";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const session = await getServerSession(request, response, authOptions);

  if (!session?.user?.email) {
    return response.status(401);
  }

  console.log(
    " **************************************************************************** \n session\n  **************************************************************************** \n",
    session
  );

  const socketId = request.body.socket_id;
  const channel = request.body.channel_name;
  const data = {
    user_id: session?.user?.email as string,
  };

  const authResponse = pusherServer.authorizeChannel(socketId, channel, data);
  return response.send(authResponse);
}
