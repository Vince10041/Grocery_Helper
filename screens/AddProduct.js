// --- Importing libraries ---
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, SafeAreaView, Pressable, Platform } from 'react-native';
import { Dropdown } from "react-native-element-dropdown";
import * as SQLite from 'expo-sqlite';
import initialDataRaw from '../utils/initial_data.json';

function AddProduct () {

    // useState hook for timestamp input
    const dateObj = new Date();
    // This is the default input for the timestamp when adding new product info
    const [inputTime, setTime] = useState(dateObj.getDate() + '/' + dateObj.getMonth() + '/' + dateObj.getFullYear());
    // console.log(inputTime);
    
    // change the type fo initialData to array
    const initialData = initialDataRaw.initialData && Array.isArray(initialDataRaw.initialData) 
    ? initialDataRaw.initialData 
    : [];


    // useState for different columns
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState(0);
    const [volume, setVolume] = useState(0);
    const [unit, setUnit] = useState('');


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

    // try to connect to SQLite DB first
    // connection to db
    const db = SQLite.openDatabase('product.db');
    
    // useEffect here helps to connect to db once this page is loaded
    useEffect(() => {

        // create database first if it does not exist
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS Products (' +
                'id INTEGER PRIMARY KEY AUTOINCREMENT, ' +
                'name TEXT NOT NULL, ' +
                'brand TEXT NOT NULL, ' +
                'price REAL NOT NULL, ' +
                'volume INTEGER NOT NULL, ' +
                'unit TEXT NOT NULL, ' +
                'inputDate DATETIME NOT NULL' +
                ')'
            );
        });
        
    }, []);

    // add to db function
    function addProduct () {

        console.log(name);
        console.log(brand);
        console.log(price);
        console.log(volume);
        console.log(unit);
        console.log(inputTime);

        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO Products ' +
                '(name, brand, price, volume, unit, inputDate) ' +
                'VALUES ' +
                '(?, ?, ?, ?, ?, ?)',
                [name, brand, price, volume, unit, inputTime],
                (txobj, result) => console.log(result.insertId),
                (txobj, error) => console.log(error)
            );
        });
        
        // clear the input 
        setName('');
        setBrand('');
        setPrice(0);
        setVolume(0);
        setUnit('');
        setTime(dateObj.getDate() + '/' + dateObj.getMonth() + '/' + dateObj.getFullYear());
        
    };

    // Testing button to delete all product data
    const deleteAll = () => {
        db.transaction(tx => {
            tx.executeSql(
            'DELETE FROM Products',
            [],
            (_, result) => console.log(`Deleted ${result.rowsAffected} rows`),
            (_, error) => console.log('Error deleting records:', error)
            );
        });
    };  


    // Testing button for adding initial data
    const createData = () => {
        if (initialData.length === 0) {
            console.log('No initial data found or data is not in the correct format');
            return;
        }
    
        db.transaction(tx => {
            initialData.forEach(item => {
                tx.executeSql(
                    'INSERT INTO Products (name, brand, price, volume, unit, inputDate) VALUES (?, ?, ?, ?, ?, ?)',
                    [item.name, item.brand, item.price, item.volume, item.unit, item.inputDate],
                    (_, result) => console.log(`Inserted item with ID: ${result.insertId}`),
                    (_, error) => console.log('Error inserting item:', error)
                );
            });
        }, 
        error => console.log('Transaction error:', error),
        () => console.log('Transaction success: All initial data inserted')
        );
    };

    return (
        <SafeAreaView>
            <Text style={styles.searchText}>Add a Product</Text>

            <View style={styles.container}>
                <Text style={styles.textLabel}>Product Name</Text>
                <TextInput 
                    style={styles.inputBox}
                    value={name}
                    onChangeText={setName}
                />
            </View>


            <View style={styles.container}>
                <Text style={styles.textLabel}>Brand</Text>
                <TextInput 
                    style={styles.inputBox}
                    value={brand}
                    onChangeText={setBrand}
                />
            </View>


            <View style={styles.container}>
                <Text style={styles.textLabel}>Price</Text>
                <TextInput 
                    style={styles.inputBox}
                    value={price.toString()}
                    onChangeText={setPrice}
                />
            </View>


            <View style={styles.container}>
                <Text style={styles.textLabel}>Volume</Text>
                <TextInput 
                    style={styles.inputBox}
                    value={volume.toString()}
                    onChangeText={setVolume}
                />
            </View>

            <View style={styles.container}>
                <Text style={styles.textLabel}>Unit</Text>
                <Dropdown 
                    style={styles.dropdownList}
                    data={units}
                    value={unit}
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

            
            <View style={styles.container}>
                <Pressable 
                    style={styles.saveButton}
                    onPress={addProduct}
                >
                    <Text style={styles.saveText}> Save </Text>
                </Pressable>
            </View>

            <Pressable
                style={styles.otherBtn}
                onPress={deleteAll}
            >
                <Text style={styles.saveText}>Delete All</Text>
            </Pressable>

            <Pressable
                style={styles.otherBtn}
                onPress={createData}
            >
                <Text style={styles.saveText}>Add initial data</Text>
            </Pressable>
            
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
    searchText: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15,
        marginBottom: 10,
        fontWeight: "bold",
        fontSize: 25,
    },
    dropdownList: {
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 10,
        paddingTop: 2,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 3,
        marginLeft: 15,
        marginRight: 15,
    },
    saveButton: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'black',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
    },
    saveText: {
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.5,
        color: 'white',
    },
    container: {
        marginTop: 20,   
    },
    textLabel: {
        marginLeft: 15,
        marginBottom: 5,
        fontSize: 16,
    },
    otherBtn: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'black',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
    },
});

export default AddProduct;
