'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import Modal from '@/app/_components/Modal';
import Form from '@/app/_components/Form/Form';

import { getLists } from '@/app/_utilities/lists';

export default function List() {
    const pathname = usePathname();
    const listIndex = pathname.split('/')[2];

    const [list, setList] = useState(null);
    useEffect(() => {
        setList(getLists()[listIndex]);
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const toggleModal = () => {
        setIsModalOpen(previousIsModalOpen => {
            if (previousIsModalOpen === true) {
                setIsEditingTask(false);
            }

            return !previousIsModalOpen;
        });
    };

    const [isEditingTask, setIsEditingTask] = useState(false);
    const handleEditTask = task => {
        setIsEditingTask(task);
        toggleModal();
    };

    if (!list) return;

    return (
        <div>
            <Link href="/" className="tasks-header">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
                </svg>{' '}
                lists
            </Link>

            <div>
                {list.tasks.map((task, index) => {
                    return (
                        <div key={task.id} className="task-container">
                            <div className="task">
                                <input
                                    type="checkbox"
                                    id={`task-${task.id}`}
                                    className="d-none"
                                />

                                <label
                                    htmlFor={`task-${task.id}`}
                                    className="task-checkbox mr-1"></label>

                                <label htmlFor={`task-${task.id}`}>
                                    {task.task}
                                </label>
                            </div>

                            <button
                                onClick={() =>
                                    handleEditTask({ ...task, index })
                                }
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
            </div>

            <button onClick={toggleModal} className="add-item-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                </svg>
            </button>

            <Modal isOpen={isModalOpen} toggleModal={toggleModal}>
                {isModalOpen ? (
                    <Form
                        setList={setList}
                        toggleModal={toggleModal}
                        type="task"
                        isEditingTask={isEditingTask}
                        setIsEditingTask={setIsEditingTask}
                    />
                ) : null}
            </Modal>
        </div>
    );
}
