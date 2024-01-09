import { useEffect, useRef, useState } from 'react';

const ListForm = ({
    setLists,
    toggleModal,
    isEditingList,
    setIsEditingList
}) => {
    const [inputValue, setInputValue] = useState('');
    const handleChange = event => {
        setInputValue(event.currentTarget.value);
    };

    const handleSubmit = event => {
        event.preventDefault();

        let lists = JSON.parse(localStorage.getItem('lists'));
        if (isEditingList) {
            lists[isEditingList.index] = {
                name: inputValue,
                tasks: isEditingList.tasks
            };
            setIsEditingList(false);
        } else {
            lists.push({
                name: inputValue,
                tasks: []
            });
        }

        localStorage.setItem('lists', JSON.stringify(lists));
        setLists(lists);

        setInputValue('');
        toggleModal();
    };

    const handleDeleteItem = () => {
        let lists = JSON.parse(localStorage.getItem('lists'));
        lists.splice(isEditingList.index, 1);
        localStorage.setItem('lists', JSON.stringify(lists));
        setLists(lists);

        setIsEditingList(false);
        setInputValue('');
        toggleModal();
    };

    useEffect(() => {
        if (isEditingList.name) {
            setInputValue(isEditingList.name);
        }
    }, [isEditingList]);

    const inputRef = useRef();
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    return (
        <form onSubmit={handleSubmit} className="item-form">
            <label htmlFor="add-list" className="mb-05">
                list
            </label>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                id="add-list"
                ref={inputRef}
                className="item-form-input"
            />

            {isEditingList ? (
                <div className="item-form-buttons">
                    <button
                        className="item-form-button bg-color-red"
                        onClick={handleDeleteItem}
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
export default ListForm;
