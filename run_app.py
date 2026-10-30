#!/usr/bin/env python3
"""
AutoMind AI - Local Development Runner
Serves the web application and launches default browser.
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 3000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        # Clean logging
        sys.stderr.write(f"[{self.log_date_time_string()}] {args[0]} -> Status {args[1]}\n")

def run():
    os.chdir(DIRECTORY)
    port = PORT
    max_tries = 10

    for attempt in range(max_tries):
        try:
            with socketserver.TCPServer(("", port), Handler) as httpd:
                url = f"http://localhost:{port}"
                print("=" * 65)
                print("🚗 AutoMind AI — Intelligent Car Recommendation Chatbot")
                print("=" * 65)
                print(f"🚀 Frontend Server is live at: {url}")
                print("📄 Serving directory:        ", DIRECTORY)
                print("✨ Modern ES Module & Tailwind UI architecture loaded.")
                print("💡 Press Ctrl+C in this terminal to stop the server.")
                print("=" * 65)

                try:
                    webbrowser.open(url)
                except Exception:
                    pass

                httpd.serve_forever()
                break
        except OSError as e:
            if "Address already in use" in str(e) or e.errno == 98 or e.errno == 10048:
                port += 1
                continue
            else:
                raise e

if __name__ == "__main__":
    try:
        run()
    except KeyboardInterrupt:
        print("\n🛑 AutoMind AI server stopped.")
