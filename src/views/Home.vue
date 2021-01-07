<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <TodoList msg="Welcome to Your Vue3.0 + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TodoList from "@/components/TodoList.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Home",
  components: {
    TodoList
  }
});
</script>
