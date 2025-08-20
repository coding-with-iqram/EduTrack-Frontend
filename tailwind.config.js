/** @type {import('tailwindcss').Config} */
module.exports = {
  // যেসব ফাইলে Tailwind ক্লাস ব্যবহার করা হবে
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      // Custom animation definition
      animation: {
        'fade-in-down': 'fadeInDown 0.3s ease-out',
      },

      // Custom keyframes for animation
      keyframes: {
        fadeInDown: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },

  // প্লাগইন যোগ করার জায়গা (যেমন: aspect-ratio)
  plugins: [
    // require('@tailwindcss/aspect-ratio'), // এই লাইন আনকমেন্ট করো যদি aspect-ratio দরকার হয়
  ],
};
