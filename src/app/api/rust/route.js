import dgram from 'dgram';

async function fetchServerData() {
    return new Promise((resolve, reject) => {
        const serverIP = '65.21.233.229';
        const queryPort = '28035';

        const client = dgram.createSocket('udp4');

        const query = Buffer.from([0xFF, 0xFF, 0xFF, 0xFF, 0x54, 0x53, 0x6F, 0x75, 0x72, 0x63, 0x65, 0x20, 0x45, 0x6E, 0x67, 0x69, 0x6E, 0x65, 0x20, 0x51, 0x75, 0x65, 0x72, 0x79, 0x00]);

        client.send(query, 0, query.length, queryPort, serverIP, (err, bytes) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                client.on('message', (msg) => {
                    const serverInfo = msg.toString('utf-8').split('\x00\x01');
                    const serverName = serverInfo[1];
                    const playerCount = parseInt(serverInfo[4]);

                    const data = { serverName, playerCount };
                    resolve(data);
                });
            }
        });
    });
}

export async function GET(request) {
    try {
        const serverData = await fetchServerData();

        return new Response(JSON.stringify(serverData), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (err) {
        console.error('Error fetching server data:', err);

        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}