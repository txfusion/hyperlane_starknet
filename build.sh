#!/bin/bash

# Navigate to the cairo directory
cd cairo 

# Build the project using scarb
# Uncomment the next line if you want to enable the build process
scarb build || { echo "Scarb build failed"; exit 1; }

# Copy the build output to the sdk directory
cp -R ./target ../sdk/src/target || { echo "Failed to copy target directory"; exit 1; }

# Navigate to the sdk directory
cd ../sdk 

# Build the sdk project
yarn build || { echo "Yarn build failed"; exit 1; }