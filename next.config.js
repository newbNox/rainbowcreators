module.exports = {
    output: 'standalone',

    async redirects() {
        return [
            {
                source: '/discord',
                destination: 'https://discord.gg/AtsPhp3Wk2',
                permanent: true
            }
        ]
    }
}