export interface IGithubUserResponse {
	login: string;
	id: number;
	node_id: string;
	avatar_url: string;
	gravatar_id: string;
	url: string;
	html_url: string;
	followers_url: string;
	following_url: string;
	gists_url: string;
	starred_url: string;
	subscriptions_url: string;
	organizations_url: string;
	repos_url: string;
	events_url: string;
	received_events_url: string;
	type: string;
	user_view_type: string;
	site_admin: boolean;
	name: string | null;
	company: string | null;
	blog: string | null;
	location: string | null;
	email: string | null;
	hireable: boolean | null;
	bio: string | null;
	twitter_username: string | null;
	public_repos: number;
	public_gists: number;
	followers: number;
	following: number;
	created_at: string;
	updated_at: string;
}

export interface IUser {
	login: string;
	id: number;
	avatarUrl: string;
	name: string | null;
	bio: string | null;
	location: string | null;
	profileUrl: string;
	followers: number;
	following: number;
	publicRepos: number;
	publicGists: number;
	hireable: boolean | null;
	createdAt: string;
	updatedAt: string;
}

export interface IRepository {
	id: number;
	name: string;
	description: string | null;
	language: string | null;
	stargazersCount: number;
	forksCount: number;
	htmlUrl: string;
	updatedAt: string;
}

export interface ISuggestions {
	id: number;
	avatar_url: string;
	login: string;
}
