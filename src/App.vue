<script setup lang="ts">
import { ref } from 'vue';
import SearchBar from './components/SearchBar.vue';
import UserProfileInfo from './components/UserProfileInfo.vue';
import type { IUser } from './types.ts';
import '/src/App.css';

const selectedUser = ref<IUser | null>(null);
const loading = ref(false);
</script>

<template>
	<SearchBar
		@update-user="selectedUser = $event"
		@update-loading="loading = $event"
		:loading
	/>
	<UserProfileInfo :selectedUser :loading />
</template>
