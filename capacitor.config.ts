import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'workout-buddy',
  webDir: 'dist/workout-buddy',
  server: {
    androidScheme: 'https'
  }
};

export default config;
