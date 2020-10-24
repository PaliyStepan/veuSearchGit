<template>
  <div class="home">
    <template v-if="usersLength == 0">
      <h1>
        Git Users Search App
      </h1>
      <div class="main-row" >
        <div class="main-input">
          <input
            type="text"
            v-model="text"
            placeholder="Search"
            @keyup.enter="onSubmit"
          >
          <div class="main-input__el"></div>
        </div>
        <button
            @click="onSubmit"
            :disabled="textLength"
        >
          Push
        </button>
      </div>
    </template>
    <app-users v-else>
    </app-users>
    <div class="error mt-5" v-show="hasError">
      нет таких пользователей
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import AppUsers from '../components/UserList'
  export default {
    name: 'Home',
    components: {
      AppUsers
    },
    methods: {
      onSubmit(){
        this.$store.dispatch('fetchUsers')
      }
    },
    computed: {
      ...mapGetters([
         'usersLength',
          'hasError'
      ]),
      text: {
        get(){
          return this.$store.getters.text
        },
        set(value){
          this.$store.commit('setText', value)
        }
      },
      textLength() {
        return this.text.length === 0;
      }
    },
  }
</script>

<style scoped lang="scss">
  h1 {
    margin-bottom: 80px;
  }
  .main-row{
    display: flex;
    justify-content: center;
  }
  .main-input{
    position: relative;
    &__el {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 2px;
      width: 0;
      background: #000;
      transition: all 0.5s;
    }
    input {
      border: none;
      border-bottom: 1px solid transparent;
      width: 300px;
      ms-user-select: none;
      -moz-user-select: none;
      -khtml-user-select: none;
      -webkit-user-select: none;
      &:focus {
        border: none;
        box-shadow: none;
        outline: none;
        &~ div {
          width: 100%;
        }
      }
    }
  }

  button{
    margin-left: 20px;
    width: 100px;
    height: 30px;
    background-color: #fff;
    border: 1px solid #000;
    transition: all 0.2s;
    ms-user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    &[disabled] {
     pointer-events: none;
      border-color: #ddd;
    }
    &:hover {
      background-color: #000;
      color: #fff;
    }
  }

  @media screen and (max-width: 767px) {
    h1{
      font-size: 33px;
      margin-bottom: 40px;
    }
    .main-row{
      justify-content: space-between;
    }
    .main-input{
      flex-grow: 1;
      input {
        width: 100%;
      }
    }
  }
</style>
