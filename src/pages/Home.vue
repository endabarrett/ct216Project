<script setup>
    import Nav from '@/components/Nav.vue'
    import { ref, onMounted, computed } from 'vue'

    const message = ref('')
    const count = ref(0)
    const awesome = ref(false)
    const type = ref('C')
    const items = ref([{message : 'Foo'}, {message : 'Bar'}])
    const comments = ref([{comment: 'This is a great app'}, {comment : 'Wow what a super app'}])
    const showC = ref(false);
    const charCount = ref(240)
    const post = ref('')

    const clickCount = () => {
        count.value++
    }
    const resetCount = () => {
        count.value = 0
    }
    const alertItem = (item) => {
        alert(item.message);
    }

    const showComments = () => {
        showC.value = true
    }

    const isEven = computed(() => {
        return count.value % 2 === 0
    })

    const countChars = computed(() => {
        return 240 - post.value.length
    })

    

    onMounted(() => {
        message.value = 'My page has loaded'

    })

</script>

<template>
    <Nav />
    <h1>You did not do it!</h1>
    <p>
        Visit the <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
        documentation
    </p>
    <span>Message : {{ message }}</span>
    <input type="text" v-model="message" placeholder="Please enter a message">
    <br>
    <button @click="clickCount" class="btn btn-primary">{{ count }}</button>
    <button @click="resetCount" class="btn btn-danger">Reset</button>
    <br>
    <p>
        The number is:
        <strong>{{ isEven ? 'Even' : 'Odd' }}</strong>
    </p>
    <br>
    <h1 v-if="type === 'A'">This app is awesome</h1>
    <h1 v-else-if="type === 'B'">This lecture is terrible!</h1>
    <h1 v-else>This lecture is great!</h1>

    <ul>
        <li v-for="(item, index) in items">
           {{ index + 1 }} - {{ item.message }}
        </li>
    </ul>
    <button @click="showComments" class="btn btn-success">Show Comments</button>

    <div v-if="showC">
        <div v-for="comment in comments">
            {{comment.comment}}
        </div>
    </div>

    <h1>Welcome to X</h1>
    <textarea v-model="post" name="" id="">

    </textarea>
    <span>{{ charCount }}</span>
    <br>
    <span>Chars = {{ countChars }}</span>
</template>

<style scoped></style>
