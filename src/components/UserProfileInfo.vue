<script setup lang="ts">
import type { IUser } from '@/types';

defineProps<{ selectedUser: IUser | null; loading: boolean }>();
</script>

<template>
	<div v-if="loading" class="flex justify-center py-20">
		<div
			class="size-12 animate-spin rounded-full border-4 border-slate-300 border-t-blue-600"
		/>
	</div>
	<div
		v-if="selectedUser && !loading"
		class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
	>
		<div class="flex flex-col gap-6 md:flex-row">
			<img
				:src="selectedUser.avatarUrl"
				alt="profile image"
				class="size-36 rounded-full border border-slate-200 dark:border-slate-700"
			/>
			<div class="flex-1">
				<h2 class="text-3xl font-bold">
					{{ selectedUser.name || selectedUser.login }}
				</h2>
				<a
					:href="selectedUser.profileUrl"
					target="_blank"
					class="text-blue-500 hover:underline"
				>
					@{{ selectedUser.login }}
				</a>
				<p
					v-if="selectedUser.bio"
					class="mt-4 text-slate-600 dark:text-slate-300"
				>
					{{ selectedUser.bio }}
				</p>
				<p v-if="selectedUser.location" class="mt-2 text-slate-500">
					📍 {{ selectedUser.location }}
				</p>
			</div>
		</div>
		<div class="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
			<div class="rounded-xl bg-slate-100 p-4 text-center dark:bg-slate-700">
				<p class="text-2xl font-bold">
					{{ selectedUser.followers }}
				</p>
				<p class="text-sm text-slate-500 dark:text-slate-300">Followers</p>
			</div>
			<div class="rounded-xl bg-slate-100 p-4 text-center dark:bg-slate-700">
				<p class="text-2xl font-bold">
					{{ selectedUser.following }}
				</p>
				<p class="text-sm text-slate-500 dark:text-slate-300">Following</p>
			</div>
			<div class="rounded-xl bg-slate-100 p-4 text-center dark:bg-slate-700">
				<p class="text-2xl font-bold">
					{{ selectedUser.publicRepos }}
				</p>
				<p class="text-sm text-slate-500 dark:text-slate-300">Repositories</p>
			</div>
			<div class="rounded-xl bg-slate-100 p-4 text-center dark:bg-slate-700">
				<p class="text-2xl font-bold">
					{{ selectedUser.publicGists }}
				</p>
				<p class="text-sm text-slate-500 dark:text-slate-300">Gists</p>
			</div>
		</div>
		<div
			class="mt-6 flex flex-wrap gap-3 text-sm text-slate-500 dark:text-slate-400"
		>
			<span>
				Hireable:
				{{ selectedUser.hireable ? 'Yes' : 'No' }}
			</span>
			<span>
				Created:
				{{ new Date(selectedUser.createdAt).toLocaleDateString() }}
			</span>
			<span>
				Updated:
				{{ new Date(selectedUser.updatedAt).toLocaleDateString() }}
			</span>
		</div>
	</div>
</template>
