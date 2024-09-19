import { DB } from "@lib/DB";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

//POST /api/user/login
export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const { username, password } = body;

  // Username validation (optional,skipped validation)

  // check if username is valid
  const user = DB.users.find((u) => u.username === username && u.password === password);

  if (!user) {
    return NextResponse.json({ 
      ok: false, 
      message: "Username or password is incorrect" 
    }, { status: 400 });
  }

  const secret = process.env.JWT_SECRET || "This ie another secret";
  const token = jwt.sign(
    {username: username, role: user.role, studentId: user.studentId}, 
    secret, 
    {expiresIn: "8h"}
  );

  return NextResponse.json({ ok: true, token: token});
};
