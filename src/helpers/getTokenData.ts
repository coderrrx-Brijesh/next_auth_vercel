import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export const getTokenData = (request: NextRequest): string | null => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(
      token,
      process.env.TOKEN_SECRET!
    ) as JwtPayload;

    return decodedToken?.id || null;
  } catch (error) {
    console.log(error);
    throw new Error((error as Error).message);
  }
};
