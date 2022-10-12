import { Router } from "express"

import { check } from "express-validator";
import { validarRol } from "../middlewares/validar-rol.js";
// import usuario from "../models/usuario.js";

import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
// import validarExistaArchivo from "../middlewares/validar-exita-archivo.js";
import helpersUsuario from "../helpers/usuario.js";
import { usuarioGetBuscar, usuarioGetBuscarDir, usuarioGetBuscarid, usuarioGetBuscarNoE, usuarioGetlogin, usuarioPost, usuarioPutActivar, usuarioPutEditar, usuarioPutInactivar, usuarioPutVacaciones } from "../controllers/usuario.js";
//import {existeRol} from "../helpers/usuario.js"

const router = Router();


//ya..esditar..
router.put("/:id", [
    check('id').isMongoId(),
    validarJWT,
    check('nombre', "El nombre es obligatoro").not().isEmpty(),
    check('documento', "Es Obligatorio el documento").not().isEmpty(),
    check('direccion', "Es Obligatorio este campo").not().isEmpty(),
    check('ciudad', "Es Obligatorio este campo").not().isEmpty(),
    check('contacto', "Es Obligatorio este campo").not().isEmpty(),
    check('telefono', "Es Obligatorio el telefono").not().isEmpty(),
    check('correo', "Es Obligatorio").not().isEmpty(),
    check('correo', "No es un email valido").isEmail(),
    check('password', "Es Obligatorio este campo").not().isEmpty(),
    check('password', "Debe tener más de 8 caracteres").isLength({ min: 8 }),
    check('rol', "Es Obligatorio el rol").not().isEmpty(),
    validarRol("Director", "Auxiliar",),
    validarCampos
], usuarioPutEditar);

//ya....login

router.post("/login", [
    check('correo', "el correo es obligatorio").isEmail(),
    check('password', "la contraseña es obligatoria").not().isEmpty(),
    validarCampos
], usuarioGetlogin);

//ya....buscar todos
router.get("/b", [
    validarJWT,
    validarRol("Director", "Auxiliar",),
    validarCampos
], usuarioGetBuscar);

//ya....buscar nombre, email, telefono,documento y rol 
router.get("/NoE", [
    validarJWT,
    validarRol("Director", "Auxiliar",),
    validarCampos
], usuarioGetBuscarNoE);

//ya....buscar por id 
router.get("/buscarid/:id", [
    validarJWT,
    validarRol("Director", "Cientifico", "Auxiliar",),
    check('id').isMongoId(),
    validarCampos
], usuarioGetBuscarid)

//ya....buscar porciudad
router.get("/ciudad/:ciudad", [
    validarJWT,
    validarRol("Director", "Auxiliar",),
    // check('Ciudad',"Es Obligatorio este campo").not().isEmpty(),
    check('ciudad', "no es una ciudad ").isMongoId(),



    validarCampos
], usuarioGetBuscarDir);
//ya....
router.put("/activar/:id", [
    validarJWT,
    validarRol("Director"),
    check('id').isMongoId(),
    validarCampos
], usuarioPutActivar);
//ya....
router.put("/inactivar/:id", [
    validarJWT,
    validarRol("Director"),
    check('id').isMongoId(),
    validarCampos
], usuarioPutInactivar);

//ya....
router.put("/vacaciones/:id", [
    validarJWT,
    validarRol("Director"),
    check('id').isMongoId(),
    validarCampos
], usuarioPutVacaciones);

router.post("/insertarUsuario", [
    check('nombre', "El nombre es obligatoro").not().isEmpty(),
    check('nombre', "Debe tener menos de 25 caracteres").isLength({ max: 25 }),
    check('documento').not().isEmpty(),
    check('direccion', "Es Obligatorio este campo").not().isEmpty(),
    check('ciudad', "Es Obligatorio este campo").not().isEmpty(),
    check('contacto', "Es Obligatorio este campo").not().isEmpty(),
    check('telefono', "Es Obligatorio el telefono").not().isEmpty(),
    check('telefono', "Debe tener menos de 14 caracteres").isLength({ max: 14 }),
    check('password', "Es Obligatorio").not().isEmpty(),
    check('password', "Debe tener más de 8 caracteres").isLength({ min: 8 }),
    check('correo', "Es Obligatorio").not().isEmpty(),
    check('correo', "No es un correo valido").isEmail(),
    check('correo').custom(helpersUsuario.existeEmail),
    check("documento").custom(helpersUsuario.existenumDocumento),
    validarCampos,
], usuarioPost);


export default router;