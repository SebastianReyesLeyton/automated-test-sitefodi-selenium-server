import { JWT_USER_HEADER, JWT_HEADER_NAME } from '../../conf/jwt';

import AuthController from '../../modules/auth/controller/auth';
import AuthService from '../../modules/auth/services/auth';
import ResponseOBJ from '../../models/request';

describe('Authentication', () => {
    const service = new AuthService();
    const controller = AuthController;

    let response = new ResponseOBJ();

    it("Login - Bad body structure", async () => {
        let res = new ResponseOBJ();

        let req = {
            body: { 
                email: 'sebas.reyes2002asd@hotmail.com'
            }
        };

        await controller.login()(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.data.error).toBe('faltan parámetros');
    });

    it("Login - Bad body structure (more params)", async () => {
        let res = new ResponseOBJ();

        let req = {
            body: { 
                email: 'sebas.reyes2002asd@hotmail.com',
                password: 'Epyphone01',
                phone: '132456798'
            }
        };

        await controller.login()(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.data.error).toBe('el número de parámetros pasados es superior al solicitado');
    });

    it("Login - Bad email structure", async () => {
        let res = new ResponseOBJ();

        let req = {
            body: { 
                email: 'sebas.reyes2002asdhotmail.com', 
                password: 'Epyphone01'
            }
        };

        await controller.login()(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.data.error).toBe('no es un correo válido');
    });

    it("Login - Bad password long", async () => {
        let res = new ResponseOBJ();

        let req = {
            body: { 
                email: 'sebas.reyes2002@hotmail.com', 
                password: 'p'
            }
        };

        await controller.login()(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.data.error).toBe('la contraseña debe ser mayor a 8 caracteres');
    });

    it("Login - Email does not registers", async () => {
        let res = new ResponseOBJ();

        let req = {
            body: { 
                email: 'sebas.reyes2002asd@hotmail.com', 
                password: 'Epyphone01'
            }
        };

        await controller.login()(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.data.error).toBe('no existe un usuario con ese correo');
    });

    it("Login - Incorrect password", async () => {
        let res = new ResponseOBJ();

        let req = {
            body: { 
                email: 'sebas.reyes2002@hotmail.com', 
                password: 'Epyphone01*'
            }
        };

        await controller.login()(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.data.error).toBe('las contraseñas no coinciden');
    });
    
    it("Login - Correct sign-in", async () => {
        let res = new ResponseOBJ();

        let req = {
            body: { 
                email: 'sebas.reyes2002@hotmail.com', 
                password: 'Epyphone01'
            }
        };

        await controller.login()(req, res);
        expect(res.statusCode).toBe(200);

        response = res;
    });


    it("Get access token - Bad body structure", async () => {
        let res = new ResponseOBJ();

        let req = {
            body: { 
                token: response.data.token
            }
        };

        await controller.getAccessToken()(req, res);
        expect(res.statusCode).toBe(400);
    });

    it("Get access token - Bad user id", async () => {
        let res = new ResponseOBJ();

        let req = {
            body: {
                id: 'id', 
                token: response.data.token
            }
        };

        await controller.getAccessToken()(req, res);
        expect(res.statusCode).toBe(400);
    });

    it("Get access token - Bad token", async () => {
        let res = new ResponseOBJ();

        let req = {
            body: {
                id: String(response.data.user.id),
                token: response.data.token
            }
        };

        await controller.getAccessToken()(req, res);
        expect(res.statusCode).toBe(401);
    });

    it("Get access token - Successfully", async () => {
        let res = new ResponseOBJ();

        let req = {
            body: { 
                id: String(response.data.user.id),
                token: service.__extractRefreshToken(response.data.token)
            }
        };

        await controller.getAccessToken()(req, res);
        expect(res.statusCode).toBe(200);
    });


    it("Logout - without tokenData attribute", async () => {
        let res = new ResponseOBJ();

        let req = {
            header(params) {
                if (params == JWT_USER_HEADER) return response.data.user.id
                else return response.data.token 
            }
        };

        await controller.logout()(req, res);
        expect(res.statusCode).toBe(500);
        expect(res.data.error).toBe(`Cannot read properties of undefined (reading 'id')`);
    });

    it("Logout - with tokenData id different to logout user", async () => {
        let res = new ResponseOBJ();

        let req = {
            header(params) {
                if (params == JWT_USER_HEADER) return 2
                else return response.data.token 
            },
            tokenData: response.data.user,
        };

        await controller.logout()(req, res);
        expect(res.statusCode).toBe(401);
        expect(res.data.error).toBe('inconsistencia en la petición');
    });

    it("Logout - with bad user header id", async () => {
        let res = new ResponseOBJ();

        let req = {
            header(params) {
                if (params == JWT_USER_HEADER) return 'user_id'
                else return response.data.token 
            },
            tokenData: response.data.user,
        };

        await controller.logout()(req, res);
        expect(res.statusCode).toBe(400);
        expect(res.data.error).toBe('el encabezado de usuario no tiene el tipo adecuado');
    });

    it("Logout - successfull", async () => {
        let res = new ResponseOBJ();

        let req = {
            header(params) {
                if (params == JWT_USER_HEADER) return response.data.user.id
                else return response.data.token 
            },
            tokenData: response.data.user,
        };

        await controller.logout()(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.data.message).toBe('sesión cerrada con exito');
    });

    
    it("Create token - object without id attribute", async () => {
        const obj = { 
            user: 'Sebastian'
        };

        let res = await service.createToken(obj);
        expect(res).toBe(undefined);
    });

}); 

