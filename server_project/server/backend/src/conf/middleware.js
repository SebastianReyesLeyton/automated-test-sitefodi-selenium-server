import cors from 'cors';
import express from 'express';
import formData from 'express-form-data';

import { FORM_OPTIONS } from './server';

function build ( app ) {

    // Accept data from forms
    app.use(express.urlencoded({extended: true}));

    // Parse data with connect-multiparty
    app.use(formData.parse(FORM_OPTIONS));

    // Delete from the request all empty files (size == 0)
    app.use(formData.format());

    // Change the file objects to fs.ReadStream
    app.use(formData.stream());

    // Union the body and the files
    app.use(formData.union());

    // Accept remote requests
    app.use(cors({
        origin: '*'
    }));

    console.log('\x1b[32m[+] Middleware status: Set up.\x1b[0m')

}

export default build