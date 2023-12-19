import { useState } from 'react';

const Form = ({ setLists, toggleModal }) => {
    const [inputValue, setInputValue] = useState('');
    const handleChange = event => {
        setInputValue(event.currentTarget.value);
    };

    const handleSubmit = event => {
        event.preventDefault();

        let lists = JSON.parse(localStorage.getItem('lists'));
        lists.push({
            name: inputValue,
            tasks: []
        });
        localStorage.setItem('lists', JSON.stringify(lists));
        setLists(lists);

        setInputValue('');
        toggleModal();
    };

    return (
        <form onSubmit={handleSubmit} className="add-item-form">
            <label htmlFor="add-list" className="mb-05">
                list
            </label>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                id="add-list"
                className="add-item-form-input"
            />
            <button className="add-item-form-button">add</button>
        </form>
    );
};

export default Form;
