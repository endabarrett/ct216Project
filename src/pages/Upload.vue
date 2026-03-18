<script setup>
import app from "../api/firebase";
import { ref as vueRef } from "vue";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage(app);
const imageUrl = vueRef('');
const handleFileUpload = async (event) => {

    const file = event.target.files[0];
    if (!file) return;
    const imageRef = ref(storage, `images/${file.name}`);
    try {
        const snapshot = await uploadBytes(imageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        imageUrl.value = downloadURL;
        console.log("Success! URL:", downloadURL);
    } catch (error) {
        console.error("Upload failed:", error);
    }
}
</script>
<template>
    <label for="avatar">Choose a profile picture:</label>
    <input ref="fileInput" type="file" accept="image/png, image/jpeg" @change="handleFileUpload" />
    <img :src="imageUrl" alt="">
</template>
