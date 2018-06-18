import React, { Component } from 'react';
import {Platform, FlatList, StyleSheet, Text, View, TouchableOpacity, Image, TextInput, AppRegistry} from 'react-native';
import PopupDialog, { SlideAnimation, DialogTitle } from 'react-native-popup-dialog';
import { insertNewTodoList, updateTodoList } from '../databases/allSchemas';

export default class PopupDialogComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            id : 0,
            name: '',
            isAddNew: true,
        };
    }
    //show
    showDialogComponentForAdd = () =>{
        this.refs.popupDialog.show();
        this.setState({
            dialogTitle: 'Add a new Todolist',
            name:'',
            isAddNew: true,
        });
    }
    render(){
        const { dialogTitle} = this.state;
        return(
            <PopupDialog
                dialogTitle = {<DialogTitle title = {dialogTitle} />}
                width = {0.7} height = {180}
                ref = {"popupDialog"}
            >
                <View style = {styles.container}>
                    <TextInput style = {styles.textInput} placeholder= " Enter Toto List name" autoCorrect= {false}
                        onChangeText= {(text)=> this.setState({name: text})} value= {this.state.name}
                    />
                    <View style = {{flexDirection: 'row'}}>
                        <TouchableOpacity style = {styles.button} onPress={()=>{
                            if (this.state.name.trim() == ""){
                                alert("Please enter todolist name");
                                return;
                            }
                            this.refs.popupDialog.dismiss(()=>{
                                if(this.state.isAddNew == true){
                                    const newTodoList = {
                                        id: Math.floor(Date.now() / 1000),
                                        name: this.state.name,
                                        creationDate: new Date(),
                                        
                                    };
                                    insertNewTodoList(newTodoList).then().catch((error)=>{
                                        alert('Inster new todolist error' + {error}.toString());
                                    });
                                } else {

                                }
                            });
                        }}>
                            <Text style = {styles.textLabel}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={()=>{
                            this.refs.popupDialog.dismiss(()=>{
                                console.log('Called cancel, dismiss popup')
                            });
                        }}>
                            <Text style={styles.textLabel}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </PopupDialog>
        );
    }
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
        height: 40,
        padding: 10,
        margin: 10,
        borderColor: 'gray',
        borderWidth: 1
    },
    button: {
        backgroundColor: 'steelblue',
        padding: 10,
        margin: 10,
    },
    textLable:{
        color: 'white',
        fontSize: 18,
    },
});
