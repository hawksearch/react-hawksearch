interface String {
	clearMultipleSlashes(): string;
}

String.prototype.clearMultipleSlashes = function() {
	return this.replace(/\/\/+/g, '/');
};
