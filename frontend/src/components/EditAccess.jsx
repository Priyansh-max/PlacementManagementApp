/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React , {useState }from "react";

function EditAccess({Error}){
    const [email , setEmail] = useState("");
    const [role , setRole] = useState("");

    function handleSubmitRoles(){
        console.log("submitting");
    }
    return (
        <div>
            <form onSubmit={handleSubmitRoles}>
                <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">User Email</label>
                <input
                    type="email"
                    placeholder='Enter email id of user'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 rounded border border-grey focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all duration-200 ease-out-in focus:border-transparent pl-2 py-1 w-full"
                    required
                />
                {/* {Error.email && <p className="italic text-red-500 text-xs">{Error.email}</p>} */}
                </div>

                <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="mt-1 rounded border border-grey focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all duration-200 ease-out-in focus:border-transparent pl-2 py-1 w-full"
                    required
                >
                    <option value="">Select Role</option>
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                    <option value="MODERATOR">Moderator</option>
                </select>
                {/* {Error.role && <p className="italic text-red-500 text-xs">{Error.role}</p>} */}
                </div>

                <button
                type="submit"
                onClick={handleSubmitRoles}
                className="bg-orange-500 text-white font-semibold text-sm rounded w-full py-1 hover:bg-orange-700 transition-all duration-300 ease-out-in"
                >
                    Submit
                </button>
                

                {/* {Error.message && <p className="mt-2 text-red-500 text-sm">{Error.message}</p>} */}
            </form>
        </div>
    )
}

export default EditAccess