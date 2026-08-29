# 💝 Romantic Interactive Birthday Web App

A highly interactive, cinematic, and deeply personalized React web application designed to be the ultimate digital birthday gift for your girlfriend/partner. 

Unlike a standard webpage, this app mimics the feeling of physical gifts through microphone interactions, beautiful cinematic animations, and elegant interactive elements.

## ✨ Features

- **Cinematic Splash Screen:** A beautiful intro with a glowing, beating heart that transitions into the app with a personalized message ("For My Bouuuuu...").
- **Physical Envelope:** A glassmorphism envelope that opens with a physically accurate animation.
- **Live Typewriter Letter:** Your personalized love letter slowly types itself out on the screen.
- **Interactive Storybook:** A responsive 3D-styled photo album that flips through your favorite memories.
- **Flip Cards:** Interactive cards revealing all the reasons you love her.
- **Interactive Blow-Out Cake:** A beautifully rendered 3D vector cake. By blowing into the device's **microphone**, the user physically blows out the digital candles!
- **Elegant Ribbon Backdrop:** Soft, romantic white balloons with pink satin bows and curling ribbons elegantly frame the sides of the screen.
- **Interactive Gift Boxes:** Once the candles are blown out, special animated gift boxes appear. Tapping them reveals delightful surprises (🧸 Teddy, 🍫 Chocolate, 🌹 Rose, 💍 Ring).
- **Interactive Stardust:** Touching or dragging a finger across the screen leaves a glowing trail of magical pink stardust.
- **Hidden Easter Egg:** A tiny, almost invisible star hidden in the corner that reveals a secret pop-up message when tapped.

## 🛠️ How to Customize for Your Partner

This repository is designed to be easily customizable. Clone it and replace the assets and text with your own!

### 1. Change the Photos and Audio
- Go to the `public/` folder.
- Add an optional `music.mp3` if you want persistent background music.
- Replace `birthday_tune.mp3` with the song you want to play when the cake candles are blown out.
- Add your favorite couple photos into the `public/` folder.

### 2. Update the Text
You will need to edit a few specific React components in the `src/components/` folder:
- **`Splash.jsx`**: Update the intro text ("For My Bouuuuu...").
- **`Letter.jsx`**: Update the `paragraphs` array at the top of the file with your own heartfelt letter.
- **`StoryBook.jsx`**: Update the `pages` array to point to your new photos in the `public/` folder, and write custom captions for each photo.
- **`Reasons.jsx`**: Update the `reasons` array with your actual personal reasons why you love her.
- **`App.jsx`**: Change the Easter Egg message at the very bottom of the file.
- **`Closing.jsx`**: Update names and dates.

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
