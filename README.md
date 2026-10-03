# Appwrite Todo List

A React Native todo app built with Expo Router and Appwrite. Todos are stored in an Appwrite table, so you can add, edit, complete, delete, and refresh tasks from the app.

## Requirements

- Node.js (Expo SDK 57 requires Node.js 22.13 or newer)
- An Appwrite Cloud project, or a reachable Appwrite server
- Expo Go or an iOS/Android simulator

## Set up Appwrite

1. Create an Appwrite project and a database.
2. Create a table in that database for todos.
3. Add these columns to the table:
   - `title` — string, required
   - `completed` — boolean
4. In the Appwrite project, add the mobile app platform used by your build and grant the app's users the table permissions needed to list, create, update, and delete rows. For a classroom demo without authentication, configure appropriate table permissions in the Appwrite Console.
5. Configure these Expo public environment variables with values from your Appwrite project:
   - `EXPO_PUBLIC_APPWRITE_ENDPOINT`
   - `EXPO_PUBLIC_APPWRITE_PROJECT_ID`
   - `EXPO_PUBLIC_APPWRITE_DB_ID`
   - `EXPO_PUBLIC_APPWRITE_TABLE_TODOS_ID`

`EXPO_PUBLIC_APPWRITE_PACKAGE_NAME` is optional. If set, it must match the platform identifier registered in Appwrite. Expo embeds `EXPO_PUBLIC_` values in the client app, so do not put API keys or other secrets in public environment variables.

## Install and run

Run these commands from the project directory:

```bash
npm install
npx expo start
```

To launch a specific target:

```bash
npx expo start --android
npx expo start --ios
npx expo start --web
```

After changing environment variables, restart Expo and clear its cache:

```bash
npx expo start -c
```

## App behavior

- Loads todo rows from the configured Appwrite table when the screen opens.
- Adds a todo with `completed` initially set to `false`.
- Edits the todo title and saves it to Appwrite.
- Toggles a todo's completion status.
- Deletes a todo from Appwrite.
- Pulls down on the list to refresh it.

The Expo Router entry screen is `src/app/index.js`. Appwrite client configuration is in `src/services/appwriteConfig.js`, and todo database operations are in `src/services/todoService.js`.
