@echo off
title AutoMind AI - Car Recommendation Chatbot
echo ========================================================
echo Starting AutoMind AI Web Application...
echo ========================================================

where py >nul 2>nul
if %ERRORLEVEL% equ 0 (
    py run_app.py
    goto end
)

where python >nul 2>nul
if %ERRORLEVEL% equ 0 (
    python run_app.py
    goto end
)

echo Python was not detected in PATH.
echo Please run a local web server in this folder (e.g. npx serve, python -m http.server 3000)
pause

:end
