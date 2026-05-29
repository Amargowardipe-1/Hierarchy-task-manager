import {useEffect, useState} from "react";
import axios from "axios";

function UserInScope() {
    
    const [UsersInScope, setUsersInScope] = useState(1);
    

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(
                    "http://localhost:8000/api/users",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                setUsersInScope(res.data.length);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }

        fetchUsers();
    }, [])

    return (
         <div className="bg-blue-100 p-4 rounded shadow">
              <h3 className="font-semibold">Users in Scope</h3>
              <p className="text-2xl">{UsersInScope}</p>
            </div>
    );
}

export default UserInScope;