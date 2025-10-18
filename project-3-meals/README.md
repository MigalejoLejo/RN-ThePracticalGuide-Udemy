# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.



TODO:
src/
│
├── app/                        # ✅ Expo Router routes live here
│   ├── _layout.tsx             # Root layout (themes, providers, etc.)
│   ├── index.tsx               # App entry screen
│   │
│   ├── (auth)/                 # Auth flow
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── forgot-password.tsx
│   │
│   ├── (main)/                 # Main user flow (after login)
│   │   ├── _layout.tsx
│   │   ├── (tabs)/             # Bottom tabs navigator group
│   │   │   ├── _layout.tsx
│   │   │   ├── home.tsx
│   │   │   ├── explore.tsx
│   │   │   ├── favorites.tsx
│   │   │   └── profile.tsx
│   │   ├── settings.tsx
│   │   ├── notifications.tsx
│   │   └── about.tsx
│   │
│   └── (modals)/               # Modal stack (optional)
│       ├── _layout.tsx
│       └── feedback.tsx
│
├── components/                 # 🧩 Reusable UI components
│   ├── common/                 # Basic shared elements (Button, Card, etc.)
│   ├── layout/                 # Structural components (Header, Footer, etc.)
│   ├── forms/                  # Inputs, validation UI, etc.
│   └── navigation/             # Custom navigators, tab bars
│
├── hooks/                      # 🪝 Reusable custom hooks
│   ├── app/                    # App-level logic (auth, theme, etc.)
│   └── domain/                 # Domain-specific hooks
│
├── context/                    # 🌍 React context providers
│   ├── AuthContext.tsx
│   ├── ThemeContext.tsx
│   └── ...
│
├── features/                   # 🧠 Domain logic grouped by feature
│   ├── meals/
│   │   ├── api/
│   │   │   └── mealsApi.ts
│   │   ├── components/
│   │   │   ├── MealCard.tsx
│   │   │   └── MealList.tsx
│   │   ├── hooks/
│   │   │   └── useMeals.ts
│   │   └── model/
│   │       └── mealTypes.ts
│   │
│   └── users/
│       ├── api/
│       ├── hooks/
│       └── model/
│
├── assets/                     # 🖼️ Images, icons, fonts, lottie files, etc.
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── lib/                        # 🧰 Third-party setup and configuration
│   ├── axios/
│   │   └── client.ts
│   ├── i18n/
│   │   └── index.ts
│   ├── analytics/
│   │   └── index.ts
│   └── navigation/
│       └── linking.ts          # Deep linking setup
│
├── store/                      # 🪙 State management (Redux, Zustand, Jotai, etc.)
│   ├── index.ts
│   ├── slices/
│   │   ├── authSlice.ts
│   │   └── userSlice.ts
│   └── persistConfig.ts
│
├── styles/                     # 🎨 Global styles, themes, constants
│   ├── colors.ts
│   ├── spacing.ts
│   ├── typography.ts
│   └── theme.ts
│
├── utils/                      # ⚙️ Utility and helper functions
│   ├── formatters.ts
│   ├── validators.ts
│   ├── date.ts
│   └── logger.ts
│
├── types/                      # 📘 Global TypeScript definitions
│   ├── env.d.ts
│   ├── navigation.d.ts
│   └── index.d.ts
│
└── config/                     # ⚙️ Environment and app configuration
    ├── env.ts
    ├── constants.ts
    └── firebaseConfig.ts