<script setup lang="ts">
import type { IUser } from '@/types';

defineProps<{ selectedUser: IUser | null; loading: boolean }>();
</script>

<template>
	<p v-if="loading">Loading...</p>
	<div v-if="selectedUser && !loading">
		<div class="flex gap-2">
			<div>
				<img
					:src="selectedUser.avatarUrl"
					alt="profile image"
					width="128px"
					height="128px"
				/>
			</div>
			<div>
				<p>{{ selectedUser.name }}</p>
				<p>
					<a :href="selectedUser.profileUrl" target="_blank">{{
						selectedUser.login
					}}</a>
				</p>
				<p>{{ selectedUser.bio }}</p>
				<p>{{ selectedUser.location }}</p>
			</div>
		</div>
		<div>
			<p>Followers: {{ selectedUser.followers }}</p>
			<p>Following: {{ selectedUser.following }}</p>
			<p>Public repositories: {{ selectedUser.publicRepos }}</p>
			<p>Public gists: {{ selectedUser.publicGists }}</p>
			<p>Hireable: {{ selectedUser.hireable }}</p>
			<p>Created at: {{ selectedUser.createdAt }}</p>
			<p>Updated at: {{ selectedUser.updatedAt }}</p>
		</div>
	</div>
</template>
