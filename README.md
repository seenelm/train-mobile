🚀 Advanced Setup and Run Instructions

Welcome to the project! Follow the steps below to get started. 🎉

Prerequisites
Before starting, ensure the following dependencies are installed on your system:

Node.js & npm:
Install Node.js (LTS recommended) from Node.js official website.
Verify installation:
node -v
npm -v
React Native CLI:
Install globally if not already installed:
npm install -g react-native-cli
CocoaPods (for iOS dependencies):
Install using Ruby:
sudo gem install cocoapods
Verify installation:
pod --version
Xcode (for iOS builds):
Ensure you have the latest version installed from the Mac App Store.
Open Xcode and agree to any license agreements.
Install additional tools:
xcode-select --install
Watchman (to watch file changes):
Install via Homebrew:
brew install watchman
Repository Setup and Build Process
Follow these steps to clone the repository, install dependencies, and build the project.

1. Clone the Repository

Clone the repository to your local machine:

git clone <repository_url>
cd <repository_directory> 2. Install Dependencies

Install all required packages:

npm install 3. iOS Setup

Navigate to the ios directory and install iOS dependencies:

cd ios
pod install
cd .. 4. Build and Run the Project

Build the iOS project and launch it on a simulator or connected device:

npx react-native run-ios 5. Start the Metro Bundler

In a separate terminal window, start the React Native Metro bundler:

npm start
Advanced Tips for Common Scenarios
Cleaning and Resetting Cache

If you encounter build or dependency issues, try cleaning and resetting the cache:

npm run clean
Alternatively, run the commands manually:

watchman watch-del-all
rm -rf node_modules && npm install
rm -rf ios/Pods ios/Podfile.lock && cd ios && pod install && cd ..
npm start --reset-cache
Running on a Specific Device

To run the app on a specific iOS simulator:

npx react-native run-ios --device "iPhone 14 Pro"
Debugging Build Failures

If the build fails, verify:

iOS Logs:
npx react-native log-ios
CocoaPods Errors: Re-run pod install in the ios directory.
Testing Production Build

Generate a release build for iOS:

npx react-native run-ios --configuration Release
Hot Reloading

Ensure fast refresh and hot reloading are enabled in the Metro Bundler. Open the in-app developer menu (⌘D or shake the device) and toggle these settings as needed.

Optional: Automating the Workflow
You can create a custom script (e.g., setup.sh) to automate the setup process:

#!/bin/bash
echo "Cloning repository..."
git clone <repository_url> || { echo "Git clone failed"; exit 1; }

cd <repository_directory> || { echo "Failed to navigate to repository"; exit 1; }

echo "Installing npm dependencies..."
npm install || { echo "npm install failed"; exit 1; }

echo "Installing CocoaPods dependencies..."
cd ios && pod install || { echo "CocoaPods install failed"; exit 1; }
cd ..

echo "Starting the build process..."
npx react-native run-ios || { echo "Build failed"; exit 1; }

echo "Launching Metro bundler..."
npm start
Make it executable:

chmod +x setup.sh
Run the script:

./setup.sh
