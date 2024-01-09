import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const TaskForm = ({ setList, toggleModal }) => {
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

        lists[listIndex].tasks.push({
            id: id,
            task: inputValue,
            done: false
        });

        localStorage.setItem('lists', JSON.stringify(lists));
        setList(lists[listIndex]);

        localStorage.setItem('id', id + 1);

        setInputValue('');
        toggleModal();
    };

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

            <button className="item-form-button">add</button>
        </form>
    );
};

export default TaskForm;
