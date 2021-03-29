<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p>获取mock数据</p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  mounted () {
    this.getData()
  },
  methods: {
    getData(){
      axios.get('/api/mock')
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
}
</script>