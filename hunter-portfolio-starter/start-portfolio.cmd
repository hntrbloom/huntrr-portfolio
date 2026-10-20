@echo off
setlocal
cd /d "%~dp0"
title Hunter's portfolio - local preview
set "PORTFOLIO_RUNTIME=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies"
if exist "%PORTFOLIO_RUNTIME%\bin\fallback\pnpm.cmd" goto bundled
where npm >nul 2>nul
if errorlevel 1 goto missing
if not exist "node_modules\vite" call npm install
if errorlevel 1 goto failed
call npm run dev -- --host 127.0.0.1
goto finished
:bundled
set "PATH=%PORTFOLIO_RUNTIME%\node\bin;%PATH%"
if not exist "node_modules\vite" call "%PORTFOLIO_RUNTIME%\bin\fallback\pnpm.cmd" install --store-dir .pnpm-store
if errorlevel 1 goto failed
call "%PORTFOLIO_RUNTIME%\bin\fallback\pnpm.cmd" run dev --host 127.0.0.1
goto finished
:missing
echo Node.js with npm is needed to run this starter.
echo Install Node.js, then double-click this file again.
pause
exit /b 1
:failed
echo Setup could not finish. Keep this window open to read the error above.
pause
exit /b 1
:finished
if errorlevel 1 pause
