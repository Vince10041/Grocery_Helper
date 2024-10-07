// --- Importing libraries ---
import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, Text, View, TextInput, SafeAreaView, ScrollView, Pressable, Dimensions } from 'react-native';
import { LineGraph } from "../components/LineGraph";
import { Line } from "react-native-svg";
import * as SQLite from 'expo-sqlite';
import { tw } from "../tailwind";

const db = SQLite.openDatabase('product.db');

function ShowStats () {

    // setting the search target
    const [target, setTarget] = useState("");
    // for the returned resutl
    const [graphData, setGraphData] = useState([]);

    // generate graph based on input
    const genGraph = (query) => {
        db.transaction(tx => {
            tx.executeSql(
            'SELECT * FROM Products WHERE name LIKE ?',
            [`%${query}%`],
            (txobj, resultSet) => {
                const results = resultSet.rows._array;

                // Extract prices from the results and set graph data
                const prices = results.map(product => product.price);
                setGraphData(prices);c
                console.log(graphData);
            },
            (txobj, error) => console.log(error)
            );
        });
    };


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
                    data={graphData}
                    style={[tw`mb-4`]}
                    color="blue"
                    label={target}
                    stat=""
                    percentage=""
                />
            </View>
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
    }
});

export default ShowStats;
