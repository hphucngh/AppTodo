import React, { Component } from 'react';
import {Platform, FlatList, StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import {updateTodoList, deleteTodoList, queryAllTodoLists} from '../databases/allSchemas'
import realm from '../databases/allSchemas';

let FlatListItem = props =>{
    const {itemIndex, id, name, creationDate, popupDialogComponent, onPressItem} = props;
    showEdit = () =>{

    }
    showDelete = ()=> {
        Alert.alert(
            'Delete',
            'Delete a todoList',
            [
                {
                    text: 'No', onPress: () => { },
                    style: 'Cancel'
                },
                {
                    text: 'Yes', onPress: () =>{

                    }
                }
            ],
            {cancelable: true}
        );
        
    };
    return (
        <Swipeout right = {[
            {
                text : 'Edit',
                backgroundColor : 'rgb(01,134,237)',
                onPress: showEdit
            },
            {
                text: 'Delete',
                backgroundColor: 'rgb(217,80,64)',
                onPress: showDelete
            }
        ]} autoClose = {true}>
    );
}

export default class TodoListComponents extends Comment{
    constructor(props){
        super(props);
        this.state = {
            todoLists: []
        };
    }
    reloadData = () =>{
        queryAllTodoLists().then((todoLists) => {
            this.setState({todoLists: todoLists});
        }).catch((error) => {
            this.setState({ todoLists: []});
        });
    }
    render(){
        return (
            <View style = {styles.container}>
                <HeadersComponent

                />
            <FlatList
                style = {styles.flatList}
                data = {this.state.todoLists}
                renderItem = {({item, index}) => <FlatListItem {...item} itemIndex = {index} 
                popupDialogComponent = {this.refs.popupDialogComponent}
                onPressItem = {() => {

                }}/>}
                keyExtractor = {item => item.id}
            />
            <PopupDialogComponent ref = {"popupDialogComponent"} />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'colum',
        justifyContent: 'flex-start',
    },
    flatList:{
        flex: 1,
        flexDirection: 'colum',
    }
});