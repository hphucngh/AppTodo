import Realm from 'realm';
export const TODOLISTSCHEMA = 'TodoList';
export const TODOSCHEMA = 'Todo';

export const TodoSchema = {
    name: TODOSCHEMA,
    primaryKey: 'id',
    properties:{
        id: 'int',
        name: { type:'string', indexed: true },
        done: { type: 'bool', default: false }, //????
    }
};

export const TodoListSchema = {
    name: TODOLISTSCHEMA,
    primaryKey: 'id',
    properties:{
        id: 'int',
        name: 'string',
        creationData: 'date',
        todos: { type: 'list', objectType: TODOSCHEMA},
    }
};

const databaseOptions = {
    path: 'todoListApp.realm',
    schema: [TodoListSchema, TodoSchema],
    schemaVersion: 0,
};
export const insertNewTodoList = newTodoList => new Promise((resolve, reject) =>{
    Realm.open(databaseOptions).then(realm =>{
        realm.write(() =>{
            realm.create(TODOLISTSCHEMA, newTodoList);
            resolve(newTodoList);
        });
    }).catch((error) => reject(error));
});

//Update du lieu
export const updateTodoList = newTodoList => new Promise((resolve, reject) =>{
    Realm.open(databaseOptions).then(realm =>{
        realm.write(() => {
            let updatingTodoList = realm.objectForPrimaryKey(TODOLISTSCHEMA, todoList.id);
            updatingTodoList.name = todoList.name;
            resolve();
        });
    }).catch((error) => reject(error));
});
//Delete todo
export const deleteTodoList = todoListId => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm =>{
        realm.write(() => {
            let deletingTodoList = realm.objectForPrimaryKey(TODOLISTSCHEMA, todoListId);
            realm.delete(deletingTodoList);
            resolve();
        });
    }).catch((error) => reject(error));
});
//Delete all
export const allDeleteTodoList = todoListId => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm =>{
        realm.write(() => {
            let allDeletingTodoList = realm.objectForPrimaryKey(TODOLISTSCHEMA);
            realm.delete(allDeletingTodoList);
            resolve();
        });
    }).catch((error) => reject(error));
});
//??????
export const queryAllTodoList = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        let allTodoList = realm.objects(TODOLISTSCHEMA);
        resolve(allTodoList);
    }).catch((error) => {
        reject(error);
    });
});
export default new Realm(databaseOptions);