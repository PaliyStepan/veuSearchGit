<template>
    <div class="profile">
        <div class="get-back">
            <div class="get-back__trigger"
                 @click="getBack">
                get back search
            </div>
            <router-link to="/">
                get back to result
            </router-link>

        </div>

        <div class="row justify-content-center">
            <div class="col-12 col-lg-6 mb-5 mb-lg-0">
                <div class="profile__info">
                    <a :href="`https://github.com/${user.login}`" target="_blank" class="profile__img">
                        <img :src="user.avatar_url" alt="">
                    </a>
                        <div class="profile__name">{{    user.name ?  user.name : '--'   }}</div>
                        <div class="profile__login">{{    user.name ?  user.login : '--'   }}</div>
                </div>
            </div>
            <div class="col-12 col-lg-6 pt-0 pt-lg-5">
                <div class="profile__right">
                    <div class="row">
                       <div class="col-12">
                           <div class="profile-row">
                               <div class="profile-row__title">location</div>
                               <div class="profile-row__text">
                                   {{    user.location ?  user.location : '--'   }}
                               </div>
                           </div>
                           <div class="profile-row">
                               <div class="profile-row__title">email</div>
                               <div class="profile-row__text">
                                   {{
                                   user.email ?  user.email : '--'
                                   }}</div>
                           </div>
                           <div class="profile-row">
                               <div class="profile-row__title">blog</div>
                               <div class="profile-row__text">
                                   {{    user.blog ?  user.blog : '--'   }}
                               </div>
                           </div>
                       </div>
                    </div>
                    <div class="row mt-4 mb-3">
                        <div class="col-12 text-left">
                            <div class="badge badge-primary  badge-secondary p-2 mr-3">
                                Followers
                                {{user.followers}}
                            </div>
                            <div class="badge badge-primary  badge-secondary p-2">
                                Gists
                                {{user.public_gists}}
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <div class="repositories" :class="{active: showRepos}">
                                <div class="repositories__trigger">
                                    <div class="repositories__btn"
                                         @click="reposTrigger">
                                        <span class="repositories__count">
                                            {{user.public_repos}}
                                        </span>
                                        <span class="d-inline-block ml-2">Show Repositories </span>
                                    </div>
                                </div>
                                <div class="repositories__list" v-show="showRepos">
                                    <div class="alert mb-4">
                                        git hub  выдает только первые 30 репозиториев
                                    </div>
                                    <ul>
                                        <li v-for="repo in repos" class="mb-1">
                                            <a :href="repo.html_url" target="_blank">{{repo.full_name}}</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "Profile",
        data(){
          return{
              showRepos: false
          }
        },
        methods:{
            getBack(){
                this.$store.commit('setUsers', []);
                this.$store.commit('setText', '');
                this.$router.push('/');
            },
            reposTrigger(){
                this.showRepos = !this.showRepos
            }
        },
        computed: {
            ...mapGetters([
                'user',
                'repos'
            ]),
        },
        beforeDestroy() {
            this.$store.commit('setUser', {});
        }

    }
</script>

<style scoped lang="scss">
    .get-back{
        display: flex;
        margin-bottom: 60px;
        &__trigger {
            margin-right: 40px;
            cursor: pointer;
            &:hover {
                text-decoration: underline;
            }
        }
        a {
            color: #000;
        }
    }

    .profile {
        &__info {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        &__img {
            width: 180px;
            display: block;
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            border-radius: 50%;
            overflow: hidden;
            margin-bottom: 40px;
            filter: grayscale(1);
            img {
                max-width: 100%;
                width: 100%;
            }
        }
        &__name {
            font-size: 26px;
            line-height: 1.25;
            font-weight: 600;
            margin-bottom: 3px;
        }
        &__login {
            font-size: 20px;
            font-style: normal;
            font-weight: 300;
            line-height: 24px;
            color: #666;
        }
    }

    .profile-row{
        display: flex;
        align-items: center;
        width: 100%;
        margin-bottom: 10px;
        &__title {
            font-size: 20px;
            font-weight: bold;
            line-height: 21px;
        }
        &__text {
            padding-left: 25px;
            line-height: 21px;
        }
    }

    .repositories{
        text-align: left;
        &.active {
            .repositories__btn {
                &:after {
                    transform: translateY(-50%) rotate(180deg);
                }
            }
        }
        &__count {
            background-color: rgba(#ddd, 0.5);
            padding: 4px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            min-width: 40px;
        }
        &__list {
            margin-top: 40px;
            animation: showAnim linear 0.2s forwards;
            ul {
                list-style: none;
                padding: 0;
                margin: 0;
            }
        }
        &__btn {
            border: none;
            background-color: transparent;
            display: inline-flex;
            align-items: center;
            margin-top: 20px;
            position: relative;
            padding-right: 30px;
            cursor: pointer;
            &:after {
                content: '';
                position: absolute;
                width: 0;
                height: 0;
                border-style: solid;
                border-width: 5px 6px 0 6px;
                border-color: #000 transparent transparent transparent;
                top: 50%;
                transform: translateY(-50%);
                right: 0px;
                transition: all 0.2s;
            }
        }
    }

    .alert{
        background-color: #ddd;
    }


    @media screen and (max-width: 767px) {
        .get-back{
            justify-content: space-between;
            &__trigger {
                margin-right: 0;
            }
        }
    }


    @keyframes showAnim {
        0% {
            opacity: 0; }
        100% {
            opacity: 1; }
    }




</style>
