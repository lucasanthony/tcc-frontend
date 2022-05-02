import Vue from 'vue';
import Router from 'vue-router';
import { profile, getIsUsuarioAutenticado, logout } from '@/store/auth';
import { ROUTE_GROUP } from '@/constants/constants';
import { PERFIL_AUTENTICADO } from '../constants/constants';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            name: 'Home',
            path: '/',
            redirect: { name: 'ListagemVistorias' },
            component: () => import('@/screens/ListagemVistorias'),
            meta: {
                access: [PERFIL_AUTENTICADO.VISTORIA_EXTERNO, PERFIL_AUTENTICADO.VISTORIA_INTERNO],
            },
        },
        {
            name: 'HomeVistoria',
            path: '/vistoria',
            meta: {
                routeGroup: ROUTE_GROUP.listagemVistorias,
                access: [PERFIL_AUTENTICADO.VISTORIA_EXTERNO, PERFIL_AUTENTICADO.VISTORIA_INTERNO],
            },
            component: () => import('@/screens/HomeVistoria'),
            children: [
                {
                    name: 'ListagemVistorias',
                    path: '/listagem-vistorias',
                    meta: {
                        routeGroup: ROUTE_GROUP.listagemVistorias,
                        access: [PERFIL_AUTENTICADO.VISTORIA_EXTERNO, PERFIL_AUTENTICADO.VISTORIA_INTERNO],
                    },
                    component: () => import('@/screens/ListagemVistorias'),
                },
            ],
        },
    ],
});

router.beforeEach(async (to, from, next) => {
    const perfilAutenticado = getIsUsuarioAutenticado();

    if (!perfilAutenticado) {
        logout();
    }

    let init = 'Home';

    if (profile === PERFIL_AUTENTICADO.VISTORIA_EXTERNO || profile === PERFIL_AUTENTICADO.VISTORIA_INTERNO) {
        init = 'ListagemVistorias';
    } else if (profile === PERFIL_AUTENTICADO.VISTORIA_INDICADORES) {
        init = 'RelatorioVistorias';
    } else {
        logout();
    }

    if (!to?.meta?.access?.includes(profile)) {
        next({ name: init });
    } else {
        next();
    }
});

export default router;
