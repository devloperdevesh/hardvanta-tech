import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

// ================= CONFIG =================
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt" as const,
  },

  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = "USER";
      }
      return token;
    },

    async session({ session, token }: any) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

// ================= HANDLER =================
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };