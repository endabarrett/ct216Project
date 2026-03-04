<script setup>
import { ref } from 'vue'
import app from "../api/firebase"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useLoading } from "vue-loading-overlay"
import "vue-loading-overlay/dist/css/index.css"; // Ensure the styles are included

const $loading = useLoading();
const email = ref('');
const password = ref('');
const errorMessage = ref('')
const auth = getAuth(app)

const register = async () => {
    let loader = $loading.show();
    errorMessage.value = ''
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email.value,
            password.value
        )
        const user = userCredential.user
        console.log('Registered user:', user)
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
        <form @submit.prevent="register">
            <div class="form-group mb-3">
                <label for="emailId" class="form-label">Email address</label>
                <input type="email" v-model="email" class="form-control" id="emailId"
                    placeholder="Enter email" autocomplete="email" required />
                <small class="form-text text-muted">
                    We'll never share your email with anyone else.
                    </small>
                </div>
           <div class="form-group mb-3">
                 <label for="passwordId" class="form-label">Password</label>
                 <input type="password" v-model="password" class="form-control" id="passwordId"
                    placeholder="Password" autocomplete="new-password" required />
                 </div>
            
                 <button type="submit" class="btn btn-primary w-100">
                Create Account
                </button>
            </form>
        </div> 
</template>
