<script setup lang="ts">
import type { IUser } from '@/types';
import { useDebouncedRef } from '@/utils/debouncedRef';
import { ref, watch } from 'vue';

const emit = defineEmits<{
	'update-user': [user: IUser];
	'update-loading': [loading: boolean];
}>();

const loading = defineProps<{ loading: boolean }>();

const searchInput = useDebouncedRef('');
const suggestions = ref<IUser[] | []>([]);

async function selectUser(username: string) {
	searchInput.value = '';
	suggestions.value = [];

	await loadUserInfo(username);
}

async function loadUserInfo(username: string) {
	emit('update-loading', true);
	const response = await fetch(`https://api.github.com/users/${username}`, {
		headers: {
			accept: 'application/vnd.github+json',
		},
	});

	const data: IUser = await response.json();

	emit('update-user', data);
	emit('update-loading', false);
}

watch(searchInput, async () => {
	if (searchInput.value.length < 2) {
		suggestions.value = [];
		return;
	}

	const response = await fetch(
		`https://api.github.com/search/users?q=${searchInput.value}&per_page=5`,
		{
			headers: {
				accept: 'application/vnd.github+json',
			},
		},
	);

	const data = await response.json();

	suggestions.value = data.items;
});
</script>

<template>
	<form @submit.prevent="selectUser(searchInput)" class="relative">
		<div>
			<label>
				Search:
				<input
					v-model="searchInput"
					type="text"
					name="user-search"
					placeholder="Enter username..."
				/>
			</label>
			<button type="submit" :disabled="!loading || !searchInput">Search</button>
		</div>
		<div v-if="suggestions.length > 0" class="absolute left-0 top-full">
			<div v-for="user in suggestions" :key="user.id">
				<p @click="selectUser(user.login)" class="cursor-pointer">
					{{ user.login }}
				</p>
			</div>
		</div>
	</form>
</template>
