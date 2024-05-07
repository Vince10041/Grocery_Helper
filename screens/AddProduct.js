// --- Importing libraries ---
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, SafeAreaView, Button, Platform } from 'react-native';
import { Dropdown } from "react-native-element-dropdown";
import * as SQLite from 'expo-sqlite';

function AddProduct () {

    // useState hook for timestamp input
    const dateObj = new Date();
    // This is the default input for the timestamp when adding new product info
    const [inputTime, setTime] = useState(dateObj.getDate() + '/' + dateObj.getMonth() + '/' + dateObj.getFullYear());
    console.log(inputTime);


    // useState hook for unit input
    const [unitInput, setUnit] = useState('');


    // List of units
    const units = [
        { label: 'mL', value: 'mL'},
        { label: 'L', value: 'L'},
        { label: 'g', value: 'g'},
        { label: 'kg', value: 'kg'},
        { label: 'jin', value: 'jin'},
        { label: 'pound', value: 'pound'},
        { label: 'units', value: 'units'}
    ];

    // Try to connect to SQLite DB first
    try {
        // Connection to db
        const db = SQLite.openDatabase('product.db');

    } catch (e) {
        console.log(e);
    };

    return (
        <SafeAreaView>


            <View style={styles.container}>
                <Text style={styles.textLabel}>Add a New Product!</Text>
            </View>


            <View style={styles.container}>
                <Text style={styles.textLabel}>Brand</Text>
                <TextInput 
                    style={styles.inputBox}
                />
            </View>


            <View style={styles.container}>
                <Text style={styles.textLabel}>Price</Text>
                <TextInput 
                    style={styles.inputBox}
                />
            </View>


            <View style={styles.container}>
                <Text style={styles.textLabel}>Volume</Text>
                <TextInput 
                    style={styles.inputBox}
                    placeholder=""
                />
                <Text style={styles.textLabel}>Unit</Text>
                <Dropdown 
                    style={styles.dropdownList}
                    data={units}
                    value={unitInput}
                    labelField="label"
                    valueField="value"
                    placeholder="Select an Unit"
                    onChange={item => {
                        setUnit(item.value);
                    }}
                />
            </View>

            <View style={styles.container}>
                <Text style={styles.textLabel}>Timestamp</Text>
                <TextInput 
                    style={styles.inputBox}
                    defaultValue={inputTime}
                />
            </View>


            <Button 
                style={styles.saveButton}
                title="Save"
                
            >
            </Button>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    inputBox : {
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginLeft: 15,
        marginRight: 15,
    },
    dropdownList: {
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginLeft: 15,
        marginRight: 15,
    },
    saveButton: {
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    container: {
        marginTop: 20,   
    },
    textLabel: {
        marginLeft: 15,
    },
});

export default AddProduct;
