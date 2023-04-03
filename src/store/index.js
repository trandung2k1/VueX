import { createStore } from 'vuex';
import axios from 'axios';
const store = createStore({
    state() {
        return {
            count: 1,
            todos: [],
        };
    },
    mutations: {
        increment(state) {
            state.count++;
        },
        GET_TODOS(state, payload) {
            state.todos = payload;
        },
        ADD_TODO(state, payload) {
            state.todos = [...state.todos, payload];
        },
    },
    getters: {
        doneTodos(state) {
            return state.todos.filter((item) => item.completed);
        },
        doneTodosCount(state, getters) {
            return getters.doneTodos.length;
        },
        getTodoById: (state) => (id) => {
            return state.todos.find((todo) => todo._id == id);
        },
    },
    //use asynchronously
    actions: {
        // use destructuring  {commit}
        increment(context) {
            context.commit('increment');
        },
        async getTodos({ commit }) {
            try {
                const response = await axios.get(
                    'https://api-todos-0ylw.onrender.com/api/v1/todos',
                );
                commit('GET_TODOS', response.data);
            } catch (error) {
                console.log(error);
            }
        },
        async addTodo({ commit }, newTodo) {
            try {
                const response = await axios.post(
                    'https://api-todos-0ylw.onrender.com/api/v1/todos',
                    newTodo,
                );
                commit('ADD_TODO', response.data);
            } catch (error) {
                console.log(error);
            }
        },
    },
});

export default store;
