import NextAuth, { type DefaultSession } from 'next-auth';
import { type JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      accessToken: string;
    } & DefaultSession['user'];
  }

  interface User {
    displayName: string;
    username: string;
    profilePicture: string;
    privateProfile: boolean;
    preventIndex: boolean;
    likes_enabled: boolean;
    language: string;
    defaultStatusVisibility: number;
    roles: string[];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    {
      id: 'traewelling',
      name: 'Träwelling',
      type: 'oauth',
      authorization: {
        url: 'https://traewelling.de/oauth/authorize',
        params: {
          scope: [
            'read-statuses',
            'read-notifications',
            'write-statuses',
            'write-likes',
            'write-notifications',
            'write-follows',
            'write-blocks',
            'read-settings',
            'read-settings-profile',
            'read-settings-followers',
            'write-followers',
          ].join(' '),
        },
      },
      userinfo: 'https://traewelling.de/api/v1/auth/user',
      token: 'https://traewelling.de/oauth/token',
      clientId: process.env.TRAEWELLING_CLIENT_ID,
      clientSecret: process.env.TRAEWELLING_CLIENT_SECRET,
      profile({ data: profile }) {
        return {
          id: profile.id,
          defaultStatusVisibility: profile.defaultStatusVisibility,
          displayName: profile.displayName,
          language: profile.language,
          name: profile.displayName,
          username: profile.username,
          profilePicture: profile.profilePicture,
          privateProfile: profile.privateProfile,
          preventIndex: profile.preventIndex,
          likes_enabled: profile.likes_enabled,
          roles: profile.roles,
        };
      },
    },
  ],
  session: {
    maxAge: 365 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/login',
  },

  callbacks: {
    jwt: async ({ token, account, user }) => {
      if (user) {
        token.username = user.username;
        token.displayName = user.name;
        // token.id = user.id as number;
        token.picture = user.profilePicture;
      }

      token.accessToken = account?.access_token || token.accessToken;
      token.refreshToken = account?.refresh_token || token.refreshToken;

      return token;
    },
    session: async ({ session, token, user }) => {
      session.user.accessToken = token.accessToken;
      //   session.user.refreshToken = token.refreshToken;
      //   session.user.username = token.username;
      //   session.user.name = token.displayName;
      //   session.user.id = token.id;
      session.user.image = token.picture;

      return session;
    },
    redirect: () => '/',
  },
});
