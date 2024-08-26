import NextAuth from 'next-auth';

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
          name: profile.displayName,
          username: profile.username,
          email: profile.email,
          image: profile.profilePicture,
          mastodonUrl: profile.mastodonUrl,
          privateProfile: profile.privateProfile,
          preventIndex: profile.preventIndex,
          language: profile.language,
          defaultStatusVisibility: profile.defaultStatusVisibility,
        };
      },
    },
  ],
  session: {
    maxAge: 365 * 24 * 60 * 60,
  },
});
