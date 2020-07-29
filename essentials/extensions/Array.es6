//@ Capitalize string values in an array **/
Array.prototype.capitalize = function() {
    try {
        return this.map(d => {
            if (typeof(d) == "string") {
                return d.capitalize();
            } else {
                return d;
            }
        }, []);
    } catch (e) {
        return [e, this];
    }

};

//@ ENABLE THE SIMPLE REPLACEMENT OF STRINGS THROUGH THE Array.replace **/
Array.prototype.replace = function(regex, replacement) {
    try {
        return this.map(e => {
            if (typeof(e) == "string") {
                return e.replace(regex, replacement)
            } else {
                return e;
            }
        }, []);
    } catch (e) {
        return [e, this];
    }
};

//@ ALLOW PROTOTYPICAL REMOVAL OF MULTIPLE ELEMENTS BY POSITION **/
Array.prototype.remove = function(rmIndices) {

    try {

        if (Array.isArray(this)) {

            //@ Handle multiple removals
            if (Array.isArray(rmIndices)) {
                for (let i = rmIndices.length - 1; i >= 0; i--) {
                    this.splice(rmIndices[i], 1);
                }
                return this;

            }
            //@ Handle a single removal
            else if (!isNaN(rmIndices)) {
                this.splice(rmIndices, 1);
                return this;
            }
            //@ Attempt Stop errors in their tracks
            else {
                return this;
            }
        } else {
            return this;
        }
    } catch (e) {
        return [e, this];
    }
};

//* COUNT INSTANCES OF A VALUE 'val' IN AN ARRAY **/
Array.prototype.count = function(val) {

    try {

        if (val === undefined) {
            return this.length;
        } else {
            let counter = 0;
            this.forEach(function(ElementValue, ElementPosition) {
                if (val == ElementValue) {
                    counter++;
                }
            });

            return counter;

        }

    } catch (e) {
        return [e, this];
    }

};

//@ GET AN ARRAY OF UNIQUE VALUES AND THEIR FREQUENCY IN THE ORDER [item,frequency]
Array.prototype.get_count = function() {

    try {

        let itm, a = [],
            L = this.length,
            o = {};

        for (let i = 0; i < L; i++) {
            itm = this[i];
            if (!itm) continue;
            if (o[itm] == undefined) o[itm] = 1;
            else ++o[itm];
        }

        for (let p in o) a[a.length] = [p, o[p]];

        return a.sort(function(a, b) {
            return o[b[0]] - o[a[0]];
        });

    } catch (e) {
        return [e, this];
    }

};
Array.prototype.getCount = Array.getDistribution = Array.prototype.get_count;

//@ ARRAY FAST UNIQUE */
Array.prototype.unique = function() {

    try {

        let sorted = this;

        sorted.sort();

        return sorted.filter(function(value, index, arr) {

            return (index < 1) ? true : (value != arr[index - 1]);

        });
    } catch (e) {
        return [e, this];
    }

};

//@ REMOVE A VALUE FROM AN ARRAY
Array.prototype.clean = function(deleteValue = [undefined, null, '']) {

    try {


        deleteValue = Array.isArray(deleteValue) ? deleteValue : deleteValue.split(',');

        return this.filter(d => { return (deleteValue.indexOf(d) === -1); });

    } catch (e) {
        return [e, this];
    }

};

//@ GET THE SUM OF ALL VALUES IN AN ARRAY
Array.prototype.sum = function() {

    try {

        return this.reduce(function(prev, curr) {
            //@ filter out non numerics by replacing them with a zero
            return (parseInt(prev) || 0) + (parseInt(curr) || 0);
        }, 0);

    } catch (e) {
        return [e, this];
    }
};

//@ GET THE MEAN OF ALL VALUES IN AN ARRAY
Array.prototype.mean = function() {
    try {
        return (this.reduce(function(a, b) { return (parseInt(a) || 0) + (parseInt(b) || 0) }, 0) / this.length)
    } catch (e) {
        return [e, this];
    }
};