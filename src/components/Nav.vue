<script setup>
import { getAuth, signOut } from "firebase/auth"
import { useRouter } from "vue-router"
import app from "../api/firebase"

const router = useRouter()
const auth = getAuth(app)

const logout = async () => {
    try {
        await signOut(auth)
        console.log("User signed out")

        // Optional: redirect after logout
        router.push('/login')

    } catch (error) {
        console.error("Logout error:", error.code)
        console.error("Message:", error.message)
    }
}
</script>
<template>
    <router-link to="/">Go to Home</router-link> <br>
    <router-link to="/blog">Go to Blog</router-link> <br>
    <router-link to="/register">Go to Registration</router-link> <br>
    <router-link to="/login">Login</router-link> <br>
    <button class="btn btn-secondary" @click="logout">Logout</button>
</template>