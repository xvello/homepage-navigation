Seamless navigation bar to switch between self-hosted services
==================

I self-host a lot of services on my server : Roundcube, ownCloud, Tiny Tiny RSS, Munin, phpMyAdmin... This static webpage allows to browse from one to another in a seamless way.

![Screenshot](https://github.com/xvello/homepage-navigation/raw/master/screenshot.png)

##How does it work?##
The applications are embedded in a iframe 

##Requirements##
- All the services must be hosted on the same domain for full functionnality
- Some applications (ownCloud, phpMyAdmin...) have cross-site scripting protections, you have to remove them

##Configuration##
- Just modify index.htm to change the links you want to see. Icons are Fontawesome, look at the [cheatsheet](http://fortawesome.github.io/Font-Awesome/cheatsheet/) to find the unicode codes.
- Default start page is [duckduckgo](https://www.duckduckgo.com), you can change it by modifying the src attribe on the iframe element.

##Tips##
- If you bookmark the page after loading a link, it will always load this link (using the HTML anchor in the URL).
