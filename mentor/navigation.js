import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Home from './screens/Homepage';
import Settings from './screens/Settings';
import Notification from './screens/notification';
import Assistant from './screens/Assistant';
import MentorProfile from './screens/MentorProfile';
import { ThemeContext } from './components/ThemeContext'

const Tabs = createBottomTabNavigator();

function TabGroup() {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, focused, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          } else if (route.name === 'notifications') {
            iconName = focused ? "notifications" : "notifications-outline";
          } else if (route.name === 'Assistant') {
            iconName = focused ? "sparkles" : "sparkles-outline";
          } else if (route.name === 'Profile') {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: isDarkTheme ? "#30e3ca" : "#30e3ca",
        tabBarInactiveTintColor: isDarkTheme ? "grey" : "grey",
        tabBarStyle: {
          backgroundColor: isDarkTheme ? '#333' : '#fff',
        },
        tabBarLabelStyle: {
          color: isDarkTheme ? '#fff' : '#000',
        },
        headerShown: false,
      })}
    >
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="Profile" component={MentorProfile} />
      <Tabs.Screen name="Assistant" component={Assistant} />
      <Tabs.Screen name="notifications" component={Notification} />
      <Tabs.Screen name="Settings" component={Settings} />
    </Tabs.Navigator>
  );
}

export default function Navigation() {
  return (
      <TabGroup />
  );
}
