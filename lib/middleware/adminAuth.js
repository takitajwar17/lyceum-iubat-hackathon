import { NextResponse } from "next/server";

export function adminAuth(handler) {
  return async (req, ...args) => {
    const authHeader = req.headers.get("authorization");
    
    if (!authHeader || !authHeader.startsWith("Basic ")) {
      return new NextResponse(
        JSON.stringify({ error: "Unauthorized" }),
        { 
          status: 401,
          headers: {
            "WWW-Authenticate": 'Basic realm="Admin Access"',
            "Content-Type": "application/json",
          },
        }
      );
    }

    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString("ascii");
    const [username, password] = credentials.split(":");

    if (username !== "admin" || password !== "admin123") {
      return new NextResponse(
        JSON.stringify({ error: "Invalid credentials" }),
        { 
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return handler(req, ...args);
  };
}
