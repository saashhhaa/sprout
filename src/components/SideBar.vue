<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { useCategoriesStore } from '../stores/store';
import Category from './Category.vue';
import LangSwincher from './LangSwincher.vue';
import Logotype from './Logotype.vue';

const categoriesStore = useCategoriesStore()
const {t} = useI18n()
</script>

<template>
    <div class="sideBar">
        <Logotype/>
        <div class="searchBar">
            
            <label for="search"><img src="../assets/homepage/search.svg" alt=""> </label>
            <input id="search" type="text" :placeholder="t('sideBar.search')">
        </div>
        <div class="sectionsBar">
            <div class="cover"><img src="../assets/homepage/home.svg" alt=""><p>{{t('sideBar.homepage')}}</p></div>
            <div class="cover"><img src="../assets/homepage/calendar.svg" alt=""><p>{{t('sideBar.calendar')}}</p></div>
        </div>
        <div class="categoriesBar">
            <h3>{{t('sideBar.categories.title')}}</h3>
            <div class="categoriesWrapper">
                <Category v-for="category in categoriesStore.categories"
                :color="category.color"
                :title="category.title"
                :count="category.count"
                :isCustom="category.isCustom"
                />
                  <Category v-for="category in categoriesStore.customCategories"
                  :id="category.id"
                :color="category.color"
                :title="category.title"
                :count="category.count"
                :isCustom="category.isCustom"
                />
            </div>
            <div class="addNewCategory">
                <img src="../assets/homepage/plus.svg" alt="">
                <button>{{t('sideBar.categories.addCategory')}}</button>
            </div>
        </div>
        <LangSwincher/>
        <div class="profile">
            <div class="cover"><img src="" alt="">
            <div class="box">
                <p class="name"></p>
                <p class="email"></p>
            </div></div>
            <img src="../assets/homepage/settings.svg" alt="">
        </div>
    </div>
</template>

<style scoped>
* {
    border: 1px solid red;
}
.sideBar {
    padding: 2vh 2vw;
    display: flex;
    flex-direction: column;
    gap: 2vh;
    align-items: start;
}

img {
    filter: brightness(0) !important;
}

.searchBar {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    border-radius: 50px;
    background-color: white;
    
}

</style>