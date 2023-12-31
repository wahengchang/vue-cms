
<template>
    <v-layout>
        <v-main>
            form
            <slot></slot>
        </v-main>
    </v-layout>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
    name: "DefaultLayout",
});
</script>
