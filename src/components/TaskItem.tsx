import React, { useState, useRef, useEffect } from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import { Task } from '../components/TasksList';

import trashIcon from '../assets/icons/trash/trash.png'

interface TasksProps {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, newText: string) => void
  index: Number
}

export function TaskItem({ task, toggleTaskDone, removeTask, editTask, index }: TasksProps) {
  const [isBeingEdited, setIsBeingEdited] = useState(false)
  const [title, setTitle] = useState(task.title)
  const textInputRef = useRef<TextInput>(null)

  function handleStartEditing(): void {
    setIsBeingEdited(true)
  }

  function handleCancelEditing(): void {
    setTitle(task.title)
    setIsBeingEdited(false)
  }

  function handleSubmitEditing(): void {
    editTask(task.id, title)
    setIsBeingEdited(false)
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isBeingEdited ) {
        textInputRef.current.focus()
      }
      else {
         textInputRef.current.blur()
      }
    }
  }, [isBeingEdited])

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        //TODO - use onPress (toggle task) prop
        >
          <View
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>
          <TextInput
            onBlur={()=>{handleCancelEditing}}
            ref={textInputRef}
            style={task.done ? styles.taskTextDone : styles.taskText}
            value={title}
            editable={isBeingEdited}
            onChangeText={setTitle}
            onSubmitEditing={handleSubmitEditing}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        { //Check if message failed
          (isBeingEdited)
            ? <TouchableOpacity
              style={{ paddingHorizontal: 4, marginTop: 2.5 }}
              onPress={handleCancelEditing}
            >
              <Icon
                name={"x"}
                size={18}
                color="#C0C0C0"
              />

            </TouchableOpacity>
            : <TouchableOpacity
              style={{ paddingHorizontal: 4, marginTop: 2.5 }}
              onPress={handleStartEditing}
            >
              <Icon
                name={"edit-2"}
                size={18}
                color="#C0C0C0"
              />

            </TouchableOpacity>
        }
        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingHorizontal: 14 }}
          onPress={() => removeTask(task.id)}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
  )
}

export default TaskItem

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  container: {
    flexDirection: "row"
  }
})