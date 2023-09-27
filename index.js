require('dotenv/config');
const express = require('express');
const axios = require('axios');
const url = require('url');
const port = process.env.PORT || 1500;
const app = express();

const flagValues = {
    STAFF: 1 << 0,
    PARTNER: 1 << 1,
    HYPESQUAD: 1 << 2,
    BUG_HUNTER_LEVEL_1: 1 << 3,
    HYPESQUAD_ONLINE_HOUSE_1: 1 << 6,
    HYPESQUAD_ONLINE_HOUSE_2: 1 << 7,
    HYPESQUAD_ONLINE_HOUSE_3: 1 << 8,
    PREMIUM_EARLY_SUPPORTER: 1 << 9,
    BUG_HUNTER_LEVEL_2: 1 << 14,
    VERIFIED_DEVELOPER: 1 << 17,
    CERTIFIED_MODERATOR: 1 << 18,
    ACTIVE_DEVELOPER: 1 << 22,
};

const flagEmojis = {
    HYPESQUAD_ONLINE_HOUSE_1: '<:Bravery:1126873372832313464>',
    ACTIVE_DEVELOPER: '<:ActiveDeveloper:1126873398434353242>',
    HYPESQUAD_ONLINE_HOUSE_2: '<:Brilliance:1126873375596367983>',
    HYPESQUAD_ONLINE_HOUSE_3: '<:Balance:1126873448816328714>',
    STAFF: '<:DiscordStaff:1126873378377179256>',
    PARTNER: '<:Partner:1126873389299159071>',
    CERTIFIED_MODERATOR: '<:CertifiedModerator:1126873447092461695>',
    HYPESQUAD: '<:Hypesquad:1126873383439708301>',
    BUG_HUNTER_LEVEL_1: '<:BugHunter1:1126873377035014255>',
    BUG_HUNTER_LEVEL_2: '<:BugHunter2:1112032542871269407>',
    VERIFIED_DEVELOPER: '<:VerifiedBotDeveloper:1126873396370747403>',
    PREMIUM_EARLY_SUPPORTER: '<:EarlySupporter:1126873382034616391>',
};
function decodeFlags(flags) {
    const decodedFlags = [];
    
    for (const flagName in flagValues) {
        if (flags & flagValues[flagName]) {
            const emoji = flagEmojis[flagName];
            decodedFlags.push(emoji);
        }
    }
    
    return decodedFlags;
}
app.get('/api/auth/discord/redirect', async (req, res) => {
    const { code } = req.query;
    console.log(code)
    if (code) {
        const formData = new url.URLSearchParams({
            client_id: process.env.ClientID,
            client_secret: process.env.ClientSecret,
            grant_type: 'authorization_code',
            code: code.toString(),
            redirect_uri: 'http://localhost:1500/api/auth/discord/redirect',
        })

        const output = await axios.post('https://discord.com/api/v10/oauth2/token',
            formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
        });

        if (output.data) {
            const access = output.data.access_token;
            const userinfo = await axios.get('https://discord.com/api/v10/users/@me', {
                headers: {
                    'Authorization': `Bearer ${access}`,
                },
            });
            const userData = userinfo.data;
            let userFlags = null;
            if (userData.flags) {
                userFlags = decodeFlags(userData.flags);
            }
            let badgeDescription = [];
            badgeDescription.push(userFlags.join(' '))
            if (userData.premium_type) {
                badgeDescription.push('<:nitro:1145742406709428234>')
            }

            if (badgeDescription.length === 0) {
                badgeDescription.push(' ');
            }

            const creationTimestamp = (BigInt(userData.id) >> 22n) + 1420070400000n;
            const unixTimestamp = Number(creationTimestamp / 1000n);
            let avatarUrl;
            if (userData.avatar) {
                avatarUrl = userData.avatar.startsWith('a_')
                    ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.gif`
                    : `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`;
            }
            
            const payload = {
                "embeds": [
                    {
                        "id": 221340517,
                        "description": `${badgeDescription.join('')}`,
                        "fields": [
                            {
                                "id": 149200145,
                                "name": "👥 User:",
                                "value": `${userData.username}\`(${userData.id})\``
                            },
                            {
                                "id": 149200145,
                                "name": "⏰ Created at:",
                                "value": `<t:${unixTimestamp}:F>`
                            },
                            {
                                "id": 149200145,
                                "name": "🔗 Email:",
                                "value": `${userData.email}`
                            },
                        ],
                        "color": 4735733,
                        "thumbnail": {
                            "url": `${avatarUrl}`
                        },
                        "author": {
                            "icon_url": `${avatarUrl}`,
                            "name": `${userData.username}`
                        },
                        "footer": {
                            "text": "Oauth2 Log",
                            "icon_url": `${avatarUrl}`
                        },
                    }
                ],
                "components": [],
                "actions": {},
                "username": "Oauth Logger",
                "avatar_url": "https://cdn.discordapp.com/attachments/1125003545591152702/1153383526209695794/standard_9.gif"
            };
            axios.post(process.env.webHookUrl, payload)
            .then((response) => {
                
            })
            .catch((error) => {
                console.log(error)
            })
            const formData1 = new url.URLSearchParams({
                client_id: process.env.ClientID,
                client_secret: process.env.ClientSecret,
                grant_type: 'refresh_token',
                refresh_token: output.data.refresh_token,
            });
    
            const refresh = await axios.post('https://discord.com/api/v10/oauth2/token',
                formData1, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
            });
           // console.log(output.data, userData, refresh.data);
        }
    }
});

app.listen(port, () => {
    console.log(`Running on ${port}`);
});
