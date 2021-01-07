<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="todo">
      <a-input-search
        placeholder="请输入待办事项"
        enter-button="新增"
        size="large"
        @search="handleAdd"
        v-model:value="inputValue"
        style="margin-bottom:20px;"
      />
      <h2 class="title">待办事项</h2>
      <a-card
        v-for="(item, index) in todoArr"
        :title="`${index + 1}、${item.date}`"
        :key="index"
      >
        <template v-slot:extra>
          <a-switch
            v-model:checked="item.done"
            @change="handleCheck(item, true)"
          />
        </template>
        {{ item.text }}
      </a-card>
      <h2 class="title">已办事项</h2>
      <a-card
        v-for="(item, idx) in doneArr"
        :title="`${idx + 1}、${item.date}`"
        :key="idx"
      >
        <template v-slot:extra>
          <a-switch
            v-model:checked="item.done"
            @change="handleCheck(item, false)"
            style="margin-right:10px;"
          />
          <a-button
            type="danger"
            shape="round"
            size="small"
            @click="handleDel(item.id)"
          >
            删除
          </a-button>
        </template>
        {{ item.text }}
      </a-card>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  toRefs,
  computed,
  onMounted,
  onUnmounted
} from "vue";
import { Modal } from "ant-design-vue";
interface Book {
  todoList: Array<OrderItem>;
}

class OrderItem {
  id: number | undefined;
  text: string | undefined;
  date: string | undefined;
  done: boolean | undefined;
}

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: String
  },
  setup() {
    const inputValue = ref<string>("");
    const time = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}  ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
    // const todoList = ref<string[]>([]);
    const todoData: Book = reactive({
      todoList: []
    });
    // 通过计算属性，计算出生成的代办事项列表
    const todoArr = computed(() => {
      return todoData.todoList.filter(item => !item.done);
    });
    // 通过计算属性，计算出生成的已办列表
    const doneArr = computed(() => {
      return todoData.todoList.filter(item => item.done);
    });

    const handleAdd = (val: string) => {
      // console.log(val, time);
      if (!val) return;
      const obj = {
        id: new Date().getTime(),
        text: val,
        date: time,
        done: false
      };
      todoData.todoList.push(obj);
      inputValue.value = "";
    };
    const handleCheck = (val: { done: boolean }, status: boolean) => {
      // console.log(val, time);
      val.done = status;
    };
    const handleDel = (id: number) => {
      // console.log(todoData.todoList, id);
      Modal.confirm({
        title: "你确定要删除这条数据吗?",
        okText: "确认",
        cancelText: "取消",
        onOk() {
          todoData.todoList = todoData.todoList.filter(item => item.id !== id);
        }
      });
    };

    onMounted(() => {
      console.log("Component is mounted!");
    });
    onUnmounted(() => {
      console.log("Component is onUnmounted!");
    });

    // expose to template
    return {
      ...toRefs(todoData),
      inputValue,
      todoArr,
      doneArr,
      handleAdd,
      handleCheck,
      handleDel
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.todo {
  width: 60%;
  margin: 0 auto;
  .title {
    background: #ccc;
    padding: 10px 0;
  }
}
</style>
<style lang="scss">
.todo {
  .ant-card {
    .ant-card-head-title {
      text-align: left;
      font-weight: 700;
    }
    .ant-card-body {
      text-align: left;
      padding: 10px 24px;
    }
  }
}
</style>
