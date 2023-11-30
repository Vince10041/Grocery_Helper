import React from "react";
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Importing screens
import AddProduct from "../screens/AddProduct";
import CheckBestPrice from "../screens/checkBestPrice";
import ShowStats from "../screens/showStats";

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="AddProduct" component={AddProduct} />
            <Tab.Screen name="CheckBestPrice" component={CheckBestPrice} />
            <Tab.Screen name="ShowStats" component={ShowStats} />
        </Tab.Navigator>
    );
}

// Returning nav bar
export default MyTabs;