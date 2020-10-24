<template>
    <div class="users">
        <div class="get-back">
            <span class="get-back__trigger"
                @click="getBack()"
            >
                Get back
            </span>
        </div>
        <h2 class="mb-4 mb-md-5" >
            result search
        </h2>
        <swiper class="swiper" :options="swiperOption">
            <swiper-slide
                v-for="user in users"
                :key="user.login"
            >
                <router-link
                    :to="'/profile/' + user.login"
                     class="user"
                >
                    <img :src="user.avatar_url" :alt="user.login" class="img-fluid">
                    <h2>{{user.login}}</h2>
                </router-link>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
    import 'swiper/css/swiper.css';

    export default {
        name: "UserList",
        components: {
            Swiper,
            SwiperSlide
        },
        data() {
            return {
                swiperOption: {
                    pagination: {
                        el: '.swiper-pagination'
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                }
            }
        },
        methods: {
          getBack(){
              this.$store.commit('setUsers', []);
              this.$store.commit('setText', '');
          }
        },
        computed:{
           ...mapGetters([
               'users'
           ]),
       }
    }
</script>

<style  lang="scss" scoped>
    .get-back{
        width: 100%;
        text-align: left;
        &__trigger {
            cursor: pointer;
            &:hover {
                text-decoration: underline;
            }
        }
    }
    .user{
        display: block;
        width: 400px;
        margin: 0 auto;
        h2 {
            text-align: center;
            color: #000;
        }
        img {
            width: 100%;
            max-width: 100%;
            margin-bottom: 20px;
            filter: grayscale(1);
        }
    }

    .swiper-pagination{
        position: static;
        margin-top: 40px;
        span {
            background-color: red !important;
        }
    }



    .swiper-button-next, .swiper-button-prev {
      margin-top: -40px;
        &:after {
            color: #000;
        }
      }


    @media screen and (max-width: 767px) {
        .user{
            width: 90%;
        }
        .swiper-button-next, .swiper-button-prev {
           display: none;
        }
        .get-back{
            margin-bottom: 20px;
        }
        .swiper-pagination{
            margin-top: 20px;
        }
    }

</style>
