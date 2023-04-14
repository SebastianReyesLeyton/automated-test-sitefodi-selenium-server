const emailValidator = ( email ) => {

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) throw new Error('no es un correo válido');

}

const integerValidator = ( number ) => {
    if ( isNaN(number) ) throw new Error('no es un número entero')
    else if ( typeof number == 'string' && number.split('.').length > 1 ) throw new Error('no es un número entero')
    return Number(number);
}

const stringValidator = ( str, name='' ) => {
    
    if ( str.indexOf("'") === 0 ) throw new Error("no se admite el carácter ', favor usar doble comilla");
    else if ( !str.length ) throw new Error(`campo ${name} vacio`.trim());
    return str.trim();
}

const passwordValidator = ( password ) => {

    if ( password.length < 8 ) throw new Error("la contraseña debe ser mayor a 8 caracteres");

}

const docNumValidator = ( docnum ) => {
    
    if ( docnum.length > 20 ) throw new Error("el número de documento excede el máximo número de caracteres");

}

const isActiveValidator = ( state ) => {
    let dic = { active: 1, disabled: 0 };
    if ( !(state in dic) ) throw new Error("opción de estado no válida");
    return dic[state];
}

const dateValidator = ( d ) => {

    const regex = /^\d{4}\/\d{2}\/\d{2}$/;
    if ( d.match(regex) === null ) throw new Error("formato de fecha no válido");
    dateValueValidator(d);
}

const dateValueValidator = ( d ) => {
    const isoFormat = d.split('/').join('-');
    const date = new Date(isoFormat);
    const timestamp = date.getTime();

    if ( typeof timestamp !== 'number' || Number.isNaN(timestamp)) throw new Error("fecha no válida");
}

const dtoValidator = ( dto, obj ) => {

    // Get keys both dto param and obj param
    const dtoKeys = Object.keys(dto);
    const objKeys = Object.keys(obj);

    // Create two arrays where will be stored the matches and unmatched keys between the obj and dto
    let unmatched = [], match = [];

    // Obtain the mach and unmatched keys
    dtoKeys.forEach( e => {
        if (typeof obj[e] == 'undefined') unmatched.push(e);
        else if (typeof dto[e] !== typeof obj[e]) unmatched.push(e);
        else match.push(e);
    });

    // Response evaluation
    if ( match.length == objKeys.length && unmatched.length != 0 ) {
        throw {
            statusCode: 400,
            error: 'el número de parámetros pasados es superior al solicitado'
        };
    } else if ( match.length != objKeys.length && unmatched.length != 0) {
        throw{
            statusCode: 400,
            error: 'faltan parámetros y hay parámetros innecesarios'
        };
    } else if ( match.length != objKeys.length ) {
        throw {
            statusCode: 400,
            error: 'faltan parámetros'
        };
    }
}

export { dateValidator, dateValueValidator, docNumValidator, dtoValidator,  emailValidator, integerValidator, isActiveValidator, stringValidator, passwordValidator, };

// Regex: https://www.w3resource.com/javascript/form/email-validation.php