import express from 'express';
import session from 'express-session';
import passport from 'passport';
import * as client from 'openid-client';
import { Strategy } from 'openid-client/passport';
import memoize from 'memoizee';

const app = express();
const PORT = 3001;

app.set('trust proxy', 1);
app.use(express.json());

const getOidcConfig = memoize(
  async () => {
    return await client.discovery(
      new URL(process.env.ISSUER_URL ?? 'https://replit.com/oidc'),
      process.env.REPL_ID
    );
  },
  { maxAge: 3600 * 1000 }
);

if (!process.env.SESSION_SECRET) {
  throw new Error('SESSION_SECRET environment variable is required but not set.');
}

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((user, cb) => cb(null, user));

function updateUserSession(user, tokens) {
  user.claims = tokens.claims();
  user.access_token = tokens.access_token;
  user.refresh_token = tokens.refresh_token;
  user.expires_at = user.claims?.exp;
}

const registeredStrategies = new Set();

function ensureStrategy(domain) {
  const strategyName = `replitauth:${domain}`;
  if (!registeredStrategies.has(strategyName)) {
    getOidcConfig().then((config) => {
      const strategy = new Strategy(
        {
          name: strategyName,
          config,
          scope: 'openid email profile offline_access',
          callbackURL: `https://${domain}/api/callback`,
        },
        async (tokens, verified) => {
          const user = {};
          updateUserSession(user, tokens);
          verified(null, user);
        }
      );
      passport.use(strategy);
      registeredStrategies.add(strategyName);
    });
  }
}

app.get('/api/login', async (req, res, next) => {
  const domain = req.hostname;
  const strategyName = `replitauth:${domain}`;

  if (!registeredStrategies.has(strategyName)) {
    const config = await getOidcConfig();
    const strategy = new Strategy(
      {
        name: strategyName,
        config,
        scope: 'openid email profile offline_access',
        callbackURL: `https://${domain}/api/callback`,
      },
      async (tokens, verified) => {
        const user = {};
        updateUserSession(user, tokens);
        verified(null, user);
      }
    );
    passport.use(strategy);
    registeredStrategies.add(strategyName);
  }

  passport.authenticate(strategyName, {
    prompt: 'login consent',
    scope: ['openid', 'email', 'profile', 'offline_access'],
  })(req, res, next);
});

app.get('/api/callback', async (req, res, next) => {
  const domain = req.hostname;
  const strategyName = `replitauth:${domain}`;

  if (!registeredStrategies.has(strategyName)) {
    const config = await getOidcConfig();
    const strategy = new Strategy(
      {
        name: strategyName,
        config,
        scope: 'openid email profile offline_access',
        callbackURL: `https://${domain}/api/callback`,
      },
      async (tokens, verified) => {
        const user = {};
        updateUserSession(user, tokens);
        verified(null, user);
      }
    );
    passport.use(strategy);
    registeredStrategies.add(strategyName);
  }

  passport.authenticate(strategyName, {
    successRedirect: '/',
    failureRedirect: '/api/login',
  })(req, res, next);
});

app.get('/api/auth/logout', async (req, res) => {
  try {
    const config = await getOidcConfig();
    req.logout(() => {
      res.redirect(
        client
          .buildEndSessionUrl(config, {
            client_id: process.env.REPL_ID,
            post_logout_redirect_uri: `${req.protocol}://${req.hostname}`,
          })
          .href
      );
    });
  } catch {
    req.logout(() => res.redirect('/'));
  }
});

const isAuthenticated = async (req, res, next) => {
  const user = req.user;

  if (!req.isAuthenticated() || !user?.expires_at) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const now = Math.floor(Date.now() / 1000);
  if (now <= user.expires_at) {
    return next();
  }

  const refreshToken = user.refresh_token;
  if (!refreshToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const config = await getOidcConfig();
    const tokenResponse = await client.refreshTokenGrant(config, refreshToken);
    updateUserSession(user, tokenResponse);
    return next();
  } catch {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

app.get('/api/auth/user', isAuthenticated, (req, res) => {
  const claims = req.user?.claims ?? {};
  res.json({
    id: claims.sub,
    username: claims.username || claims.preferred_username || null,
    firstName: claims.first_name || null,
    lastName: claims.last_name || null,
    email: claims.email || null,
    profileImageUrl: claims.profile_image_url || null,
  });
});

app.listen(PORT, () => {
  console.log(`Auth server running on port ${PORT}`);
});
