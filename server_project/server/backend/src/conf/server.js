import os from 'os';

const PORT = process.env.BACKEND_PORT,
      HOST = process.env.BACKEND_HOST,
      FORM_OPTIONS = {
        uploadDir: os.tmpdir(),
        autoClean: true
      }

export {
    PORT,
    HOST,
    FORM_OPTIONS
}