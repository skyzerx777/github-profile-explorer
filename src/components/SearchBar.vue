<script setup lang="ts">
import type { IGithubUserResponse, ISuggestions, IUser } from '@/types';
import { useDebouncedRef } from '@/utils/debouncedRef';
import { ref, watch } from 'vue';

const emit = defineEmits<{
	'update-user': [user: IUser];
	'update-loading': [loading: boolean];
}>();

const props = defineProps<{
	loading: boolean;
}>();

const searchInput = useDebouncedRef('');
const suggestions = ref<ISuggestions[]>([]);

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

	const data: IGithubUserResponse = await response.json();

	const userData: IUser = {
		login: data.login,
		id: data.id,
		avatarUrl: data.avatar_url,
		name: data.name,
		bio: data.bio,
		location: data.location,
		profileUrl: data.html_url,
		followers: data.followers,
		following: data.following,
		publicRepos: data.public_repos,
		publicGists: data.public_gists,
		hireable: data.hireable,
		createdAt: data.created_at,
		updatedAt: data.updated_at,
	};

	emit('update-user', userData);
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

	suggestions.value = data.items.map((item: ISuggestions) => {
		return {
			id: item.id,
			avatar_url: item.avatar_url,
			login: item.login,
		};
	});
});
</script>

<template>
	<form @submit.prevent="selectUser(searchInput)" class="relative mb-8">
		<div class="flex gap-3">
			<input
				v-model="searchInput"
				type="text"
				name="user-search"
				placeholder="Search GitHub username..."
				class="grow rounded-xl border border-slate-300 bg-white px-4 py-3 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
			/>
			<button
				type="submit"
				:disabled="props.loading || !searchInput"
				class="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
			>
				Search
			</button>
		</div>
		<div
			v-if="suggestions.length"
			class="absolute left-0 top-full z-10 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800"
		>
			<div
				v-for="user in suggestions"
				:key="user.id"
				@click="selectUser(user.login)"
				class="flex cursor-pointer items-center gap-3 p-3 transition hover:bg-slate-100 dark:hover:bg-slate-700"
			>
				<img
					:src="user.avatar_url"
					:alt="user.login"
					class="size-8 rounded-full"
				/>
				<span>{{ user.login }}</span>
			</div>
		</div>
	</form>
</template>
