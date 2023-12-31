import TaskForm from './TaskForm';
import ListForm from './ListForm';

const Form = ({
    setList,
    setLists,
    toggleModal,
    isEditingList,
    setIsEditingList,
    isEditingTask,
    setIsEditingTask,
    type
}) => {
    if (type === 'task') {
        return (
            <TaskForm
                setList={setList}
                toggleModal={toggleModal}
                isEditingTask={isEditingTask}
                setIsEditingTask={setIsEditingTask}
            />
        );
    }

    return (
        <ListForm
            setLists={setLists}
            toggleModal={toggleModal}
            isEditingList={isEditingList}
            setIsEditingList={setIsEditingList}
        />
    );
};

export default Form;
