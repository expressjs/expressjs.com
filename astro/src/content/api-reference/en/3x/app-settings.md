<h3 id='app-settings'>settings</h3>

The following settings are provided to alter how Express will behave:

* `env` Environment mode, defaults to process.env.NODE_ENV or "development"
* `trust proxy` Enables reverse proxy support, disabled by default
* `jsonp callback name` Changes the default callback name of ?callback=
* `json replacer` JSON replacer callback, null by default
* `json spaces` JSON response spaces for formatting, defaults to 2 in development, 0 in production
* `case sensitive routing` Enable case sensitivity, disabled by default, treating "/Foo" and "/foo" as the same
* `strict routing` Enable strict routing, by default "/foo" and "/foo/" are treated the same by the router
* `view cache` Enables view template compilation caching, enabled in production by default
* `view engine` The default engine extension to use when omitted
* `views` The view directory path, defaulting to "process.cwd() + '/views'"
  
