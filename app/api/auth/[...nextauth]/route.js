// src/app/api/auth/[...nextauth]/route.js
import { authOptions } from "../../../../lib/auth-config.js";

console.log(process.env.NEXTAUTH_SECRET);

// Use require for NextAuth to avoid ES module issues
const NextAuth = require("next-auth").default || require("next-auth");

const handler = NextAuth(authOptions);

if (process.env.NODE_ENV === "development") {
  console.log("NextAuth handler initialized");
}

export { handler as GET, handler as POST };
