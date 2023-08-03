import axios from 'axios';
import querystring from 'querystring';

const { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, DISCORD_REDIRECT_URI } = process.env;

const handler = async (req, res) => {
    const { code } = req.query;

    try {
        const response = await axios.post(
            'https://discord.com/api/oauth2/token',
            querystring.stringify({
                client_id: DISCORD_CLIENT_ID,
                client_secret: DISCORD_CLIENT_SECRET,
                grant_type: 'authorization_code',
                code,
                redirect_uri: DISCORD_REDIRECT_URI,
                scope: 'identify email',
            })
        );

        const { access_token } = response.data;

        res.redirect('/dashboard');
    } catch (err) {
        console.error('Discord OAuth error', err);
        res.status(500).send('OAuth process failed.');
    }
};

export default handler;