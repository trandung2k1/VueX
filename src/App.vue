<template>
    <div>App</div>
    <h2>{{ count }}</h2>
    <h3>{{ doneTodosCount }}</h3>

    <!-- 1 -->
    <!-- <h4>{{ getTodo.text }}</h4> -->

    <!-- 2 -->
    <!-- <h4>{{ getTodo(1).text }}</h4> -->

    <!-- 3 -->
    <h4>{{ getTodoById('63dc7dbc5f13de8f94fee612')?.title }}</h4>
    <button @click="increment">Increment</button>
    <!-- <button @click="getTodos">Get Todos</button> -->
    <form @submit.prevent="handleAdd">
        <input ref="input" type="text" v-model="title" />
        <button>Add todo</button>
    </form>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
export default {
    name: 'App',
    data() {
        return {
            title: '',
        };
    },
    created() {
        // this.getTodos();
        this.GETS();
    },
    methods: {
        //Mutations
        //1
        // increment: function () {}
        //     this.$store.commit('increment');
        // },
        //2
        // ...mapMutations(['increment']),
        //3
        // ...mapMutations({
        //     increment: 'increment',
        // }),

        //Actions
        //1
        increment: function () {
            this.$store.dispatch('increment');
        },
        // 2
        // ...mapActions(['getTodos', 'addTodo']),
        // 3
        ...mapActions({
            GETS: 'getTodos',
            ADD: 'addTodo',
        }),
        handleAdd: function () {
            if (this.title) {
                const todo = {
                    title: this.title,
                    completed: false,
                    description: 'Default description',
                };
                this.ADD(todo);
                this.title = '';
                this.$refs.input.focus();
            } else {
                alert('Title required');
            }
        },
    },
    // computed: {
    //     count() {
    //         return this.$store.state.count;
    //     },
    //     doneTodosCount: function () {
    //         return this.$store.getters.doneTodosCount;
    //     },
    //     getTodo: function () {
    //         return this.$store.getters.getTodoById(1);
    //     },
    // },

    // computed: {
    //     ...mapState({
    //         count: (state) => state.count,
    //     }),
    //     ...mapGetters({ doneTodosCount: 'doneTodosCount', getTodo: `getTodoById` }),
    // },
    computed: { ...mapState(['count']), ...mapGetters(['doneTodosCount', 'getTodoById']) },
};
</script>

<style></style>
