import { createRouter, createWebHistory } from 'vue-router'
// import { profile, getIsUsuarioAutenticado, logout } from '@/store/auth';
import Home from '../pages/Home.vue'
// import Cadastro from '../pages/Cadastro.vue'
import Login from '../pages/Login.vue'

const routes = [
    {
        name: 'Home',
        path: '/',
        component: Home
    },
    {
        name: 'Login',
        path: '/entrar',
        component: Login
    }
]


// router.beforeEach(async (to, from, next) => {
//     const perfilAutenticado = getIsUsuarioAutenticado();

//     if (!perfilAutenticado) {
//         logout();
//     }

//     let init = 'Home';

//     if (profile === PERFIL_AUTENTICADO.VISTORIA_EXTERNO || profile === PERFIL_AUTENTICADO.VISTORIA_INTERNO) {
//         init = 'ListagemVistorias';
//     } else if (profile === PERFIL_AUTENTICADO.VISTORIA_INDICADORES) {
//         init = 'RelatorioVistorias';
//     } else {
//         logout();
//     }

//     if (!to?.meta?.access?.includes(profile)) {
//         next({ name: init });
//     } else {
//         next();
//     }
// });

const router = createRouter({
    history: createWebHistory('/'),
    routes
})

export default router;