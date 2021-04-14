// Hook meant to be used to retrieve user based on react-router-dom params
import axios from "axios";
import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import UserContext from "../components/UserState/userContext";


export default function useUser () {
    const { id } = useParams();
    const { user: authUser, update } = useContext(UserContext);
    const [ user, setUser ] = useState(null);
    const [ isCurrentUser, setIsCurrentUser ] = useState(false);
    const [ updatedUser, setUpdatedUser ] = useState(user);
    const [ edit, setEdit ] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:3003/api/users/${id}`); 
                setUser(response.data);
                setUpdatedUser(response.data);
            } catch (e) {
                setUser(null);
            }
        };
        fetchUser();
    }, [id, authUser]);

    // set state if edit is possible
    useEffect(() => {
        if (authUser && user && authUser?.id === user?.id) {
            setIsCurrentUser(true);
        }
    }, [authUser, user]);

    return { authUser, update, user, setUser, isCurrentUser, updatedUser, setUpdatedUser, edit, setEdit };
};