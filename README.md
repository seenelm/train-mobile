<p align="center">
  <img src="https://github.com/seenelm/train-web/blob/main/src/assets/icons/logo.svg?raw=true" alt="Logo" width="150">
</p>

---


Welcome to the train app! Follow the steps below to get started. 🎉

Prerequisites
Before starting, ensure the following dependencies are installed on your system:

## ⚙️ Prerequisites

| Tool               | Installation Command/URL                          | Verification Command    |
|--------------------|--------------------------------------------------|-------------------------|
| **Node.js & npm**   | [Download Node.js (LTS)](https://nodejs.org/)     | `node -v` / `npm -v`    |
| **React Native CLI**| `npm install -g react-native-cli`                | N/A                     |
| **Ruby**            | macOS: `brew install ruby` or use [rbenv](https://github.com/rbenv/rbenv) | `ruby -v`              |
| **CocoaPods**       | `sudo gem install cocoapods`                     | `pod --version`         |
| **Xcode**           | Install from [Mac App Store](https://apps.apple.com/) | Open Xcode & Agree to Terms |
| **Watchman**        | `brew install watchman`                          | N/A                     |


### 1️⃣ Clone the Repository

Clone the repository to your local machine:

```bash
git clone <repository_url>
cd <repository_directory>
```

### 2️⃣ Install Dependencies
Install all required packages:

```bash
npm install
```

### 3️⃣ iOS Setup
Navigate to the ios directory and install iOS dependencies:

```bash
cd ios
pod install
cd ..
```

### 4️⃣ Build and Run the Project
Build the iOS project and launch it on a simulator or connected device:

```bash
npx react-native run-ios
```

### 5️⃣ Start the Metro Bundler - Run
Once the project has been built, start the React Native Metro bundler:

```bash
npm start
