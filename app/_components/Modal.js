const Modal = ({ isOpen, toggleModal }) => {
    return (
        <>
            <div
                onClick={toggleModal}
                className={`modal ${
                    isOpen ? 'modal-open' : 'modal-close'
                }`}></div>
            <div
                className={`modal-content ${
                    isOpen ? 'modal-content-open' : 'modal-content-close'
                }`}></div>
        </>
    );
};

export default Modal;
