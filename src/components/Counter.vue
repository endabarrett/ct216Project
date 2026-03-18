<script setup>
import { useStore } from '@/stores/store';

const store = useStore();

</script>
<template>

       <div> Counter {{ store.count }} <button type="button" @click="store.increment()" class="btn btn-primary">Click
                        Counter {{ store.count }}</button>
            </div>
</template>
