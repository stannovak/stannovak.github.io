var impfLoader = {
    _container: null,
    _params: {},
    _oid: null,
    _parseURL:function() {
        var scripts = document.getElementsByTagName('script');
        var len = scripts.length;
        var URL = '';
        for(var i = 0; i < len; i++) {
            if(scripts[i].src.indexOf("impf_widget.js") > 0 && scripts[i].src.lastIndexOf("/") >= 0) {
                URL = scripts[i].src;
                break;
            }
        }
        var search = URL.split('?');
        if (search.length > 1) {
            search = search[1].split('&');
            for (var idx in search) {
                if (search[idx].length) {
                    var param = search[idx].split('=');
                    if (param.length) {
                        this._params[param[0]] = param[1];
                        if (param[0] == 'oid') {
                            this._oid = parseInt(param[1]);
                        }
                    }
                }
            }
        }
        //console.log('Parsed URL:');
        //console.log(this._params);
    },
    start:function() {
        this._parseURL();
        this._initContainer();
        if (!this._oid) {
            console.log('There is no Organization ID assigned. Please add ?oid=YOUR_ORGANIZATION_ID to URL')
            return;
        }
        if (!this._container) {
            console.log('There is no container assigned for ImpactFactor widget. Please use ?id=container_id in URL or add DIV element with id "__impf_widget" to the page')
            return;
        }
        var minWidth = 600;
        var minHeight = 640;
        var iframe = document.createElement('iframe');
        var cWidth = this._container.clientWidth;
        var cHeight = this._container.clientHeight;
        if (cWidth < minWidth) {
            cWidth = minWidth;
        }
        if (cHeight < minHeight) {
            cHeight = minHeight;
        }

        this._container.innerHTML =
            '<style>' +
            '@keyframes blink {0% {opacity: .2;}20% {opacity: 1;}100% {opacity: .2;}}'+
            '#__impf_loading {text-align: center; margin-top: '+parseInt((cHeight-30)/2)+'px; font-size: 24pt; color: gray; width: '+cWidth+'px}'+
            '#__impf_loading span {animation-name: blink;animation-duration: 1.4s;animation-iteration-count: infinite;animation-fill-mode: both;}'+
            '#__impf_loading span:nth-child(2) {animation-delay: .2s;}'+
            '#__impf_loading span:nth-child(3) {animation-delay: .4s;}'+
            '</style>'+
            '<div id="__impf_loading">' +
            'Loading<span>.</span><span>.</span><span>.</span>' +
            '</div>';

        iframe.width = cWidth;
        iframe.style.display = 'none';
        iframe.height = cHeight;
        iframe.style.border = 'none';
        iframe.id = '__impf_widget_frame';
        iframe.src = 'impf_widget_' + this._oid + '.html';
        this._container.appendChild(iframe);
        iframe.onload = function() {
            console.log('frame loaded');
            document.getElementById('__impf_widget_frame').style.display = 'block';
            document.getElementById('__impf_loading').style.display = 'none';
        }
    },
    _initContainer:function() {
        this._container = document.getElementById('__impf_widget');
        if (!this._container) {
            // look for specific ID of container from URL
            for (var key in this._params) {
                if (key == 'id') {
                    this._container = document.getElementById(this._params[key]);
                }
            }
        }
    },
};
impfLoader.start();
