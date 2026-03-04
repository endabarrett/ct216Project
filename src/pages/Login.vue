<script setup>
import { ref } from 'vue';
import app from "../api/firebase"
import { useRouter } from 'vue-router'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useLoading } from "vue-loading-overlay"
import "vue-loading-overlay/dist/css/index.css"; // Ensure the styles are included

const $loading = useLoading()
const router = useRouter()
const email = ref('');
const password = ref('');
const errorMessage = ref('')
const auth = getAuth(app)

const login = async () => {
    let loader = $loading.show();
    errorMessage.value = ''
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
        const user = userCredential.user
        router.push('/secure')
        console.log('Logged in user:', user)
    } catch (error) {
        errorMessage.value = error.message
        console.error('Error code:', error.code)
        console.error('Error message:', error.message)
    } finally {
        loader.hide();
    }
}

</script>
<template>
    <div class="container">
        <form @submit.prevent="login">
            <div class="form-group mb-3">
                <label for="emailId" class="form-label">Email address</label>
                <input type="email" v-model="email" class="form-control" id="emailId" placeholder="Enter email"
                    autocomplete="email" required />
                <small class="form-text text-muted">
                    We'll never share your email with anyone else.
                </small>
            </div>
            <div class="form-group mb-3">
                <label for="passwordId" class="form-label">Password</label>
                <input type="password" v-model="password" class="form-control" id="passwordId" placeholder="Password"
                    autocomplete="current-password" required />
            </div>

            <button type="submit" class="btn btn-primary w-100">
                Login
            </button>
        </form>
    </div>
</template>