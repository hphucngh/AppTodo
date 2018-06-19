import React, { Component } from 'react';
import {Platform, FlatList, StyleSheet, Text, View, TouchableOpacity, Alert, AppRegistry} from 'react-native';
import {updateTodoList, deleteTodoList, queryAllTodoLists} from '../databases/allSchemas'
import realm from '../databases/allSchemas';
import Swipeout from 'react-native-swipeout';
import HeaderComponent from './HeaderComponent';
import PopupDialogComponent from './PopupDialogComponent';

let FlatListItem = props =>{
    const {itemIndex, id, name, creationDate, pupDialogComponent, onPressItem} = props;
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
            <TouchableOpacity onPress= { onPressItem}>
                <View style= {{backgroundColor: itemIndex % 2 == 0 ? 'powderblue' : 'skyblue'}}>
                    <Text sytle={{fontWeight: 'bold', fontSize: 18, margin: 10}}>{name}</Text>
                    <Text style={{ fontSize: 10, margin: 10}} numberOfLines = {2}>{creationDate.toLocaleString()}</Text>
                </View>
            </TouchableOpacity>
        </Swipeout>
    );
}

export default class TodoListComponents extends Component{
    constructor(props){
        super(props);
        this.state = {
            todoLists: []
        };
        this.reloadData();
        realm.addListener('change', ()=>{
            this.reloadData();
        });
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
                <HeaderComponent
                    title = {"Todo List"}
                    hasAddButton={true}
                    showAddTodoList={
                        () => {
                            this.refs.popupDialogComponent.showDialogComponentForAdd();
                        }
                    }
                />
            <FlatList
                style = {styles.flatList}
                data = {this.state.todoLists}
                renderItem = {({item, index}) => <FlatListItem {...item} itemIndex = {index} 
                    popupDialogComponent = {this.refs.popupDialogComponent}
                onPressItem = {() => {
                    alert('You pressed item');
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
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    flatList:{
        flex: 1,
        flexDirection: 'column',
    }
});