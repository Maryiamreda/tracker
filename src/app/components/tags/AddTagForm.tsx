"use client";
import { useActionState, useState, useEffect } from "react";
import { addNewTag } from "./tagActions";

const AddTagForm = () => {
    const [name, setName] = useState("");
    const [icon, setIcon] = useState("");
    const [state, addNewTagAction] = useActionState(addNewTag, undefined); 
    
    const commonIcons = ['🏠', '🚗', '🍕', '💰', '📱', '👕', '⚡', '🎮', '📚', '🏥'];

    // Reset form on successful submission
    useEffect(() => {
        if (state?.data) {
            setName("");
            setIcon("");
        }
    }, [state]);

    return (
        <div>
            <form action={addNewTagAction}>
                <div className="mb-4">
                    <input 
                        type='text' 
                        name="name" 
                        id='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Tag name"
                        className="border p-2 rounded w-full"
                    />
                    {state?.errors?.name && (
                        <p className="text-red-500 text-sm mt-1">{state.errors.name[0]}</p>
                    )}
                </div>

                <input type="hidden" name="icon" value={icon} />
                
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Select Icon:</label>
                    <div className="flex flex-wrap gap-2">
                        {commonIcons.map((emoji, index) => (
                            <button
                                key={index}
                                type="button" // Important: prevents form submission
                                onClick={() => setIcon(emoji)}
                                className={`p-2 rounded border ${
                                    icon === emoji 
                                        ? 'bg-blue-100 border-blue-500' 
                                        : 'hover:bg-gray-100 border-gray-300'
                                }`}
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>
                    {state?.errors?.icon && (
                        <p className="text-red-500 text-sm mt-1">{state.errors.icon[0]}</p>
                    )}
                </div>

                <button 
                    type="submit" 
                    className="bg-green-950 text-white px-4 py-2 rounded hover:bg-green-900"
                    disabled={!name.trim() || !icon}
                >
                    Submit
                </button>
            </form>

            {/* Success message */}
            {state?.data && (
                <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                    Tag added successfully!
                </div>
            )}

            {/* General error message */}
            {state?.error && (
                <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {state.error}
                </div>
            )}
        </div>
    );
}

export default AddTagForm;