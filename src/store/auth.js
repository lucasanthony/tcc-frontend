import { KEYS, getItem } from '@/store/localStorage';
import { PERFIL_AUTENTICADO } from '@/constants/constants';
import jwtDecode from 'jwt-decode';

const getUsuario = () => {
    return !!getItem(KEYS.LOGIN.usuario) || !!getItem(KEYS.LOGIN.jwt)
        ? jwtDecode(getItem(KEYS.LOGIN.jwt))
        : null;
};

const profile = getUsuario()?.perfilSelecionado?.codigo || '';

const name = getUsuario()?.pessoa?.pessoaFisica?.nome || '';

const getIsUsuarioAutenticado = () => {
    return [
        PERFIL_AUTENTICADO.VISTORIA_EXTERNO,
        PERFIL_AUTENTICADO.VISTORIA_INTERNO,
        PERFIL_AUTENTICADO.VISTORIA_INDICADORES,
    ].includes(profile);
};

const logout = () => {
    window.open(`${process.env.VUE_APP_SICARF_URL}/#/selecionarModulo`, '_self');
};

export { getUsuario, getIsUsuarioAutenticado, profile, name, logout };
