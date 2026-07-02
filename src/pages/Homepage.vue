<script setup>
import { useUsersStore } from '../stores/store';


const usersStore = useUsersStore()
</script>

<template>
{{ usersStore.users }} <br>
вошедший {{ usersStore.currentUser }}
</template>