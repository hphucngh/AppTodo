import React, { Component } from 'react';
import {Platform, FlatList, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, AppRegistry} from 'react-native';
const HeaderComponent = props =>{
    const { title, showAddTodoList, hasAddButton, hasSortButton, sort, sortState, hasDeleteAllButton} = props;
    return (
        <View style = {styles.container}>
            {hasAddButton && <TouchableOpacity style= {styles.addButton} onPress = {showAddTodoList}>
                <Image style= {styles.addButtonImage} source = { require('../images/add.png')}/>
            </TouchableOpacity>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgb(224,93,144)',
        height: 80,
    },
    addButton:{
        zIndex: 2,
        marginRight: 10,
        marginTop: 30,
    },
    titleText:{
        color:'white',
        fontWeight: 'bold',
        fontSize: 18,
        position: 'absolute',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        padding: 50,
    },
    addButtonImage: {
        width: 42,
        height: 42,
        tintColor: 'white'
    },

});
export default HeaderComponent;