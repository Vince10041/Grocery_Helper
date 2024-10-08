// --- Importing libraries ---
import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, Text, View, TextInput, SafeAreaView, ScrollView } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Divider } from "@rneui/themed";

const db = SQLite.openDatabase('product.db');

const CheckBestPrice = () => {
  const [products, setProducts] = useState([]);
  const [target, setTarget] = useState("");

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Products ORDER BY date(inputDate) DESC', null, 
        (txobj, resultSet) => setProducts(resultSet.rows._array),
        (txobj, error) => console.log(error)
      );
    });
  };

  const debounce = (func, timeout = 300) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  };

  const searchProduct = (query) => {
    if (query.trim() === "") {
      fetchAllProducts();
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Products WHERE name LIKE ? ORDER BY date(inputDate) DESC',
        [`%${query}%`],
        (txobj, resultSet) => setProducts(resultSet.rows._array),
        (txobj, error) => console.log(error)
      );
    });
  };

  const debouncedSearch = useCallback(debounce(searchProduct, 300), []);

  const handleInputChange = (text) => {
    setTarget(text);
    debouncedSearch(text);
  };

  const showProducts = () => {
    return products.map((product, index) => (
      <View key={index} style={styles.container}>
        <Text>{'Name: ' + product.name}</Text>
        <Text>{'Brand: ' + product.brand}</Text>
        <Text>{'Price: ' + product.price}</Text>
        <Text>{'Amount: ' + product.volume + ' ' + product.unit}</Text>
        <Text>{'Date bought: ' + product.inputDate}</Text>
      </View>
    ));
  };

  return (
    <SafeAreaView>
      <View>
        <Text style={styles.searchText}>Search a Product</Text>
        <TextInput
          style={styles.searchBox}
          value={target}
          onChangeText={handleInputChange}
        />
      </View>

      <Divider width={2} />

      <ScrollView>
        {showProducts()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 10,
  },
  searchBox: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 20,
  },
  searchText: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 25,
  },
});

export default CheckBestPrice;