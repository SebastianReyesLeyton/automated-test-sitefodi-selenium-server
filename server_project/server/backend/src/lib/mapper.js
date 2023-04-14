import { dtoValidator } from './validator';

class Mapper {

    constructor () {
        this.obj;       // Will store the mapped object
    }

    map( dto, type, callback ) {

        // Create an instance of the class 
        this.obj = Object.assign({}, type);

        // Transform the dto keys names
        let obj = callback(dto);

        try {

            // Validate the dto keys
            dtoValidator( obj, this.obj );

            // If the dto correspond with the obj attributes, fill the attributes. But reset the obj value
            Object.assign( this.obj, obj );
            
        } catch (err) {

            // Reset the obj value and throw the err
            this.obj = undefined;
            throw err;
            
        }


    }
}

export default Mapper;