# 🛸 Picoo Pinger

> **The Heartbeat of Picoo Music Bot**

`Picoo Pinger` ek ultra-lightweight Cloudflare Worker hai jo Render par hosted services ko **24/7 zinda** rakhta hai. Ye Render ke free tier ko "Sleep Mode" mein jaane se rokta hai.

## ✨ Features
* 🚀 **Multi-Target:** Ek saath kayi URLs ko ping karne ki capacity.
* ⏰ **Auto-Schedule:** Cloudflare Cron Triggers ke saath 24/7 automation.
* 🛠️ **Manual Trigger:** `/ping` endpoint se kabhi bhi manual wake-up call dein.
* 🛰️ **Futuristic & Fast:** Optimized for low latency and zero downtime.

## 🚀 How to Use
1. Cloudflare Workers mein ek naya worker banayein.
2. `worker.js` ka code paste karein.
3. `urlsToPing` list mein apne Render URLs daalein.
4. Cron Trigger set karein: `*/10 * * * *` (Every 10 minutes).

## 📂 Project Structure
- `worker.js` - Main logic for the pinger.
- `README.md` - Documentation.

---
**Maintained by [Manish](https://github.com/glowmatelab)** *Part of the Antavion Ecosystem.*
