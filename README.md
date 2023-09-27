# Discord Oauth2 Example
> Disclaimer: Before you start make sure you already have [Node.js](https://nodejs.org/de) installed.
>
> This only fetches user information if the code is running.
>
> People have to Authorize the Application so you get the information.

This project was created to show how easy it is to use the Discord Oauth2 to access users information such as Email, Username, ID, Badges, Nitro by just using Javascript.

## ✨Features

* ✔️ Getting started;
* 🤔 Questions;
* 🎨 Showcase;
* 💻 Development & Support;

## 🚀 Getting started
### 1. Create Application & Generate URL

First of all you need to create a new Application [here](https://discord.com/developers/applications). After that go to the OAuth2/General tab and add a new Redirect by passing `http://localhost:1500/api/auth/discord/redirect` into the field.
<img src="https://cdn.discordapp.com/attachments/1154759668489539624/1156616602817663016/kgHHsnqrpR.png?ex=65159ea7&is=65144d27&hm=d96c36d3e891d844b06dc7c6157a498131c63bbe26f209e3f8eaa3605b172719&" />

After that we have to generate a url. We can do this by going to the OAuth2/URL Generator tab. After that we can enable the scopes we want this is what I selected:
<img src="https://cdn.discordapp.com/attachments/1154759668489539624/1156619590198116522/wrZouHwvEW.png?ex=6515a16f&is=65144fef&hm=7d4233cf98799d896a1fdcdcc263bc711a3c9796025267076cf4e4b5b9126c20&" />

### 2. Initalize project

Make sure to create a new folder anywhere on your pc and run this line below using command prompt. (**inside the folder**)!

```
npm init -y
```

### 3. Install all required dependencies

Make sure to install all required dependencies. Again run this line using command prompt (**inside the folder**)!

```
npm i dotenv express axios url
```

### 4. Create index.js file & paste code

Create the `index.js` file inside our folder and paste the code from above inside of it.

### 5. Create .env file and fill in the required things.

This is how it should look like:

```
ClientID = YourClientID
ClientSecret = YourClientSecret
PORT = YourPort (default is 1500)
webHookUrl = YourWebHookUrl
```

### 6. Run index.js

This is how to run the index.js file:
```
node index.js
```
## 🤔 Questions

### How do I find my ClientID?
To find your ClientID of your Application you have to go to your application and click on OAuth2 -> General. There you should see your ClientID.

<img src="https://cdn.discordapp.com/attachments/1154759668489539624/1156617452491386931/lPmX0kpBqe.png?ex=65159f71&is=65144df1&hm=5c4126cf854f3fe0fd18755662ba9da8ca598839d43e7282a7d7be0a53d92bb8&" />

### How do I find my ClientSecret?
To find your ClientSecret of your Application you have to go to your application and click on OAuth2 -> General. There you should see your ClientSecret (Click on `Reset Secret` if its not shown).
<img src="https://cdn.discordapp.com/attachments/1154759668489539624/1156617452491386931/lPmX0kpBqe.png?ex=65159f71&is=65144df1&hm=5c4126cf854f3fe0fd18755662ba9da8ca598839d43e7282a7d7be0a53d92bb8&" />

## 🎨 Showcase
This is how it should look like if someone clicks on the link.
<img src="https://cdn.discordapp.com/attachments/1154759668489539624/1156618582944399501/ClPmKqmAP3.png?ex=6515a07f&is=65144eff&hm=5c99028ed9380655e85caf55090031799603a9cf185ce89d678b30c909825259&" />

## 💻 Development & Support
This was created by [Skyjs](https://github.com/Skyjs123)

Join the [Support Server](https://discord.gg/skyjs) if you need help.
