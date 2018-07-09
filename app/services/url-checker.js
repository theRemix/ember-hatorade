import Service from '@ember/service';
import config from '../config/environment';
export default Service.extend({
  subdomain(){
    var regexParse = new RegExp('[a-z\-0-9]{2,63}\.[a-z\.]{2,5}$');
    var urlParts = regexParse.exec(this.get('hostname'));
    if(urlParts)
      return this.normalize(this.get('hostname').replace(urlParts[0],'').slice(0, -1));
    else
      return this.normalize('');
  },

  hostname(){
    if( this.get('customURI') ){
      return this.get('customURI');
    } else {
      return window.location.hostname;
    }
  },

  normalize(subdomain) {
    return ENV.subdomainMapping[subdomain] || subdomain
  },

  customURI: '',
});
