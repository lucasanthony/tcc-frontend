import Vue from 'vue';
import App from './App.vue';
import router from './routes';
import store from './store';
import './assets/styles/theme/display.css';
import './assets/styles/main.scss';
import './assets/styles/element-variables.scss';
import 'material-design-icons/iconfont/material-icons.css';
import VueToastr from '@deveodk/vue-toastr';
import VueProgressBar from 'vue-progressbar';
import '@deveodk/vue-toastr/dist/@deveodk/vue-toastr.css';
import Element from 'element-ui';
import locale from 'element-ui/lib/locale/lang/pt-br';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import carregarExtends from '@/utils/veeValidate'; // TODO ajustar
import messages from '@/constants/messages';
import '@/directives/rotate';
import VueTheMask from 'vue-the-mask';

Vue.config.productionTip = false;

Vue.use(Element, { locale });
Vue.use(VueToastr);
Vue.use(VueTheMask);

carregarExtends();

Vue.prototype.$messages = messages;
Vue.prototype.$alert = Element.MessageBox.alert;
Vue.prototype.$confirm = Element.MessageBox.confirm;

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

Vue.prototype.$alert = Element.MessageBox.alert;
Vue.prototype.$confirm = Element.MessageBox.confirm;

Vue.use(VueProgressBar, {
    color: '#009f61',
    failedColor: 'red',
    thickness: '2px',
    transition: {
        speed: '0.2s',
        opacity: '0.6s',
        termination: 600,
    },
    autoRevert: true,
    location: 'top',
    inverse: false,
    autoFinish: false,
});

if (process.env.NODE_ENV === 'development') {
    localStorage.setItem(
        '@jwt',
        'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWQiOjE1MDQsImF0aXZvIjp0cnVlLCJsb2dpbk1vYmlsZSI6ZmFsc2UsImxvZ2luTW9iaWxlVmlzdG9yaWEiOnRydWUsInF0ZFBlcmZpcyI6MSwiaGFzUGVyZmlsRXh0ZXJubyI6ZmFsc2UsInBlc3NvYSI6eyJpZCI6MTk1NSwiZW5kZXJlY28iOnsiaWQiOjAsImxvZ3JhZG91cm8iOiJST0QgQVVHVVNUTyBNT05URU5FR1JPIiwibnVtZXJvIjpudWxsLCJzZW1OdW1lcm8iOnRydWUsImNvbXBsZW1lbnRvIjpudWxsLCJiYWlycm8iOiJQQVJRVUUgR1VBUkFKQSIsImNlcCI6IjY2ODIxLTAwMCIsIm11bmljaXBpbyI6eyJpZCI6MTUwMTQwMiwibm9tZSI6IkJlbMOpbSIsImNvZGlnb0VzdGFkbyI6IlBBIiwibWYiOjUsInZhbG9yUmVmZXJlbmNpYSI6NTM5LjMsInJlZ2lhbyI6Ikd1YXJhasOhIiwiaWRSZWdpYW8iOjEsIm5vbWVDb21Db2RpZ29Fc3RhZG9Gb3JtYXRhZG8iOiJCZWzDqW0vUEEifSwidWYiOiJQQSJ9LCJhdGl2byI6dHJ1ZSwiZW1haWwiOiJlcXVpcGVndDEwLmd0NHdAZ21haWwuY29tIiwidGlwbyI6IlBGIiwidGVsZWZvbmVzIjpbXSwicGVzc29hRmlzaWNhIjp7ImlkIjoxOTEyLCJjcGYiOiIxMDIuNzg1LjA5Ni0wNiIsIm5vbWUiOiJNQVJDT1MgVklOw41DSVVTIFNBTlRBTkEgUkVJUyIsImFwZWxpZG8iOm51bGwsInJnIjpudWxsLCJuYWNpb25hbGlkYWRlIjpudWxsLCJlc3RhZG9DaXZpbCI6bnVsbCwib3JnYW9FeHBlZGlkb3IiOm51bGwsIm5hdHVyYWxpZGFkZSI6bnVsbCwiZGF0YU5hc2NpbWVudG8iOm51bGwsIm5vbWVEYU1hZSI6bnVsbCwibm9tZURvUGFpIjpudWxsLCJ0ZW1DZXJ0aWRhb09iaXRvIjpudWxsLCJtYXRyaWN1bGEiOm51bGwsInNleG8iOm51bGwsInByb2Zpc3NhbyI6bnVsbCwicXVhbnRpZGFkZVBlc3NvYXNGYW1pbGlhIjpudWxsLCJjZXJ0aWRhb0Nhc2FtZW50byI6bnVsbCwidGVtcG9Nb3JhZGlhIjpudWxsLCJkYXRhQ2FzYW1lbnRvIjpudWxsLCJjb25qdWdlTWVtYnJvIjpmYWxzZSwidWZOYXR1cmFsaWRhZGUiOm51bGwsInVmUmciOm51bGwsImdlbnRpbGljbyI6bnVsbCwiZGF0YU5hc2NpbWVudG9Gb3JtYXRhZGEiOiIiLCJkYXRhQ2FzYW1lbnRvRm9ybWF0YWRhIjoiIn0sInBlc3NvYUp1cmlkaWNhIjpudWxsLCJkYXRhQ2FkYXN0cm8iOjE1OTA0MTA1ODc3MTgsImNwZkNucGoiOiIxMDIuNzg1LjA5Ni0wNiIsIm5vbWVSYXphb1NvY2lhbCI6Ik1BUkNPUyBWSU7DjUNJVVMgU0FOVEFOQSBSRUlTIn0sImFzc2luYXR1cmEiOmZhbHNlLCJtb2R1bG9TZWxlY2lvbmFkbyI6eyJpZCI6OTgsImNvZGlnbyI6IlZJU1RPUklBIiwibm9tZSI6IlZpc3RvcmlhIn0sInBlcmZpbFNlbGVjaW9uYWRvIjp7ImlkIjoxMDEsImNvZGlnbyI6IlZJU1RPUklBX0lOVEVSTk8iLCJub21lIjoiVmlzdG9yaWFkb3IgSW50ZXJubyIsImljb25lIjoidmlzdG9yaWEucG5nIiwibW9kdWxvIjoiVklTVE9SSUEiLCJzZXRvciI6eyJpZCI6NTEsImNvZGlnbyI6IlZJU1RPUklBIiwibm9tZSI6IlZpc3RvcmlhIiwiY2FmIjpmYWxzZSwiZ2RhYXJyZWNhZGFjYW8iOmZhbHNlfSwicGFnaW5hSW5pY2lhbCI6InZpc3RvcmlhIn0sImlhdCI6MTY0NzAwMzQ1NCwiZXhwIjoxNjQ3MDg5ODU0fQ.3MlwqqNSqIqiWkNE_Cpskb3bYvHfnORr6N0vTYjVo__9_xZaDXl794e0p0IhA1jLGLXGNRYAdef2ejg-Fxvi1Q'
    );
}

export default new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
