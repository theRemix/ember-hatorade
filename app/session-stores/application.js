import CookieStore from 'ember-simple-auth/session-stores/cookie';

export default CookieStore.extend({
  'cookieDomain': '.hatora.de',
  'cookieExpirationTime': 60 * 60 * 24
});
