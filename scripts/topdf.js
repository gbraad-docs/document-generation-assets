"use strict";
var page = require('webpage').create(),
    system = require('system'),
    address = system.args[1],
    output = system.args[2],
    paperSize;

page.viewportSize = { width: 600, height: 600 };
paperSize = { format: "A4", orientation: 'portrait', margin: '1cm' };
if(system.args.length > 3) { page.zoomFactor = system.args[3]; }
if(system.args.length > 4) { paperSize.format = system.args[4]; }
page.paperSize = paperSize;
page.open(address, function (status) {
    if (status !== 'success') {
        console.log('Unable to load the address!');
        phantom.exit(1);
    } else {
        window.setTimeout(function () {
            var zoom = page.zoomFactor;
            page.evaluate(function(zoom) {
                return document.querySelector('body').style.zoom = zoom;
            }, zoom);

            page.render(output);
            phantom.exit();
        }, 200);
    }
});
