<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>获取mock数据</p>
  </div>
</template>


<script lang="ts">
import {
  defineComponent,
  onMounted,
} from "vue";
import axios from 'axios'
export default defineComponent({
  name: "about",
  setup() {
    const getData = ()=>{
      axios.get('/api/mock')
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    onMounted(() => {
      getData()
    });

    // expose to template
    return {};
  }
});
</script>
