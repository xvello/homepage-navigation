Seamless navigation bar to switch between self-hosted services
==================

I self-host a lot of services on my server : Roundcube, ownCloud, Tiny Tiny RSS, Munin, phpMyAdmin... This static webpage allows to browse from one to another in a seamless way.

![Screenshot](https://github.com/xvello/homepage-navigation/raw/master/screenshot.gif)

##How does it work?##
The applications are embedded in a iframe while the navigation bar stays from click to click.
Some javascript improves the experience (synchronising title and favicon, changing the URL hash, ...) but is completely optional.

##Requirements##
- All the services must be hosted on the same domain for full functionnality
- Some applications (ownCloud, phpMyAdmin...) have cross-site scripting protections, you have to disable it

##Configuration##
The configuration is stored in the config.json file. You can use config.json.sample as a starting point.

* "horizontal" : true for a horizontal navbar, false for a vertical one (default)
* "startpage" : default URL to load (absolute or relative)
* "links" : array of navbar elements :
  * empty objects will add a spacer
  * valid links must have these properties :
    * "url" : URL (absolute or relative) to load
    * "icon" : icon string, from http://fontawesome.io/cheatsheet/
    * "title" (optional) : tooltip

##Tips##
- If you bookmark the page after loading a link, it will always load this link (using the HTML anchor in the URL).
