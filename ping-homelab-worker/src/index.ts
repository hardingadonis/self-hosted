export default {
	async fetch(req) {
		const url = new URL(req.url);
		url.pathname = '/__scheduled';
		url.searchParams.append('cron', '*/10 * * * *');
		return new Response(
			`To test the scheduled handler, ensure you have used the "--test-scheduled" then try running "curl ${url.href}".`,
		);
	},

	async scheduled(event, env, ctx): Promise<void> {
		const resp = await fetch(env.API_PING_URL);

		if (!resp.ok) {
			const api = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`;

			await fetch(api, {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({
					chat_id: env.TELEGRAM_CHAT_ID,
					text: 'Server chết rồi!\n\nServer chết rồi!\n\nServer chết rồi!',
					disable_web_page_preview: true,
				}),
			});
		}
	},
} satisfies ExportedHandler<Env>;
