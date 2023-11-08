import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

type ActionsType = RemoveTaskACType | AddTaskACType | ChangeTaskStatusACType | ChangeTaskTitleACType | AddTodolistActionType | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id != action.taskID)
            }
        }
        case 'ADD_TASK': {
            let task = {id: v1(), title: action.title, isDone: false};
            return {...state, [action.todolistId]: [task, ...state[action.todolistId]]}
        }
        case 'CHANGE_TASK_STATUS': {
            return {...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    isDone: action.isDone
                } : t)
            }
        }
        case 'CHANGE_TASK_TITLE': {
            return {...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.newTitle
                } : t)
            }
        }
        case "ADD-TODOLIST": {
            return {...state, [action.todolistID]: []}
        }
        case "REMOVE-TODOLIST": {

            const {[action.id]:[], ...rest} = state
            return rest
            // const newState = {...state}
            // delete newState[action.id]
            // return newState
        }
        default:
            return state
    }
}

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (taskID: string, todolistId: string) => {
    return {
        type: 'REMOVE_TASK', taskID, todolistId
    } as const
}

type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: 'ADD_TASK', title, todolistId
    } as const
}

type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE_TASK_STATUS',
        taskId, isDone, todolistId
    } as const
}

type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string) => {
    return {
        type: 'CHANGE_TASK_TITLE',
        taskId, newTitle, todolistId
    } as const
}

