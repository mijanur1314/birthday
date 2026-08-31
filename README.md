# 💝 Romantic Interactive Birthday Web App

A highly interactive, cinematic, and deeply personalized React web application designed to be the ultimate digital birthday gift for your partner.

Unlike a standard webpage, this app mimics the feeling of physical gifts through microphone interactions, beautiful cinematic animations, interactive polaroids, hidden letters, and elegant glassmorphism UI.

## ✨ Features

- **Cinematic Splash Screen:** A beautiful intro with a glowing, beating heart that transitions into the app with a personalized message.
- **Global Background Music:** A floating music toggle that plays a continuous romantic track (`bgm.mp3`) across the entire experience.
- **Physical Envelope:** A glassmorphism envelope that opens with a physically accurate animation.
- **Live Typewriter Letter:** Your personalized love letter slowly types itself out on the screen.
- **Interactive Storybook:** A responsive 3D-styled photo album that flips through your favorite memories, complete with beautiful placeholder dates.
- **Flip Cards (Reasons):** Interactive cards revealing all the reasons you love her.
- **Promises:** Beautifully styled cards detailing the romantic promises you make to her.
- **"Open When..." Letters:** A charming grid of mini-envelopes that, when clicked, slide open to reveal secret glassmorphism letters (e.g., "Open when you miss me").
- **Clickable Polaroid Wall:** A beautiful scattered wall of polaroid photos. Clicking a photo smoothly zooms it to the center of the screen, dimming the background and revealing a long, private caption underneath.
- **Personal Video Message:** A dedicated page for her to play a special video message (`message.mp4`) from you, seamlessly pausing the background music.
- **Interactive Blow-Out Cake:** A beautifully rendered 3D vector cake. By blowing into the device's **microphone**, she physically blows out the digital candles!
- **Handwritten Bangla Dua:** After answering the final question ("Do you love me?"), a deeply personal handwritten-style Bangla prayer fades in on a softly glowing white note card.

## 🛠️ How to Customize for Your Partner

This repository is designed to be easily customizable. Clone it and replace the assets and text with your own!

### 1. Change the Photos and Audio

- Go to the `public/` folder.
- Add `bgm.mp3` for the persistent background music.
- Replace `birthday_tune.mp3` with the song you want to play when the cake candles are blown out.
- Add `message.mp4` for the personal video note.
- Add your favorite couple photos into the `public/` folder. _(Note: Compress large files if deploying to the web!)_

### 2. Update the Text

You will need to edit a few specific React components in the `src/components/` folder:

- **`Splash.jsx`**: Update the intro text.
- **`Letter.jsx`**: Update the `paragraphs` array with your heartfelt letter.
- **`StoryBook.jsx`**: Update the `storyPages` array to point to your new photos and write custom captions/dates.
- **`Reasons.jsx`**: Update the `reasons` array with your personal reasons.
- **`Promises.jsx`**: Update the `promises` array.
- **`OpenWhen.jsx`**: Customize the letters inside the `envelopes` array.
- **`PolaroidWall.jsx`**: Update the `polaroids` array with your photos and long captions.
- **`Closing.jsx`**: Update the final questions, names, and the handwritten Bangla dua.

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

_Made with ❤️ and React._
