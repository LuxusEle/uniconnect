@echo off
echo STARTING SYNC > sync_log.txt
echo CONFIGURING GIT >> sync_log.txt
git config user.email "agent@bot.com" >> sync_log.txt 2>&1
git config user.name "Agent Bot" >> sync_log.txt 2>&1

echo CHECKOUT MAIN >> sync_log.txt
git checkout -B main >> sync_log.txt 2>&1

echo ADDING FILES >> sync_log.txt
git add . >> sync_log.txt 2>&1

echo COMMITTING >> sync_log.txt
git commit -m "Forced Update: Core Modules Implementation" >> sync_log.txt 2>&1

echo PUSHING >> sync_log.txt
git push https://github.com/LuxusEle/uniconnect.git main >> sync_log.txt 2>&1

echo DONE >> sync_log.txt
type sync_log.txt
