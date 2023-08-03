const { DISCORD_CLIENT_ID, DISCORD_REDIRECT_URI } = process.env;

const scopes = ['identify', 'email'];

const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${DISCORD_REDIRECT_URI}&response_type=code&scope=${scopes.join(' ')}`;

export default (req, res) => {
    const data = { url: discordAuthUrl };
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
};