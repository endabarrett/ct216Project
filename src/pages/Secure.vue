<script setup>
import { onMounted } from 'vue'
import app from '../api/firebase'
import { getFunctions, httpsCallable, connectFunctionsEmulator } from 'firebase/functions'
const functions = getFunctions(app)
onMounted(async () => {
    try {
        if (window.location.hostname === 'localhost') // Check if working locally
            connectFunctionsEmulator(functions, "localhost", 5001);
        const secureFunction = httpsCallable(functions, 'secureFunction')
        const result = await secureFunction()
        console.log('Cloud Function result:', result.data)
    } catch (error) {
        console.error('Error calling secure function:', error)
    }
})
</script>
<template>
    <h1>Secure Page</h1>
</template>