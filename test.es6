
//@ Allow framework functionality injection [this method does not allow explicit module content overwriting]
// inject("extension_key",extension_object_value);
// inject([{extension_key:extension_object_value},{extension_key:extension_object_value}]);

let framify = {
    ian : "intact",
    inject : function( nom, objet ) 
    {
        //@ Handle multiple definitions
        if(Array.isArray(nom))
        {

            let response = [];

            nom.forEach( injection_object => {

                let kys = Object.keys(injection_object);
                let vls = Object.values(injection_object);

                let rsp = [];

                if(kys[0])
                {
                    kys.forEach( (val,idx) =>
                    {
                        if(this[val]!=null)
                        {
                            rsp.push(false);
                        }
                        else
                        {
                            try
                            {

                                this[val] = vls[idx];

                                rsp.push(true);

                            }
                            catch(e)
                            {
                                rsp.push(false);
                            }
                            
                        }
                    });
                }
                else
                {
                    rsp.push(false);
                }

                response.push(rsp);            
                

            });  
            
            return response;
        }
        else
        {

            if(this[nom] != null) return false;
            try
            {
                this[nom] = objet;
                return true;
            }
            catch(e)
            {
                return false;
            }
            
        }
       
    }
};

console.log(`Injected ... ${framify.inject( [
    { 
        "ianmin2": { nom : "Ian Innocent", age: 27 },
        "ianmin3": { nom : "Still Me", comment : "Your dynamic injection seems to be working", ian : "This should work"},
        ian : "This shouldn't work"
    },
    {"ian":"This shouldn't work either"}
])}]`);

console.dir(framify);