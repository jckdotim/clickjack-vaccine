// ==UserScript==
// @name         Clickjack Vaccine
// @match        http://*/*
// @namespace    ClickjackVaccine
// @include      *
// @author       JC Kim <like@shinv.ee>
// @description  This userscript detects clickjacking.
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

addJQuery(function() {
	jQuery.noConflict();
	var prescription = 'p'+Math.floor(Math.random()*10000);
    jQuery('iframe').live('mouseover', function() {
        if(jQuery(this).hasClass(prescription)) {
            jQuery(this).die('mouseover');
            return;
        }
        element = jQuery(this);
        while(element != null && !element.is('body')) {
            if(element.css('opacity') < 1) {
                alert("Clickjack code has been detected. Don't use this web page.");
                element.css('opacity', 1);
            }
            element = element.parent();
        }
        jQuery(this).addClass(prescription);
    });
});
