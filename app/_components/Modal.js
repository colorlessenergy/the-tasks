const Modal = ({ isOpen, toggleModal, children }) => {
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
                }`}>
                {children}
            </div>
        </>
    );
};

export default Modal;
