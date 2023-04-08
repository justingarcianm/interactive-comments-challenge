import { ModalState } from "@/context/modal.context";

const Modal = () => {
  const { objID, objType, showModal, setShowModal } = ModalState();

  return (
    <>
      <div className="absolute min-h-screen top-0 bottom-0 left-0 right-0 bg-dark-blue opacity-80 z-1"></div>
      <div className="z-10 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] opacity-100 fixed rounded bg-very-light-gray max-w-sm p-8 flex flex-col gap-4">
        <h3 className="font-semibold text-2xl text-dark-blue">Delete {objType}</h3>
        <p>
          Are you sure you want to delete this {objType}? This will remove the {objType} and can&apos;t be undone. {objType === "comment" ? "This will also delete any attached replies" : ""}
        </p>
        <div className="flex justify-between items-center">
          <button className="text-white uppercase rounded py-2 px-7 bg-dark-blue hover:bg-grayish-blue" onClick={() => setShowModal(!showModal)}>
            No, Cancel
          </button>
          <button className="text-white uppercase rounded py-2 px-7 delete-btn" onClick={() => setShowModal(!showModal)}>
            Yes, Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
