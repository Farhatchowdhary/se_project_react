// onAddItem refers to the submit handler declared in App.jsx
 const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
   // Call useForm and destructure its values and use in the JSX
   
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