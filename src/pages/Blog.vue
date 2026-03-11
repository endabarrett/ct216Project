<script setup>
    import app from '../api/firebase'
    import Nav from '@/components/Nav.vue'
    import { getFunctions, httpsCallable, connectFunctionsEmulator } from  'firebase/functions'
    import { ref, onMounted } from 'vue'
    import { useLoading } from "vue-loading-overlay";
    import "vue-loading-overlay/dist/css/index.css"; // Ensure the styles are included
    import { getAuth, onAuthStateChanged } from "firebase/auth"

    const handle = ref('')
    const comment = ref('')
    const comments = ref([])
    const $loading = useLoading();
    const editingId = ref(null);
    const tempValue = ref('');
    const user = ref(null);

    onMounted(() => {
        const auth = getAuth(app)

        onAuthStateChanged(auth, (firebaseUser) => {
            user.value = firebaseUser
            console.log("Logged in user:", firebaseUser.uid)
        })

        getComments()
})


    const postComment = async () => {
        console.log("handle", handle.value);
        console.log("comment", comment.value);
        let loader = $loading.show();
        const functions = getFunctions(app);
        if (window.location.hostname === 'localhost') // Check if working locally
            connectFunctionsEmulator(functions, "localhost", 5001);
        const postComment = httpsCallable(functions, 'postcomment');
        const result = await postComment(
        {
            "handle": handle.value,
            "comment": comment.value
        });
        console.log(result);
        getComments()
        loader.hide();
    }

    const getComments = async () => {
        const functions = getFunctions(app);
        if (window.location.hostname === 'localhost') // Check if working locally
            connectFunctionsEmulator(functions, "localhost", 5001);

        const getComments = httpsCallable(functions, 'getComments');        
        const result = await getComments();

        comments.value = result.data.comments;

    }
    

    const deleteComment = async (id) => {
    console.log("Deleting comment... ", id)
    let loader = $loading.show();

    const functions = getFunctions(app);
    if (window.location.hostname === 'localhost') // Check if working locally
        connectFunctionsEmulator(functions, "localhost", 5001);

    const deleteComment = httpsCallable(functions, 'deleteComment');

    await deleteComment(
        {
            id: id
        });

    getComments();
    loader.hide();
    }

    const enableEditing = (comment) => {
        editingId.value = comment.id;
        tempValue.value = comment.comment;
    }

    const disableEditing = () => {
        editingId.value = null;
        tempValue.value = null; 
    }

    const save = async (id) => {
        console.log("Saving comment... ", id)
        let loader = $loading.show();

        const functions = getFunctions(app);
        if (window.location.hostname === 'localhost') // Check if working locally
            connectFunctionsEmulator(functions, "localhost", 5001);

        const updateComment = httpsCallable(functions, 'updateComment');
        await updateComment(
            {
                id: id,
                comment: tempValue.value
            });
        getComments();
        editingId.value = null;
        tempValue.value = null;
        loader.hide();
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

            <div class="mt-5" v-for="comment in comments" :key="comment.id">
                {{ comment }}
                <div v-if="editingId !== comment.id">
                    <span @click="enableEditing(comment)">
                        {{ comment.comment }}
                        
                    </span>
               <button type="button" @click="deleteComment(comment.id)"
                    class="btn btn-danger">Delete Comment</button>
                </div>
             <div v-else>
                <input v-model="tempValue" class="form-control" />
                 <button class="btn btn-primary" @click="disableEditing">Cancel</button>
                 <button class="btn btn-success" @click="save(comment.id)">Save</button>
             </div>
            </div>
        </div>
</template>

<style scoped>

</style>