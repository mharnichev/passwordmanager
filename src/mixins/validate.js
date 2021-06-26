export const validate = {
    data() {
        return {
            email: "",
            password: "",
            errorEmail: false,
            errorPassword: false,
            emailErrorMessage: "",
            errorPasswordMessage: "",
            accessEmail: false,
            accessPassword: false,
        }
    },
    methods: {
        validateEmail(val) {
            const regularExpressionEmail =
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return regularExpressionEmail.test(val);
        }
    }
}