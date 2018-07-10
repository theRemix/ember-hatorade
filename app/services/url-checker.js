import Service from '@ember/service';
import config from '../config/environment';
export default Service.extend({
  subdomain(){
    var regexParse = new RegExp('[a-z\-0-9]{2,63}\.[a-z\.]{2,5}$');
    var urlParts = regexParse.exec(window.location.hostname);
    return window.location.hostname.replace(urlParts[0],'').slice(0, -1);
  }
});
