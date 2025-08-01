"use client";
import { useActionState, useState } from "react";
import { addNewTag } from "./tagActions";

const AddTagForm= () => {
    const [name, setName] = useState("");
    const [state, addNewTagAction] = useActionState(addNewTag, undefined); 
  

  const [icon, setIcon] = useState("");
  const commonIcons = ['🏠', '🚗', '🍕', '💰', '📱', '👕', '⚡', '🎮', '📚', '🏥'];
const handlesubmit=()=>{
   
}
  return (
    <form action={addNewTagAction}>
      <input type='text' name="name" id='name'
                onChange={(e) => setName(e.target.value)}

      />
         <input type="hidden" name="icon" value={icon} />
  
 <div className="flex flex-wrap gap-2 mt-2">
        {commonIcons.map((emoji, index) => (
          <button
            key={index}
            onClick={() => setIcon(emoji)}
            className="p-2 hover:bg-gray-100 rounded"
          >
            {emoji}
          </button>
        ))}

      </div>

<button type="submit">submit</button>
    </form>
  );
}

export default AddTagForm;
