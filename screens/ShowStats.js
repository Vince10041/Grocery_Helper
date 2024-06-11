// --- Importing libraries ---
import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { LineChart, Grid } from 'react-native-svg-charts';
import Collapsible from 'react-native-collapsible';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('product.db');

function ShowStats() {
    const [product, setProduct] = useState('');
    const [data, setData] = useState([]);
    const [collapsed, setCollapsed] = useState(true);

    const handleConfirm = () => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT inputDate, price FROM Products WHERE name = ? ORDER BY inputDate ASC',
                [product],
                (txObj, resultSet) => {
                    const formattedData = resultSet.rows._array.map(row => ({
                        time: row.inputDate,
                        price: row.price
                    }));
                    setData(formattedData);
                },
                (txObj, error) => console.error('Error fetching data: ', error)
            );
        });
    };

    const toggleExpanded = () => {
        setCollapsed(!collapsed);
    };

    const prices = data.map(item => item.price);
    const times = data.map(item => item.time);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search Product"
                    value={product}
                    onChangeText={setProduct}
                />
                <Button
                    title="Confirm"
                    onPress={handleConfirm}
                />
            </View>

            {data.length > 0 && (
                <View style={styles.chartContainer}>
                    <LineChart
                        style={{ height: 200 }}
                        data={prices}
                        svg={{ stroke: 'rgb(134, 65, 244)' }}
                        contentInset={{ top: 20, bottom: 20 }}
                    >
                        <Grid />
                    </LineChart>
                </View>
            )}

            {data.length > 0 && (
                <View style={styles.collapsibleContainer}>
                    <TouchableOpacity onPress={toggleExpanded}>
                        <Text style={styles.collapsibleTitle}>Show Data Points</Text>
                    </TouchableOpacity>
                    <Collapsible collapsed={collapsed}>
                        <ScrollView style={styles.dataList}>
                            {data.map((item, index) => (
                                <Text key={index} style={styles.dataItem}>
                                    Time: {item.time}, Price: {item.price}
                                </Text>
                            ))}
                        </ScrollView>
                    </Collapsible>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 15,
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginRight: 10,
        paddingLeft: 8,
    },
    chartContainer: {
        marginTop: 20,
    },
    collapsibleContainer: {
        marginTop: 20,
    },
    collapsibleTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    dataList: {
        maxHeight: 200,
    },
    dataItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
});

export default ShowStats;