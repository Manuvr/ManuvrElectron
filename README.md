# ManuvrElectron
An electron front-end to Manuvr's JS libraries.

NOTE:  This requires our MHB library.  https://github.com/Manuvr/MHB

Instructions:
  npm install webpack webpack-dev-server webpack-dev-middleware electron-prebuilt -g
  npm install

  ln -s /path/to/MHB ./node_modules/MHB

  npm start

  You may have to reload the electron window while webpack does it's thing.  For easier
  use, just open two terminals, and run "npm run dev" in the first, and "npm start" in the second.
