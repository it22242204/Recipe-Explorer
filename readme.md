# Recipe Explorer – Mobile App  
**A clean, fast, and offline-first recipe browser built with React Native (Expo)**

---

## Features

| Feature | Status |
|-------|--------|
| Browse recipes from **TheMealDB API** | Done |
| View detailed recipe (ingredients, instructions, image) | Done |
| Mark/unmark **favorites** (saved locally) | Done |
| Works **offline** (favorites persist) | Done |
| Responsive on **Android, iOS, Web** | Done |
| Loading & error states | Done |
| TypeScript + Clean Code | Done |

---

## Screenshots

| **Recipe List** | **Recipe Detail** |
|------------------|-------------------|
| ![List](C:\Users\LENOVO\Desktop\Recipe Explorer\recipe-explorer\assets\Recipe List.jpg) | ![Detail](C:\Users\LENOVO\Desktop\Recipe Explorer\recipe-explorer\assets\recipe details.jpg) |

---

## Tech Stack

| Layer | Technology |
|------|------------|
| **Framework** | React Native (Expo) |
| **Language** | TypeScript |
| **Navigation** | React Navigation (Stack) |
| **State** | React Hooks (`useState`, `useEffect`) |
| **Storage** | `@react-native-async-storage/async-storage` |
| **HTTP** | `axios` |
| **Icons** | `@expo/vector-icons` |
| **API** | [TheMealDB](https://www.themealdb.com/api.php) |

---

## Project Structure

```
recipe-explorer/
├── App.tsx
├── app.json
├── navigation/
│   └── AppNavigator.tsx
├── screens/
│   ├── RecipeListScreen.tsx
│   └── RecipeDetailScreen.tsx
├── components/
│   ├── RecipeCard.tsx
│   └── FavoriteButton.tsx
├── services/
│   ├── api.ts
│   └── storage.ts
├── types/
│   └── index.ts
└── assets/
```

---

## Setup & Run

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Expo Go app (for mobile testing)

---

### Installation

```bash
# 1. Clone or download
git clone https://github.com/yourusername/recipe-explorer.git
cd recipe-explorer

# 2. Install dependencies
npm install

# 3. Start the app
npx expo start
```

---

### Run on Device

| Platform | Command |
|--------|--------|
| **Web (Chrome)** | Press `w` |
| **Android** | Press `a` (or scan QR with Expo Go) |
| **iOS** | Press `i` (or scan QR with Expo Go) |

---

## API Integration

- **Base URL**: `https://www.themealdb.com/api/json/v1/1`
- **Endpoints**:
  - `search.php?s=` → All recipes
  - `lookup.php?i={id}` → Recipe details

---

## Local Storage (Favorites)

- Uses `@react-native-async-storage/async-storage`
- Stores only **recipe IDs**
- Persists across app restarts
- Works **offline**

```ts
// Example: Toggle favorite
await toggleFavorite('52772');
```

---

## Key Files

| File | Purpose |
|------|--------|
| `screens/RecipeListScreen.tsx` | List view + loading |
| `screens/RecipeDetailScreen.tsx` | Full recipe + ingredients |
| `services/api.ts` | HTTP calls |
| `services/storage.ts` | AsyncStorage wrapper |
| `types/index.ts` | TypeScript interfaces |

---

## Error Handling

- Network errors → "Failed to load"
- Empty results → Graceful fallback
- Loading spinner during fetch

---

## Development

```bash
# Clear cache
npx expo start -c

# Prebuild (for native builds)
npx expo prebuild
```

---

## Build for Production

```bash
# Android APK
eas build -p android

# iOS App
eas build -p ios
```

> Requires [Expo Application Services (EAS)](https://expo.dev/eas)

---

## Testing

- Manual testing on **web, Android, iOS**
- Favorites persist after app restart
- Works without internet (after first load)

---

## Future Enhancements

- [ ] Search bar
- [ ] Category filters
- [ ] Pull-to-refresh
- [ ] Share recipe
- [ ] Dark mode
- [ ] Offline caching (full recipes)

---

**Recipe Explorer – Browse. Cook. Save.**  
*Simple. Fast. Delicious.*