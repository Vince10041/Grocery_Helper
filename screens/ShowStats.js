// --- Importing libraries ---
import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, Text, View, TextInput, SafeAreaView, ScrollView, Pressable, Dimensions } from 'react-native';
import { LineGraph } from "../components/LineGraph";
import { Line } from "react-native-svg";
import * as SQLite from 'expo-sqlite';
import { tw } from "../tailwind";
import Checkbox from 'expo-checkbox';

const db = SQLite.openDatabase('product.db');

function ShowStats () {
    const [target, setTarget] = useState("");
    const [graphData, setGraphData] = useState([]);
    const [products, setProducts] = useState([]);

    const genGraph = useCallback((query) => {
        db.transaction(tx => {
            tx.executeSql(
            'SELECT * FROM Products WHERE name LIKE ? ORDER BY date(inputDate)',
            [`%${query}%`],
            (txobj, resultSet) => {
                const results = resultSet.rows._array;
                const updatedProducts = results.map(product => ({
                    ...product,
                    isChecked: true
                }));
                setProducts(updatedProducts);
                updateGraphData(updatedProducts);
            },
            (txobj, error) => console.log(error)
            );
        });
    }, []);

    const updateGraphData = (updatedProducts) => {
        const dataPoints = updatedProducts
            .filter(product => product.isChecked)
            .map(product => ({
                price: product.price,
                date: new Date(product.inputDate)
            }))
            .sort((a, b) => a.date - b.date);

        setGraphData(dataPoints.map(point => point.price));
    };

    const toggleCheckbox = (index) => {
        const updatedProducts = [...products];
        updatedProducts[index].isChecked = !updatedProducts[index].isChecked;
        setProducts(updatedProducts);
        updateGraphData(updatedProducts);
    };

    useEffect(() => {
        console.log("Graph data updated:", graphData);
    }, [graphData]);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.searchText}>Input a Product</Text>

            <View style={styles.searchSection}>
                <TextInput
                    style={styles.searchBox}
                    value={target}
                    onChangeText={setTarget}
                />

                <Pressable
                    style={styles.saveButton}
                    onPress={() => genGraph(target)}
                >
                    <Text style={styles.saveText}> Check </Text>
                </Pressable>
            </View>

            <View style={styles.graphContainer}>
                <LineGraph
                    key={graphData.join(',')}
                    data={graphData}
                    style={[tw`mb-4`]}
                    color="blue"
                    label={target}
                    stat=""
                    percentage=""
                />
            </View>

            <ScrollView style={styles.productList}>
                {products.map((product, index) => (
                    <View key={index} style={styles.productItem}>
                        <Checkbox
                            value={product.isChecked}
                            onValueChange={() => toggleCheckbox(index)}
                        />
                        <Text style={styles.productText}>
                            {product.name} - {product.brand} ({product.inputDate})
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    searchText: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15,
        marginBottom: 10,
        fontWeight: "bold",
        fontSize: 25,
    },
    searchSection: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 25, // Ensure margin between sections
    },
    searchBox: {
        flexBasis: '65%',
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
    saveButton: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'black',
        padding: 5,
        borderWidth: 1,
        borderRadius: 10,
    },
    saveText: {
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.5,
        color: 'white',
    },
    graphContainer: {
        marginLeft: 20,
        marginRight: 20,
    },
    productList: {
        marginTop: 20,
        marginHorizontal: 20,
    },
    productItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    productText: {
        marginLeft: 10,
        fontSize: 16,
    }
});

export default ShowStats;
