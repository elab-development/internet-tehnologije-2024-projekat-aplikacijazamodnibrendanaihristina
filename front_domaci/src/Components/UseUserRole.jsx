import { useState, useEffect } from "react";

function useUserRole() {
    const [role, setRole] = useState(() => sessionStorage.getItem("role"));

    useEffect(() => {
        sessionStorage.setItem("role", role);
    }, [role]);

    return [role, setRole];
}

export default useUserRole;
