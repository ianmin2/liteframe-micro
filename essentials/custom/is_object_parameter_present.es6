const isPresent = (object, paramsArray) => {

    let process = (p_Array = []) => {
        const keys = (typeof(object) == 'string' || typeof(object) == 'number') ? [object] :
            Object.keys(object);

        return (p_Array.filter(p_val => keys.indexOf(p_val) != -1).length) ? true : false;
    };

    return Array.isArray(paramsArray) ?
        process(paramsArray) :
        process(
            (typeof(paramsArray) == "string") ?
            paramsArray.split(',') : []
        );

}

let _IS_PRESENT = isPresent;

//@ Check if the specified properties are present in an object
module.exports = { isPresent, _IS_PRESENT };