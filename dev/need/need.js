(function(D) {

    'use strict';

    var Need = {

        elements: null,
        basicSelection: '*[data-need]',
        defaultSettings: {
            'onscroll': 'true',
            'classLoaded': 'loaded',
            'classloading': 'loading'
        },
        debugReport: [],
        errorbox: {
            wrongDataParam: 'Given data-param is not qualified. May be is JSON is not formed properly',
            noSupportAvailable: 'browser is too old to run "Need"'
        },
        basicSupport: function() {
            var pass = true;

            if (D.querySelectorAll === undefined) {
                pass = false;
            }

            return pass;
        },
        load: function(container, source, callback) {

            var req = new XMLHttpRequest();
            req.onreadystatechange = function() {
                if (req.readyState == 4 && req.status == 200) {
                    callback(req.responseText);
                }

            };
            console.log(window.location);
            req.open("GET", source, true);
            req.send();

        },
        loadStart: function() {
            this.elements = D.querySelectorAll(this.basicSelection);
            if (this.elements.length !== 0) {
                var i = 0;
                var attr = this.basicSelection.replace('*[', '').replace(']', '');
                while (i < this.elements.length) {

                    this.load(this.elements.item(i), this.elements.item(i).getAttribute(attr), function(response) {

                        console.log(response);

                    });

                    i++;
                }
            }
        },
        need: function() {
            if (this.basicSupport()) {
                var localSettings = D.querySelector('script[src*="need.js"]').getAttribute('data-param');
                this.settings = this.defaultSettings;
                if (localSettings !== undefined && localSettings !== null) {
                    try {
                        this.settings = JSON.parse(localSettings);
                    } catch (e) {
                        this.settings = this.defaultSettings;
                        throw this.errorbox.wrongDataParam;
                    }
                }

                this.loadStart();
            } else {
                alert(this.errorbox.noSupportAvailable);
            }

        }

    };
    Need.report = function() {
        var idstr = 'report' + (new Date()).getTime();
        var reportDiv = document.createElement('div');
        reportDiv.setAttribute('id', idstr);
        document.body.appendChild(reportDiv);
    };
    window.onload = function() {
        Need.need();
        Need.report();
    }

})(document);