<script setup lang="ts">
import type { IUser } from '@/types';

defineProps<{ selectedUser: IUser | null; loading: boolean }>();
</script>

<template>
	<p v-if="loading">Loading...</p>
	<div v-if="selectedUser && !loading">
		<p v-for="(value, key) in selectedUser">{{ key }}: {{ value }}</p>
	</div>
</template>
