import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: { scope: 'email openid profile https://mail.google.com/' },
      },
      // authorizationUrl:
      //   'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
      // scope:
      //   'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/gmail.readonly https://mail.google.com',
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
