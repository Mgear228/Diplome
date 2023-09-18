import { useParams } from "react-router-dom";
import { useEffect } from "react"
import axios from "axios";

export function UserRegistration() {
    const {uid, token} = useParams();

    useEffect(() => {
        (async() => {
            const response = await axios.post(
                'https://studapi.teachmeskills.by/auth/users/activation/',
                {uid, token}
            )
        })();
    })

    return <div>Registration Success</div>;
}