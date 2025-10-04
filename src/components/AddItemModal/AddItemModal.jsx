// onAddItem refers to the submit handler declared in App.jsx
 const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
   // Call useForm and destructure its values and use in the JSX
   
   function handleSubmit(e) {
     e.preventDefault()
     onAddItem(values, handleReset);
   }
     
   return (
     {/* Don't forget to pass appropriate props to ModalWithForm */}
     <ModalWithForm>
       {/* Set the value, name, and onChange attributes
        of each input field */}
     </ModalWithForm>
   );
 };
 
 export default AddItemModal;