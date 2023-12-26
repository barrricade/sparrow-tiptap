module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontSize: {
        tiny: ["0.625rem", "0.8125rem"],
        "tiny+": ["0.6875rem", "0.875rem"],
        "xs+": ["0.8125rem", "1.125rem"],
        "xxs": ["0.625rem", "0.75rem"],
        "sm+": ["0.9375rem", "1.375rem"],
      },
      colors: (theme) => {
        return {
          navy: {
            50: "#E7E9EF",
            100: "#C2C9D6",
            200: "#A3ADC2",
            300: "#697A9B",
            400: "#5C6B8A",
            450: "#465675",
            500: "#384766",
            600: "#313E59",
            700: "#26334D",
            750: "#222E45",
            800: "#202B40",
            900: "#192132",
          },
          "slate-150": "#E9EEF5",

          "primary": 'rgb(var(--theme-color-primary) / <alpha-value>)',
          "primary-focus": 'rgb(var(--theme-color-primary-focus) / <alpha-value>)',

          "secondary": "rgba(var(--theme-color-secondary) / <alpha-value>)",
          "secondary-light": "rgba(var(--theme-color-secondary-light) / <alpha-value>)",
          "secondary-focus": "rgba(var(--theme-color-secondary-focus) / <alpha-value>)",

          "accent": "rgba(var(--theme-color-accent) / <alpha-value>)",
          "accent-light": "rgba(var(--theme-color-accent-light) / <alpha-value>)",
          "accent-focus": "rgba(var(--theme-color-accent-focus) / <alpha-value>)",

          "info": "rgba(var(--theme-color-info) / <alpha-value>)",
          "info-focus": "rgba(var(--theme-color-info-focus) / <alpha-value>)",

          "success": "rgba(var(--theme-color-success) / <alpha-value>)",
          "success-focus": "rgba(var(--theme-color-success-focus) / <alpha-value>)",

          "warning": "rgba(var(--theme-color-warning) / <alpha-value>)",
          "warning-focus": "rgba(var(--theme-color-warning-focus) / <alpha-value>)",

          "error": "rgba(var(--theme-color-error) / <alpha-value>)",
          "error-focus": "rgba(var(--theme-color-error-focus) / <alpha-value>)",
        };
      },
      opacity: {
        15: ".15",
      },
      spacing: {
        4.5: "1.125rem",
        5.5: "1.375rem",
        18: "4.5rem",
      },
      boxShadow: {
        soft: "0 3px 10px 0 rgb(48 46 56 / 6%)",
        "soft-dark": "0 3px 10px 0 rgb(25 33 50 / 30%)",
      },
      zIndex: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
      },
      keyframes: {
        "fade-out": {
          "0%": {
            opacity: 1,
            visibility: "visible",
          },
          "100%": {
            opacity: 0,
            visibility: "hidden",
          },
        },
      },
      backgroundImage: {
        'loading': "var(--loading-image-url)",
      }
    }
  },
  corePlugins: {
    textOpacity: false,
    backgroundOpacity: false,
    borderOpacity: false,
    divideOpacity: false,
    placeholderOpacity: false,
    ringOpacity: false,
  },
  plugins: [
    function ({ addVariant }) {
      addVariant(
        "supports-backdrop-blur",
        "@supports (backdrop-filter: blur(0)) or (-webkit-backdrop-filter: blur(0))"
      );
    },
  ],
}
