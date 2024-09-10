// --- Importing libraries ---
import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, Text, View, TextInput, SafeAreaView, ScrollView, Pressable, Dimensions } from 'react-native';
import { LineGraph } from "../components/LineGraph";
import { Line } from "react-native-svg";
import { tw } from "../tailwind";

function ShowStats () {

    // setting the search target
    const [target, setTarget] = useState("");

    // generate graph based on input
    function genGraph () {

        console.log(target);

    }


    return (
        <SafeAreaView>

            <Text style={styles.searchText}>Input a Product</Text>

            <View style={styles.searchSection}>
                <TextInput
                style={styles.searchBox}
                value={target}
                onChangeText={setTarget}
                />

                <Pressable 
                    style={styles.saveButton}
                    onPress={genGraph}
                >
                    <Text style={styles.saveText}> Check </Text>
                </Pressable>
            </View>


            <LineGraph 
                data={[12, 30, 5, 20, 51, 1, 4, 7, 2]}
                style={[tw`mb-4`]}
                color="rose"
                label="views"
                stat="120k"
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    searchText : {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 15,
        marginBottom: 10,
        fontWeight: "bold",
        fontSize: 25,
    },
    searchSection : {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    searchBox : {
        flexBasis: '65%',
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
    saveButton : {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'black',
        padding: 5,
        borderWidth: 1,
        borderRadius: 10,
    },
    saveText : {
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 0.5,
        color: 'white',
    },
});

export default ShowStats;
