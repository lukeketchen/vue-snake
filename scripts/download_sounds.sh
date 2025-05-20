#!/bin/bash

# Create sounds directory if it doesn't exist
mkdir -p public/sounds

# Download sound effects
# Using mixkit.co free sound effects (license allows free use)

# Eat sound - "Game ball tap" sound
curl -o public/sounds/eat.mp3 "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3"

# Die sound - "Game over notification"
curl -o public/sounds/die.mp3 "https://assets.mixkit.co/active_storage/sfx/2658/2658-preview.mp3"

# Move sound - "Quick tap" sound (very short)
curl -o public/sounds/move.mp3 "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3"

# Start sound - "Achievement unlocked"
curl -o public/sounds/start.mp3 "https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3"

# Background music - "Game level music"
curl -o public/sounds/background.mp3 "https://assets.mixkit.co/active_storage/sfx/1818/1818-preview.mp3"

# Make script executable
chmod +x scripts/download_sounds.sh 