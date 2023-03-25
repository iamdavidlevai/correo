import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET || 'Use .env',
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'Use .env',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'Use .env',
      authorization: {
        params: { scope: 'email openid profile https://mail.google.com/' },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        // Store the Google API access token in the token object
        token.googleAccessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Access the Google API access token from the token object
      session.googleAccessToken = token.googleAccessToken;
      return session;
    },
  },
};

export default NextAuth(authOptions);
