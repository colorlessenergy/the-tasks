import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const TaskForm = ({
    setList,
    toggleModal,
    isEditingTask,
    setIsEditingTask
}) => {
    const pathname = usePathname();
    const listIndex = pathname.split('/')[2];

    const [inputValue, setInputValue] = useState('');
    const handleChange = event => {
        setInputValue(event.currentTarget.value);
    };

    const handleSubmit = event => {
        event.preventDefault();

        let lists = JSON.parse(localStorage.getItem('lists'));
        let id = JSON.parse(localStorage.getItem('id'));

        if (isEditingTask) {
            lists[listIndex].tasks[isEditingTask.index] = {
                id: isEditingTask.id,
                task: inputValue,
                done: isEditingTask.done
            };
            setIsEditingTask(false);
        } else {
            lists[listIndex].tasks.push({
                id: id,
                task: inputValue,
                done: false
            });
        }

        localStorage.setItem('lists', JSON.stringify(lists));
        setList(lists[listIndex]);

        localStorage.setItem('id', id + 1);

        setInputValue('');
        toggleModal();
    };

    const handleDeleteTask = () => {
        let lists = JSON.parse(localStorage.getItem('lists'));
        lists[listIndex].tasks.splice(isEditingTask.index, 1);
        localStorage.setItem('lists', JSON.stringify(lists));
        setList(lists[listIndex]);

        setInputValue('');
        toggleModal();
    };

    useEffect(() => {
        if (isEditingTask.task) {
            setInputValue(isEditingTask.task);
        }
    }, [isEditingTask]);

    const inputRef = useRef();
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <form onSubmit={handleSubmit} className="item-form">
            <label htmlFor="add-task" className="mb-05">
                task
            </label>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                id="add-task"
                ref={inputRef}
                className="item-form-input"
            />

            {isEditingTask ? (
                <div className="item-form-buttons">
                    <button
                        className="item-form-button bg-color-red"
                        onClick={handleDeleteTask}
                        type="button">
                        delete
                    </button>

                    <button className="item-form-button">edit</button>
                </div>
            ) : (
                <button className="item-form-button">add</button>
            )}
        </form>
    );
};

export default TaskForm;
