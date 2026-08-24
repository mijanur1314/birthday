# 💝 Romantic Interactive Birthday Web App

A highly interactive, cinematic, and deeply personalized React web application designed to be the ultimate digital birthday gift for your girlfriend/partner. 

Unlike a standard webpage, this app mimics the feeling of physical gifts through 3D gyroscope tilting, microphone interactions, and beautiful cinematic animations.

## ✨ Features

- **Cinematic Splash Screen:** A dark, dramatic intro with a glowing, beating heart that aggressively zooms in to transition into the app.
- **Physical Envelope:** A glassmorphism envelope that opens with a physically accurate animation.
- **Live Typewriter Letter:** Your personalized love letter slowly types itself out on the screen.
- **3D Gyroscope Interactions:** If viewed on a mobile device, tilting the phone physically tilts the envelope, the letter, the photo album, and the cards in 3D space.
- **Interactive Blow-Out Cake:** A beautifully rendered 3D vector cake. By blowing into the device's **microphone**, the user physically blows out the digital candles!
- **Interactive Stardust:** Touching or dragging a finger across the screen leaves a glowing trail of magical pink stardust.
- **Cheeky Mini-Game:** A playful "Do you love me?" final screen where the "No" button constantly runs away from the user's touch.
- **Hidden Easter Egg:** A tiny, almost invisible star hidden in the corner that reveals a secret pop-up message when tapped.

## 🛠️ How to Customize for Your Partner

This repository is designed to be easily customizable. Clone it and replace the assets and text with your own!

### 1. Change the Photos and Audio
- Go to the `public/` folder.
- Replace `music.mp3` with "your song" (it plays in the background).
- Replace `birthday_tune.mp3` with the song you want to play when the cake appears.
- Add your favorite couple photos into the `public/` folder.

### 2. Update the Text
You will need to edit a few specific React components in the `src/components/` folder:
- **`Letter.jsx`**: Update the `paragraphs` array at the top of the file with your own heartfelt letter.
- **`StoryBook.jsx`**: Update the `pages` array to point to your new photos in the `public/` folder, and write custom captions for each photo.
- **`Reasons.jsx`**: Update the `reasons` array with your actual personal reasons why you love her.
- **`App.jsx`**: Change the Easter Egg message at the very bottom of the file.
- **`Splash.jsx` / `Closing.jsx`**: Update names and dates.

## 🚀 Running Locally

This project is built with React and Vite.

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser.

## 🌍 Deployment

Since this is a standard Vite React app, deployment is incredibly easy and free.

**Recommended: Vercel**
1. Push your customized code to your own GitHub repository.
2. Go to [Vercel](https://vercel.com) and log in.
3. Click **Add New Project**, select your repository, and click **Deploy**.
4. Send the link to your partner! 

---
*Made with ❤️ and React.*
