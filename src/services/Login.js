import Api from './Api';

module.exports = {
    async login(email, password) {
        try {
            const response = await Api.post("user/signIn", {
                email: this.name,
                password: this.password,
            });
            const data = response.data;
            localStorage.setItem("token_vue", data.token);
            localStorage.setItem("user", data.user);
            console.log(data);
            return { "email": email, "password": password }
        } catch (error) {
            throw error(error)
        }
    }
}
