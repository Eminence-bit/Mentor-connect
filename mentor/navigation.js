import {NavigationContainer} from '@react-navigation/native';
import Home from './screens/Homepage';
import Settings from './screens/Settings';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Notification from './screens/notification';
import Assistant from './screens/Assistant';
import MentorProfile from './screens/MentorProfile';

const tabs=createBottomTabNavigator();

function TabGroup(){
    return(
        <tabs.Navigator
            screenOptions={({ route, navigation }) => ({
            tabBarIcon: ({ color, focused, size }) => {
            let iconName;
            if (route.name==="Home"){
            iconName = focused ? "home" : "home-outline";
            }
            else if(route.name === "Settings"){
                iconName= focused ? "settings" : "settings-outline";
            }
            else if(route.name === 'notifications'){
                iconName =focused ? "notifications" : "notifications-outline";
            }
            else if(route.name === 'Assistant'){
                iconName =focused ? "sparkles" : "sparkles-outline";
            }
            else if(route.name === 'Profile'){
                iconName =focused ? "person" : "person-outline";
            }
            return <Ionicons name={iconName} size={size} color={color}/>
                },
                tabBarActiveTintColor:"#30e3ca",
                tabBarInactiveTintColor:"grey",
                })}>
            <tabs.Screen name="Home" component={Home}/>
            <tabs.Screen name="Profile" component={MentorProfile}/>
            <tabs.Screen name="Assistant" component={Assistant}/>
            <tabs.Screen name="notifications" component={Notification}/>
            <tabs.Screen name="Settings" component={Settings}/>
        </tabs.Navigator>
    )
}
export default function Navigation(){
    return(
        <NavigationContainer>
             <TabGroup/>
        </NavigationContainer>
    )
}