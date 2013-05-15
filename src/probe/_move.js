
iScroll.prototype._move = function (e) {
	if ( !this.enabled || utils.eventType[e.type] !== this.initiated ) {
		return;
	}

	if ( this.options.preventDefault ) {	// increases performance on Android? TODO: check!
		e.preventDefault();
	}

	var point		= e.touches ? e.touches[0] : e,
		deltaX		= point.pageX - this.pointX,
		deltaY		= point.pageY - this.pointY,
		timestamp	= utils.getTime(),
		newX, newY,
		absDistX, absDistY;

	this.pointX		= point.pageX;
	this.pointY		= point.pageY;

	this.distX		+= deltaX;
	this.distY		+= deltaY;
	absDistX		= Math.abs(this.distX);
	absDistY		= Math.abs(this.distY);

	// We need to move at least 10 pixels for the scrolling to initiate
	if ( timestamp - this.endTime > 300 && (absDistX < 10 && absDistY < 10) ) {
		return;
	}

	// If you are scrolling in one direction lock the other
	if ( !this.directionLocked && this.options.lockDirection ) {
		if ( absDistX > absDistY + this.directionLockThreshold ) {
			this.directionLocked = 'h';		// lock horizontally
		} else if ( absDistY >= absDistX + this.directionLockThreshold ) {
			this.directionLocked = 'v';		// lock vertically
		} else {
			this.directionLocked = 0;		// no lock
		}
	}

	if ( this.directionLocked == 'h' ) {
		if ( this.options.eventPassthrough == 'vertical' ) {
			e.preventDefault();
		} else if ( this.options.eventPassthrough == 'horizontal' ) {
			this.initiated = false;
			return;
		}

		deltaY = 0;
	} else if ( this.directionLocked == 'v' ) {
		if ( this.options.eventPassthrough == 'horizontal' ) {
			e.preventDefault();
		} else if ( this.options.eventPassthrough == 'vertical' ) {
			this.initiated = false;
			return;
		}

		deltaX = 0;
	}

	newX = this.x + (this.hasHorizontalScroll ? deltaX : 0);
	newY = this.y + (this.hasVerticalScroll ? deltaY : 0);

	// Slow down if outside of the boundaries
	if ( newX > 0 || newX < this.maxScrollX ) {
		newX = this.options.bounce ? this.x + deltaX / 3 : newX > 0 ? 0 : this.maxScrollX;
	}
	if ( newY > 0 || newY < this.maxScrollY ) {
		newY = this.options.bounce ? this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY;
	}

	this.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
	this.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

	this.moved = true;

	this._translate(newX, newY);

	if ( timestamp - this.startTime > 300 ) {
		this.startTime = timestamp;
		this.startX = this.x;
		this.startY = this.y;

		if ( this.options.probeType == 1 ) {
			this._execCustomEvent('scroll');
		}
	}

	if ( this.options.probeType > 1 ) {
		this._execCustomEvent('scroll');
	}
};
