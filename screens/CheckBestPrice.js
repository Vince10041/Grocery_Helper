// --- Importing libraries ---
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import { Dropdown } from "react-native-element-dropdown";
import * as SQLite from 'expo-sqlite';

function CheckBestPrice () {


    const [products, setProducts] = useState([]);

    // try to get all the products in db
    const db = SQLite.openDatabase('product.db');

    useEffect(() => {
        
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM Products', null, 
                (txobj, resultSet) => setProducts(resultSet.rows._array),
                (txobj, error) => console.log(error)
            );
        });

    }, []);


    // for displaying products
    const showProducts = () => {
        return products.map((product, index) => {
            return (
                <View key={index}>
                    <Text>{product.name}</Text>
                    <Text>{product.brand}</Text>
                    <Text>{product.price}</Text>
                    <Text>{product.volume}</Text>
                    <Text>{product.unit}</Text>
                    <Text>{product.inputDate}</Text>
                </View>
            );
        });
    };

    return (
        <SafeAreaView style={styles}>
            <Text>This is the checkBestPrice page</Text>

            {showProducts()}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

});

export default CheckBestPrice;
