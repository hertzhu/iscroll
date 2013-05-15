
iScroll.prototype._initWheel = function () {
	utils.addEvent(this.wrapper, 'mousewheel', this);
	utils.addEvent(this.wrapper, 'DOMMouseScroll', this);

	this.on('destroy', function () {
		utils.removeEvent(this.wrapper, 'mousewheel', this);
		utils.removeEvent(this.wrapper, 'DOMMouseScroll', this);
	});
};

iScroll.prototype._wheel = function (e) {
	var wheelDeltaX, wheelDeltaY,
		newX, newY,
		that = this;

	// Execute the scroll end event after 400ms the wheel stopped scrolling
	clearTimeout(this.wheelTimeout);
	this.wheelTimeout = setTimeout(function () {
		that._execCustomEvent('scrollEnd');
	}, 400);

	e.preventDefault();

	if ( 'wheelDeltaX' in e ) {
		wheelDeltaX = e.wheelDeltaX / 10;
		wheelDeltaY = e.wheelDeltaY / 10;
	} else if ( 'wheelDelta' in e ) {
		wheelDeltaX = wheelDeltaY = e.wheelDelta / 10;
	} else if ( 'detail' in e ) {
		wheelDeltaX = wheelDeltaY = -e.detail * 4;
	} else {
		return;
	}

	if ( !this.hasVerticalScroll && wheelDeltaX === 0 ) {
		wheelDeltaX = wheelDeltaY;
	}

	newX = this.x + (this.hasHorizontalScroll ? wheelDeltaX * this.options.invertWheelDirection : 0);
	newY = this.y + (this.hasVerticalScroll ? wheelDeltaY * this.options.invertWheelDirection : 0);

	if ( newX > 0 ) {
		newX = 0;
	} else if ( newX < this.maxScrollX ) {
		newX = this.maxScrollX;
	}

	if ( newY > 0 ) {
		newY = 0;
	} else if ( newY < this.maxScrollY ) {
		newY = this.maxScrollY;
	}

	this.scrollTo(newX, newY, 0);
};
