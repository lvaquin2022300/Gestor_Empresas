import Usuario from '../usuario/user.model.js';
import Empresa from '../empresas/empresas.model.js';


export const existenteEmail = async (email = '') => {
    const existeEmail = await Usuario.findOne({email});
    if(existeEmail){
        throw new Error(`El email ${ email } ya fue registrado`);
    }
}

export const existeUsuarioById = async ( id = '') => {
    const existeUsuario = await Usuario.findOne({id});
    if(existeUsuario){
        throw new Error(`El usuario con el id: ${ id } no existe`);
    }
}

export const existenteEmpresa = async (nombreE = '') => {
    const existenteEmpresa = await Empresa.findOne({nombreE});
    if(existenteEmpresa){
        throw new Error(`El Nombre ${ nombreE } ya fue registrado`);
    }
}

export const existeEmpresaById = async ( id = '') => {
    const existeEmpresa = await Empresa.findOne({id});
    if(existeEmpresa){
        throw new Error(`El usuario con el id: ${ id } no existe`);
    }
}

