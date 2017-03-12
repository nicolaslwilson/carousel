//This code is a translation of Java's String.hashCode() method, sourced from
//http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
String.prototype.hashCode = function(){
	var hash = 0;
	if (this.length === 0) return hash;
	for (i = 0; i < this.length; i++) {
		chr = this.charCodeAt(i);
		hash = ((hash<<5)-hash)+chr;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
};
