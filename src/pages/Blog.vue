<script setup>
    import Nav from '@/components/Nav.vue'
    import {ref} from 'vue'

    const handle = ref('')
    const comment = ref('')

    const postComment = () => {
        console.log("handle", handle.value);
        console.log("comment", comment.value);
    }


</script>
<template>
    <Nav />
        <div class="container">
            <h1>Welcome to my blog page</h1>
            <p>This is my blog page for my SaaS app</p>
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Email address</label>
                 <input
                    type="email" v-model="handle" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
            </div> 
            <div class="mb-3"> 
                <label for="exampleFormControlTextarea1" class="form-label">Comment</label>
            
                <textarea class="form-control" v-model="comment" id="exampleFormControlTextarea1" rows="3"></textarea> 
            </div>
            <div class="mb-3 right"> 
                <button type="button" @click="postComment" class="btn btn-primary">Post</button> 
            </div>
        </div>
</template>

<style scoped>

</style>