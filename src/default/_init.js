
iScroll.prototype._init = function () {

	this._initEvents();

	if ( this.options.scrollbars || this.options.indicators ) {
		this._initIndicators();
	}

	if ( this.options.snap ) {
		this._initSnap();
	}

	if ( this.options.mouseWheel ) {
		this._initWheel();
	}

	if ( this.options.keyBindings ) {
		this._initKey();
	}

	if ( this.options.zoom ) {
		this._initZoom();
	}

	if ( this.options.probeType ) {
		this._initProbe();
	}
};
