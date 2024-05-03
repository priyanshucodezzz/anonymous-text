import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { Message } from "@/models/User";


export async function POST(request: Request) {
  await dbConnect();

  const { username, content } = await request.json();
  try {
    const user = await UserModel.findOne({ username });
    if (!user) return new Response("User not found", { status: 404 });

    //is User accepting the messages
    if (!user.isAcceptingMessage) {
      return Response.json(
        {
          success: false,
          message: "User is not accepting messages",
        },
        {
          status: 403,
        }
      );
    }

    const newMessage = {
      content,
      createdAt: new Date(),
    };
    user.messages.push(newMessage as Message);

    await user.save();
    return Response.json(
      {
        success: true,
        message: "Message sent successfully!",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("An unexpected error occured", error);
    return Response.json(
      {
        success: false,
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}
