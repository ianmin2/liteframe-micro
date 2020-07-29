 //* EXTEND Object to cater for {{Object}}.keys  {{ FAILED TO USE "keys" DUE TO MONGOOSE IMPLEMENTATION }} **/
 const getKeys = function() {
     try {
         let k = [];
         for (let p in this) {
             if (this.hasOwnProperty(p))
                 k.push(p);
         }
         return k;
     } catch (e) {
         return [this];
     }

 };
 Object.defineProperty(Object.prototype, "getKeys", { value: getKeys, enumerable: false });


 //** EXTEND Object to cater for {{Object}}.forEach [Avoided using .forEach due to conflicts with bluebird and other libraries]**/
 const foreach = function(cb) {

     if (cb) {

         for (let objKey in this) {
             cb(this[objKey], objKey);
         }

     } else {
         console.log("\nCannot run a forEach on an object where no callback is defined.\n".err);
     }

 };
 Object.defineProperty(Object.prototype, 'foreach', { value: foreach, enumerable: false });
 Object.defineProperty(Object.prototype, 'for_each', { value: foreach, enumerable: false });

 Object.filter = (obj, predicate) =>
     Object.keys(obj)
     .filter(key => predicate(obj[key]))
     .reduce((res, key) => Object.assign(res, {
         [key]: obj[key]
     }), {});
 //   .reduce( (res, key) => (res[key] = obj[key], res), {} );

 // Object.defineProperty(Object.prototype, 'filter', {value:filter, enumerable:false} );

 //@ CHECK IF OBJECT IS EMPTY
 if (!Object.prototype.isEmpty) {
     function isEmpty() {
         Object.keys(this).length === 0;
     }

     Object.defineProperty(Object.prototype, 'isEmpty', { value: isEmpty, enumerable: false });
 }