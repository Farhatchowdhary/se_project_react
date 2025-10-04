import "./AddItemModal.css";


 const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {

   
   function handleSubmit(e) {
     e.preventDefault()
     onAddItem(values, handleReset);
   }
     
   return (

     <ModalWithForm>
   
     </ModalWithForm>
   );
 };
 
 export default AddItemModal;