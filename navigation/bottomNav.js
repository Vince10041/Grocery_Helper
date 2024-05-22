// --- Importing libraries ---
import React from "react";
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// --- Importing icons ---
import { Fontisto } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { FontAwesome } from "@expo/vector-icons";

// --- Importing screens ---
import AddProduct from "../screens/AddProduct";
import CheckBestPrice from "../screens/CheckBestPrice";
import ShowStats from "../screens/ShowStats";

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator 
            screenOptions={{ 
                showIcon: true, 
                showLabel: false 
            }}
        >
            <Tab.Screen 
                name="AddProduct" 
                options={{ 
                    tabBarLabel: "Add",
                    tabBarIcon: ({ color, size }) => <Fontisto name="shopping-basket-add" size={size} color={color}/>,
                    tabBarActiveTintColor: "black",
                    headerShown: false,
                }} 
                component={AddProduct} 
            />
            <Tab.Screen 
                name="CheckBestPrice" 
                options={{ 
                    tabBarLabel: "Check Price",
                    tabBarIcon: ({ color, size }) => <Foundation name="magnifying-glass" size={size} color={color} />,
                    tabBarActiveTintColor: "black",
                    headerShown: false,
                }} 
                component={CheckBestPrice} 
            />
            <Tab.Screen 
                name="ShowStats" 
                options={{ 
                    tabBarLabel: "Statistics",
                    tabBarIcon: ({ color, size }) => <FontAwesome name="bar-chart" size={size} color={color} />,
                    tabBarActiveTintColor: "black",
                    headerShown: false,
                }} 
                component={ShowStats} 
            />
        </Tab.Navigator>
    );
}

// Returning nav bar
export default MyTabs;