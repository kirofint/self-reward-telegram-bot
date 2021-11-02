# Self-Reward
## Step-by-step guide for install and run the bot locally

## 1. Clone this repository
```
git clone https://github.com/kirofint/self-reward-telegram-bot
```
## 2. Launch [mongo db](https://www.mongodb.com/)
## 3. Create `.env` and fill in your `environment variables`
## 4. Run the command to install yarn packages
```
yarn
```
## 5. Finally run
```
yarn serve
```

# Environment variables

- `ADMIN_ID` — It's your telegram ID. You may get it, with `ctx.from` command
- `TOKEN` — Telegram bot token
- `MONGO` — URL of the mongo database
