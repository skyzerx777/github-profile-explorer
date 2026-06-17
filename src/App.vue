<script setup lang="ts">
import { Moon, Sun } from '@lucide/vue';
import { onMounted, ref } from 'vue';
import SearchBar from './components/SearchBar.vue';
import UserProfileInfo from './components/UserProfileInfo.vue';
import type { IUser } from './types';

const selectedUser = ref<IUser | null>(null);
const loading = ref(false);

const darkMode = ref(false);

onMounted(() => {
	const savedTheme = localStorage.getItem('theme');

	if (savedTheme) {
		darkMode.value = savedTheme === 'dark';
	} else {
		darkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
	}

	document.documentElement.classList.toggle('dark', darkMode.value);
});

function toggleTheme() {
	darkMode.value = !darkMode.value;

	document.documentElement.classList.toggle('dark', darkMode.value);

	localStorage.setItem('theme', darkMode.value ? 'dark' : 'light');
}
</script>

<template>
	<div
		class="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 transition-colors dark:bg-slate-900 dark:text-white"
	>
		<div class="mx-auto max-w-4xl">
			<div class="relative mb-10">
				<button
					@click="toggleTheme"
					class="absolute right-0 top-0 rounded-xl border border-slate-300 p-2 transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
				>
					<Sun v-if="darkMode" class="size-5" />
					<Moon v-else class="size-5" />
				</button>

				<div class="text-center">
					<h1 class="text-4xl font-bold">GitHub Profile Explorer</h1>

					<p class="mt-2 text-slate-500 dark:text-slate-400">
						Search GitHub users and view their profile information
					</p>
				</div>
			</div>
			<SearchBar
				@update-user="selectedUser = $event"
				@update-loading="loading = $event"
				:loading
			/>
			<UserProfileInfo :selectedUser :loading />
		</div>
	</div>
</template>
