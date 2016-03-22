`import CookieStore from 'ember-simple-auth/session-stores/cookie';`

SessionStore = CookieStore.extend
  cookieDomain: '.lvh.me'
  cookieExpirationTime: 60 * 60 * 24

`export default SessionStore`
