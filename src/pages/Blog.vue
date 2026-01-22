<script setup>
    import Nav from '@/components/Nav.vue'
</script>
<template>
    <Nav />
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                First
            </div>
            <div class="col-md-6">
                Second
            </div>
        </div>    
        <h1>This is my Blog page</h1>
    
        <p id="welcome" class="myBlueClass">Welcome to my wonderful blog page</p>

        <a href="https://www.google.ie">The best engine</a>
        <button class="btn btn-primary">My button</button>
    </div>
</template>

<style scoped>
.myBlueClass {
    color:lightblue
}
a {
    color:green
}
#welcome {
    text-align: center;
}
</style>