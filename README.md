# Gupload

A quick file uploader made for your MacOS toolbar.


I made this app because I needed a fast way to send clients custom vector image files. Dropbox? No- this is a solution that surpasses Dropbox in speed and simplicity.


## Features

- 📂 Drag & drop (or select) one or more files from the menu bar
- ⚡ Files are uploaded to [Gofile](https://gofile.io), with no account needed
- 🔗 Get a single share link for the whole upload & copy it in one click
- 📊 Live upload progress
- 🔄 Auto-updates in the background (electron-updater)

Built with **Electron** + **[menubar](https://github.com/max-mapper/menubar)**.



## Installation

To run this app, download the latest __.dmg__ installer in [Releases](https://github.com/soleribbon/Gupload/releases).

After downloading:
- Double click the dmg disk image file
- Drag "Gup" app to Applications folder
- Go to Applications folder & open ✅

This app is signed & notarized with Apple, so you shouldn't encounter any certification issues. 

> ❕ **Note:** Release builds are for Apple Silicon (arm64) Macs.


## Run from Source

```bash
git clone https://github.com/soleribbon/Gupload.git
cd Gupload
npm install
npm start
```

`npm run build` creates a macOS build with electron-builder.


## Authors

- [@soleribbon](https://www.github.com/soleribbon)

