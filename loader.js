
function load(){
const l = new Loader();
            l.require([
                "classTarea.js",
                "classContenedor.js",
                "classProyecto.js",
                "pruebasFunciones0.js"],
                function() {
                    // Callback
                    console.log('All Scripts Loaded si k si');
                }
        );
}

const Loader = function () {};
Loader.prototype = {
    require: function (scripts, callback) {
        this.loadCount      = 0;
        this.totalRequired  = scripts.length;
        this.callback       = callback;

        for (var i = 0; i < scripts.length; i++) {
            this.writeScript(scripts[i]);
            console.log('-->'+scripts[i]);
        }
    },
    loaded: function (evt) {
        this.loadCount++;

        if (this.loadCount === this.totalRequired && typeof this.callback == 'function') this.callback.call();
    },
    writeScript: function (src) {
        let self = this;
        let s = document.createElement('script');
        s.type = "text/javascript";
        s.async = true;
        s.src = src;
        s.addEventListener('load', function (e) { self.loaded(e); }, false);
        let head = document.getElementsByTagName('head')[0];
        head.appendChild(s);
    }
};

