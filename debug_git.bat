@echo off
echo --- GIT STATUS --- > debug_git.log
git status >> debug_git.log 2>&1
echo. >> debug_git.log
echo --- GIT PULL --- >> debug_git.log
git pull --rebase >> debug_git.log 2>&1
echo. >> debug_git.log
echo --- GIT PUSH --- >> debug_git.log
git push >> debug_git.log 2>&1
