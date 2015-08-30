/* jshint ignore:start */

/* jshint ignore:end */

define('ember-hatorade/adapters/application', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].RESTAdapter.extend({
    namespace: 'api/v1',
    host: 'http://api.hatora.de'
  });

});
define('ember-hatorade/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'ember-hatorade/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  var App;

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('ember-hatorade/components/infinity-loader', ['exports', 'ember-infinity/components/infinity-loader'], function (exports, infinityLoader) {

	'use strict';

	exports['default'] = infinityLoader['default'];

});
define('ember-hatorade/controllers/application', ['exports'], function (exports) {

	'use strict';

	exports['default'] = Ember.Controller.extend({});

});
define('ember-hatorade/controllers/array', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('ember-hatorade/controllers/object', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Controller;

});
define('ember-hatorade/controllers/stream', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Controller.extend({
    sortBy: 'id',
    init: function init() {
      this._super();
      self = this;

      var client = new Faye.Client('http://hatora.de:8080/faye');
      var subscription = client.subscribe('/messages', function (message) {
        var data = { tweet: message };
        var serializer = self.store.serializerFor('tweet');
        self.myMessageHandler(message);
      });
    },
    myMessageHandler: function myMessageHandler(data) {
      console.log(data);
      var tweet = {
        id: data.id_str,
        text: data.text,
        screen_name: data.user.screen_name,
        favorite_count: data.favorite_count,
        url: data.url,
        profile_image: data.user.profile_image_url
      };
      self.store.push('tweet', tweet);
    }

  });
  // self.model.unshiftObject(funtimes)

});
define('ember-hatorade/initializers/app-version', ['exports', 'ember-hatorade/config/environment', 'ember'], function (exports, config, Ember) {

  'use strict';

  var classify = Ember['default'].String.classify;
  var registered = false;

  exports['default'] = {
    name: 'App Version',
    initialize: function initialize(container, application) {
      if (!registered) {
        var appName = classify(application.toString());
        Ember['default'].libraries.register(appName, config['default'].APP.version);
        registered = true;
      }
    }
  };

});
define('ember-hatorade/initializers/export-application-global', ['exports', 'ember', 'ember-hatorade/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    var classifiedName = Ember['default'].String.classify(config['default'].modulePrefix);

    if (config['default'].exportApplicationGlobal && !window[classifiedName]) {
      window[classifiedName] = application;
    }
  }

  ;

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('ember-hatorade/initializers/subdomain', ['exports', 'ember', 'ember-hatorade/config/environment'], function (exports, Ember, ENV) {

  'use strict';

  var urlChecker = Ember['default'].Object.extend({

    subdomain: (function () {
      var regexParse = new RegExp('[a-z-0-9]{2,63}.[a-z.]{2,5}$');
      var urlParts = regexParse.exec(this.get('hostname'));
      if (urlParts) return this.normalize(this.get('hostname').replace(urlParts[0], '').slice(0, -1));else return this.normalize('');
    }).property('hostname'),

    hostname: (function () {
      if (this.get('customURI')) {
        return this.get('customURI');
      } else {
        return window.location.hostname;
      }
    }).property('customURI'),

    normalize: function normalize(subdomain) {
      return ENV['default'].subdomainMapping[subdomain] || subdomain;
    },

    customURI: ''

  });

  exports['default'] = {
    name: 'subdomain',
    initialize: function initialize(container, application) {
      container.register('url-checker:main', urlChecker);
      application.inject('route', 'urlChecker', 'url-checker:main');
      application.inject('controller', 'urlChecker', 'url-checker:main');
    },
    urlChecker: urlChecker
  };

});
define('ember-hatorade/models/hashtag', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    text: DS['default'].attr()
  });

});
define('ember-hatorade/models/tweet', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    text: DS['default'].attr(),
    screen_name: DS['default'].attr(),
    created_at: DS['default'].attr(),
    favorite_count: DS['default'].attr,
    url: DS['default'].attr(),
    profile_image: DS['default'].attr()

  });

});
define('ember-hatorade/models/tweets', ['exports', 'ember-data'], function (exports, DS) {

	'use strict';

	exports['default'] = DS['default'].Model.extend({});

});
define('ember-hatorade/router', ['exports', 'ember', 'ember-hatorade/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.route('tweets');
    this.route('home');
    this.route('stream');
    this.route('hashtags', function () {
      this.route('show', { path: '/:text' }, function () {});
    });
    this.route('hashtagTweets', { path: 'hashtags/:text' }, function () {});
    this.route('about');
  });

  exports['default'] = Router;

});
define('ember-hatorade/routes/about', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('ember-hatorade/routes/hashtags', ['exports', 'ember', 'ember-infinity/mixins/route'], function (exports, Ember, InfinityRoute) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend(InfinityRoute['default'], {
    model: function model() {
      return this.infinityModel('hashtag', { perPage: 50, startingPage: 1 });
    }
  });

});
define('ember-hatorade/routes/home', ['exports', 'ember'], function (exports, Ember) {

	'use strict';

	exports['default'] = Ember['default'].Route.extend({});

});
define('ember-hatorade/routes/stream', ['exports', 'ember', 'ember-infinity/mixins/route'], function (exports, Ember, InfinityRoute) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend(InfinityRoute['default'], {
    model: function model() {
      return this.infinityModel('tweet', { perPage: 50, startingPage: 1 });
    },
    actions: {
      newTweet: function newTweet() {
        var fun = { tweet: { id: 420, text: 'fun times', screen_name: 'voodoologic', favorite_count: 99, url: 'http://hatora.de', profile_image: 'http://placekitten.com/90/90' } };
        console.log(this.currentModel);
        funtimes = this.store.createRecord('tweet', fun.tweet);
        this.currentModel.unshiftObject(funtimes);
      }
    }
  });

});
define('ember-hatorade/routes/tweets', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model() {
      return this.store.find('tweet');
    }
  });

});
define('ember-hatorade/templates/about', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createElement("q");
        var el3 = dom.createTextNode("It's like Uber for haters");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("     - Nobody");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("Haters gonna hate.  We here at hatorade live this motto.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("Simply log in via twitter, visit your user name (i.e. rsherman_25.hatora.de) and haters visiting the site will be alerted that you need haters. ");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("iframe");
        dom.setAttribute(el1,"width","420");
        dom.setAttribute(el1,"height","315");
        dom.setAttribute(el1,"src","https://www.youtube.com/embed/e7z_ztMxBgk");
        dom.setAttribute(el1,"frameborder","0");
        var el2 = dom.createTextNode("allowfullscreen");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,7,7,contextualElement);
        dom.insertBoundary(fragment, null);
        content(env, morph0, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('ember-hatorade/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.12.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("home");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child1 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.12.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("stream");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child2 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.12.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("hashtags");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child3 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.12.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("about");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","container-fluid col-lg-8 col-lg-offset-2 col-md-8 col-md-offset-2");
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","fun");
        var el3 = dom.createElement("h2");
        dom.setAttribute(el3,"id","title");
        var el4 = dom.createTextNode("Hatora.de");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("button");
        var el4 = dom.createTextNode("new tweet");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("ul");
        dom.setAttribute(el2,"class","nav nav-pills pull-left");
        var el3 = dom.createElement("li");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"href","http://blog.hatora.de");
        var el5 = dom.createTextNode("blog");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("li");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, element = hooks.element, block = hooks.block, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(element0, [0, 1]);
        var element2 = dom.childAt(element0, [1]);
        var morph0 = dom.createMorphAt(dom.childAt(element2, [0]),0,0);
        var morph1 = dom.createMorphAt(dom.childAt(element2, [1]),0,0);
        var morph2 = dom.createMorphAt(dom.childAt(element2, [2]),0,0);
        var morph3 = dom.createMorphAt(dom.childAt(element2, [4]),0,0);
        var morph4 = dom.createMorphAt(element0,2,2);
        element(env, element1, context, "action", ["newTweet"], {});
        block(env, morph0, context, "link-to", ["home"], {}, child0, null);
        block(env, morph1, context, "link-to", ["stream"], {}, child1, null);
        block(env, morph2, context, "link-to", ["hashtags"], {}, child2, null);
        block(env, morph3, context, "link-to", ["about"], {}, child3, null);
        content(env, morph4, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('ember-hatorade/templates/hashtags', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.12.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("li");
          dom.setAttribute(el1,"class","media row list-group-item col-lg-4");
          var el2 = dom.createElement("a");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, get = hooks.get, concat = hooks.concat, attribute = hooks.attribute, content = hooks.content;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var element0 = dom.childAt(fragment, [0, 0]);
          var morph0 = dom.createMorphAt(element0,0,0);
          var attrMorph0 = dom.createAttrMorph(element0, 'href');
          attribute(env, attrMorph0, element0, "href", concat(env, ["hashtags/", get(env, context, "hashtag.text")]));
          content(env, morph0, context, "hashtag.text");
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ul");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        dom.setAttribute(el2,"class","media row list-group-item col-lg-4");
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, block = hooks.block, inline = hooks.inline, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element1 = dom.childAt(fragment, [3]);
        var morph0 = dom.createMorphAt(element1,0,0);
        var morph1 = dom.createMorphAt(dom.childAt(element1, [1]),0,0);
        var morph2 = dom.createMorphAt(fragment,4,4,contextualElement);
        dom.insertBoundary(fragment, null);
        block(env, morph0, context, "each", [get(env, context, "model")], {"keyword": "hashtag"}, child0, null);
        inline(env, morph1, context, "infinity-loader", [], {"infinityModel": get(env, context, "model")});
        content(env, morph2, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('ember-hatorade/templates/home', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Home");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,3,3,contextualElement);
        dom.insertBoundary(fragment, null);
        content(env, morph0, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('ember-hatorade/templates/stream', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.12.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("li");
          dom.setAttribute(el1,"class","media row list-group-item col-lg-12");
          var el2 = dom.createElement("img");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("h4");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2,"class","data col-lg-8 col-md-8 col-sm-8");
          var el3 = dom.createElement("p");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          var el3 = dom.createElement("a");
          var el4 = dom.createComment("");
          dom.appendChild(el3, el4);
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, get = hooks.get, attribute = hooks.attribute, content = hooks.content;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var element0 = dom.childAt(fragment, [0]);
          var element1 = dom.childAt(element0, [0]);
          var element2 = dom.childAt(element0, [2]);
          var element3 = dom.childAt(element2, [1]);
          var attrMorph0 = dom.createAttrMorph(element1, 'src');
          var morph0 = dom.createMorphAt(dom.childAt(element0, [1]),0,0);
          var morph1 = dom.createMorphAt(dom.childAt(element2, [0]),0,0);
          var morph2 = dom.createMorphAt(element3,0,0);
          var attrMorph1 = dom.createAttrMorph(element3, 'href');
          attribute(env, attrMorph0, element1, "src", get(env, context, "tweet.profile_image"));
          content(env, morph0, context, "tweet.screen_name");
          content(env, morph1, context, "tweet.text");
          attribute(env, attrMorph1, element3, "href", get(env, context, "tweet.url"));
          content(env, morph2, context, "tweet.created_at");
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("ul");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h1");
        dom.setAttribute(el1,"style","clear:both");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, block = hooks.block, inline = hooks.inline, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(dom.childAt(fragment, [0]),0,0);
        var morph1 = dom.createMorphAt(fragment,2,2,contextualElement);
        var morph2 = dom.createMorphAt(fragment,3,3,contextualElement);
        dom.insertBoundary(fragment, null);
        block(env, morph0, context, "each", [get(env, context, "model")], {"keyword": "tweet"}, child0, null);
        inline(env, morph1, context, "infinity-loader", [], {"infinityModel": get(env, context, "model")});
        content(env, morph2, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('ember-hatorade/templates/tweets', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.12.0",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("li");
          dom.setAttribute(el1,"class","media row list-group-item col-lg-12");
          var el2 = dom.createElement("img");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("h4");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("p");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("a");
          var el3 = dom.createComment("");
          dom.appendChild(el2, el3);
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, get = hooks.get, attribute = hooks.attribute, content = hooks.content;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var element0 = dom.childAt(fragment, [0]);
          var element1 = dom.childAt(element0, [0]);
          var element2 = dom.childAt(element0, [3]);
          var attrMorph0 = dom.createAttrMorph(element1, 'src');
          var morph0 = dom.createMorphAt(dom.childAt(element0, [1]),0,0);
          var morph1 = dom.createMorphAt(dom.childAt(element0, [2]),0,0);
          var morph2 = dom.createMorphAt(element2,0,0);
          var attrMorph1 = dom.createAttrMorph(element2, 'href');
          attribute(env, attrMorph0, element1, "src", get(env, context, "tweet.profile_image"));
          content(env, morph0, context, "tweet.screen_name");
          content(env, morph1, context, "tweet.text");
          attribute(env, attrMorph1, element2, "href", get(env, context, "tweet.url"));
          content(env, morph2, context, "tweet.created_at");
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.12.0",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("ul");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, block = hooks.block, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(dom.childAt(fragment, [0]),0,0);
        var morph1 = dom.createMorphAt(fragment,1,1,contextualElement);
        dom.insertBoundary(fragment, null);
        block(env, morph0, context, "each", [get(env, context, "model")], {"keyword": "tweet"}, child0, null);
        content(env, morph1, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('ember-hatorade/tests/adapters/application.jshint', function () {

  'use strict';

  module('JSHint - adapters');
  test('adapters/application.js should pass jshint', function() { 
    ok(true, 'adapters/application.js should pass jshint.'); 
  });

});
define('ember-hatorade/tests/app.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('app.js should pass jshint', function() { 
    ok(true, 'app.js should pass jshint.'); 
  });

});
define('ember-hatorade/tests/controllers/application.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/application.js should pass jshint', function() { 
    ok(false, 'controllers/application.js should pass jshint.\ncontrollers/application.js: line 1, col 16, \'Ember\' is not defined.\n\n1 error'); 
  });

});
define('ember-hatorade/tests/controllers/stream.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/stream.js should pass jshint', function() { 
    ok(false, 'controllers/stream.js should pass jshint.\ncontrollers/stream.js: line 7, col 16, Missing semicolon.\ncontrollers/stream.js: line 26, col 36, Missing semicolon.\ncontrollers/stream.js: line 7, col 5, \'self\' is not defined.\ncontrollers/stream.js: line 9, col 22, \'Faye\' is not defined.\ncontrollers/stream.js: line 12, col 26, \'self\' is not defined.\ncontrollers/stream.js: line 13, col 9, \'self\' is not defined.\ncontrollers/stream.js: line 26, col 5, \'self\' is not defined.\ncontrollers/stream.js: line 10, col 10, \'subscription\' is defined but never used.\ncontrollers/stream.js: line 11, col 13, \'data\' is defined but never used.\ncontrollers/stream.js: line 12, col 13, \'serializer\' is defined but never used.\n\n10 errors'); 
  });

});
define('ember-hatorade/tests/helpers/resolver', ['exports', 'ember/resolver', 'ember-hatorade/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('ember-hatorade/tests/helpers/resolver.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/resolver.js should pass jshint', function() { 
    ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('ember-hatorade/tests/helpers/start-app', ['exports', 'ember', 'ember-hatorade/app', 'ember-hatorade/router', 'ember-hatorade/config/environment'], function (exports, Ember, Application, Router, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('ember-hatorade/tests/helpers/start-app.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/start-app.js should pass jshint', function() { 
    ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('ember-hatorade/tests/models/hashtag.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/hashtag.js should pass jshint', function() { 
    ok(true, 'models/hashtag.js should pass jshint.'); 
  });

});
define('ember-hatorade/tests/models/tweet.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/tweet.js should pass jshint', function() { 
    ok(true, 'models/tweet.js should pass jshint.'); 
  });

});
define('ember-hatorade/tests/models/tweets.jshint', function () {

  'use strict';

  module('JSHint - models');
  test('models/tweets.js should pass jshint', function() { 
    ok(true, 'models/tweets.js should pass jshint.'); 
  });

});
define('ember-hatorade/tests/router.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('router.js should pass jshint', function() { 
    ok(true, 'router.js should pass jshint.'); 
  });

});
define('ember-hatorade/tests/routes/about.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/about.js should pass jshint', function() { 
    ok(true, 'routes/about.js should pass jshint.'); 
  });

});
define('ember-hatorade/tests/routes/hashtags.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/hashtags.js should pass jshint', function() { 
    ok(true, 'routes/hashtags.js should pass jshint.'); 
  });

});
define('ember-hatorade/tests/routes/home.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/home.js should pass jshint', function() { 
    ok(true, 'routes/home.js should pass jshint.'); 
  });

});
define('ember-hatorade/tests/routes/stream.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/stream.js should pass jshint', function() { 
    ok(false, 'routes/stream.js should pass jshint.\nroutes/stream.js: line 10, col 178, Missing semicolon.\nroutes/stream.js: line 11, col 37, Missing semicolon.\nroutes/stream.js: line 12, col 61, Missing semicolon.\nroutes/stream.js: line 13, col 48, Missing semicolon.\nroutes/stream.js: line 12, col 7, \'funtimes\' is not defined.\nroutes/stream.js: line 13, col 39, \'funtimes\' is not defined.\n\n6 errors'); 
  });

});
define('ember-hatorade/tests/routes/tweets.jshint', function () {

  'use strict';

  module('JSHint - routes');
  test('routes/tweets.js should pass jshint', function() { 
    ok(false, 'routes/tweets.js should pass jshint.\nroutes/tweets.js: line 5, col 36, Missing semicolon.\n\n1 error'); 
  });

});
define('ember-hatorade/tests/test-helper', ['ember-hatorade/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('ember-hatorade/tests/test-helper.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('test-helper.js should pass jshint', function() { 
    ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('ember-hatorade/tests/unit/adapters/application-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('adapter:application', 'Unit | Adapter | application', {});

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });

  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']

});
define('ember-hatorade/tests/unit/adapters/application-test.jshint', function () {

  'use strict';

  module('JSHint - unit/adapters');
  test('unit/adapters/application-test.js should pass jshint', function() { 
    ok(true, 'unit/adapters/application-test.js should pass jshint.'); 
  });

});
define('ember-hatorade/tests/unit/controllers/stream-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('controller:stream', {});

  // Replace this with your real tests.
  ember_qunit.test('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('ember-hatorade/tests/unit/controllers/stream-test.jshint', function () {

  'use strict';

  module('JSHint - unit/controllers');
  test('unit/controllers/stream-test.js should pass jshint', function() { 
    ok(true, 'unit/controllers/stream-test.js should pass jshint.'); 
  });

});
define('ember-hatorade/tests/unit/models/hashtags-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('hashtags', 'Unit | Model | hashtags', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('ember-hatorade/tests/unit/models/hashtags-test.jshint', function () {

  'use strict';

  module('JSHint - unit/models');
  test('unit/models/hashtags-test.js should pass jshint', function() { 
    ok(true, 'unit/models/hashtags-test.js should pass jshint.'); 
  });

});
define('ember-hatorade/tests/unit/models/tweet-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('tweet', 'Unit | Model | tweet', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('ember-hatorade/tests/unit/models/tweet-test.jshint', function () {

  'use strict';

  module('JSHint - unit/models');
  test('unit/models/tweet-test.js should pass jshint', function() { 
    ok(true, 'unit/models/tweet-test.js should pass jshint.'); 
  });

});
define('ember-hatorade/tests/unit/models/tweets-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleForModel('tweets', 'Unit | Model | tweets', {
    // Specify the other units that are required for this test.
    needs: []
  });

  ember_qunit.test('it exists', function (assert) {
    var model = this.subject();
    // var store = this.store();
    assert.ok(!!model);
  });

});
define('ember-hatorade/tests/unit/models/tweets-test.jshint', function () {

  'use strict';

  module('JSHint - unit/models');
  test('unit/models/tweets-test.js should pass jshint', function() { 
    ok(true, 'unit/models/tweets-test.js should pass jshint.'); 
  });

});
define('ember-hatorade/tests/unit/routes/about-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:about', 'Unit | Route | about', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('ember-hatorade/tests/unit/routes/about-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/about-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/about-test.js should pass jshint.'); 
  });

});
define('ember-hatorade/tests/unit/routes/hashtags-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:hashtags', 'Unit | Route | hashtags', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('ember-hatorade/tests/unit/routes/hashtags-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/hashtags-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/hashtags-test.js should pass jshint.'); 
  });

});
define('ember-hatorade/tests/unit/routes/home-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:home', 'Unit | Route | home', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('ember-hatorade/tests/unit/routes/home-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/home-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/home-test.js should pass jshint.'); 
  });

});
define('ember-hatorade/tests/unit/routes/stream-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:stream', 'Unit | Route | stream', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('ember-hatorade/tests/unit/routes/stream-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/stream-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/stream-test.js should pass jshint.'); 
  });

});
define('ember-hatorade/tests/unit/routes/tweets-test', ['ember-qunit'], function (ember_qunit) {

  'use strict';

  ember_qunit.moduleFor('route:tweets', 'Unit | Route | tweets', {});

  ember_qunit.test('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });

  // Specify the other units that are required for this test.
  // needs: ['controller:foo']

});
define('ember-hatorade/tests/unit/routes/tweets-test.jshint', function () {

  'use strict';

  module('JSHint - unit/routes');
  test('unit/routes/tweets-test.js should pass jshint', function() { 
    ok(true, 'unit/routes/tweets-test.js should pass jshint.'); 
  });

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('ember-hatorade/config/environment', ['ember'], function(Ember) {
  var prefix = 'ember-hatorade';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("ember-hatorade/tests/test-helper");
} else {
  require("ember-hatorade/app")["default"].create({"name":"ember-hatorade","version":"0.0.0.c33507f0"});
}

/* jshint ignore:end */
//# sourceMappingURL=ember-hatorade.map