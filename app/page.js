'use client';

import { useEffect, useState } from 'react';

import Modal from './_components/Modal';
import Form from './_components/Form/Form';

import { getLists } from './_utilities/lists';

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => {
        setIsModalOpen(previousIsModalOpen => {
            if (previousIsModalOpen === true) {
                setIsEditingList(false);
            }

            return !previousIsModalOpen;
        });
    };

    const [lists, setLists] = useState([]);
    useEffect(() => {
        setLists(getLists());
    }, []);

    const [isEditingList, setIsEditingList] = useState(false);
    const handleEditList = list => {
        setIsEditingList(list);
        toggleModal();
    };

    return (
        <div>
            {lists.map((list, index) => {
                return (
                    <div key={index} className="list mb-2">
                        <div className="list-header">
                            <a href={`/list/${index}`} className="pb-1">
                                {list.name}
                            </a>

                            <a href={`/list/${index}`}>
                                {list.tasks.length}{' '}
                                {list.tasks.length > 1 ? 'tasks' : 'task'}
                            </a>
                        </div>

                        <button
                            onClick={() => handleEditList({ ...list, index })}
                            className="button-svg">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path d="M4.5 10.5C3.675 10.5 3 11.175 3 12C3 12.825 3.675 13.5 4.5 13.5C5.325 13.5 6 12.825 6 12C6 11.175 5.325 10.5 4.5 10.5ZM19.5 10.5C18.675 10.5 18 11.175 18 12C18 12.825 18.675 13.5 19.5 13.5C20.325 13.5 21 12.825 21 12C21 11.175 20.325 10.5 19.5 10.5ZM12 10.5C11.175 10.5 10.5 11.175 10.5 12C10.5 12.825 11.175 13.5 12 13.5C12.825 13.5 13.5 12.825 13.5 12C13.5 11.175 12.825 10.5 12 10.5Z"></path>
                            </svg>
                        </button>
                    </div>
                );
            })}

            <button onClick={toggleModal} className="add-item-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                </svg>
            </button>

            <Modal isOpen={isModalOpen} toggleModal={toggleModal}>
                {isModalOpen ? (
                    <Form
                        setLists={setLists}
                        toggleModal={toggleModal}
                        isEditingList={isEditingList}
                        setIsEditingList={setIsEditingList}
                    />
                ) : null}
            </Modal>
        </div>
    );
}
