import { Client, TablesDB, ID } from 'react-native-appwrite'


const client = new Client();
const endpoint = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID;
const packageName = process.env.EXPO_PUBLIC_APPWRITE_PACKAGE_NAME;

if (!endpoint || !projectId) {
  throw new Error(
    'Missing Appwrite configuration. Set EXPO_PUBLIC_APPWRITE_ENDPOINT and EXPO_PUBLIC_APPWRITE_PROJECT_ID in Todolist/.env, then restart Expo.'
  );
}

client.setEndpoint(endpoint).setProject(projectId);
if (packageName) {
  client.setPlatform(packageName);
}

// init TablesDB
export const tablesDB = new TablesDB(client)
export const DATABASE_ID =
process.env.EXPO_PUBLIC_APPWRITE_DB_ID
export const config = {
db: process.env.EXPO_PUBLIC_APPWRITE_DB_ID,
table: {
 todos: process.env.EXPO_PUBLIC_APPWRITE_TABLE_TODOS_ID
    }
}


export {ID}
