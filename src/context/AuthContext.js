import {createContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
import verifyToken from "../helpers/verifyToken";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [auth, toggleAuth] = useState({
        isAuth: false,
        user: null,
        status: "pending",
    });

    const history = useHistory();

    useEffect(() => {
        console.log("context wordt gefresht!");
        const storageToken = localStorage.getItem("token");
        if(storageToken){
            const decodedJwtToken = jwtDecode(storageToken);
            if(verifyToken(decodedJwtToken.exp)) {
                getUserData(decodedJwtToken.sub, storageToken);
            }else{
                history.push("/login");
            }
        }else{
            toggleAuth({
                isAuth: false,
                user: null,
                status: "done",
            })
        }

    }, []);

    async function getUserData(username, token) {
        try{
            const userData = await axios.get(`http://localhost:8080/users/${username}`, {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,

                }
            });
            toggleAuth({
                isAuth: true,
                user: {
                    id: userData.data.id,
                    email: userData.data.email,
                    username: userData.data.username,
                    userAuthority: userData.data.authorities.authority,
                    customer: userData.data.customer,
                },
                status: "done",
            });
            console.log(userData);
            if(userData.data.authorities[0].authority === "ROLE_ADMIN"){
                history.push("/product-form");
            }else if(userData.data.customer === null){
                history.push("/personinfo");
            }else{
                history.push("/profile")
            };

        }catch(e){
            console.error(e);
        };
    };

    function isSignedFunction (jwtToken){
        const decodedJwtToken = jwtDecode(jwtToken);
        console.log(decodedJwtToken);
        localStorage.setItem("token", jwtToken);
        getUserData(decodedJwtToken.sub, jwtToken)
        console.log("Gebruiker is ingeloged");
        // history.push("/profile");
    }

    function isSignedOutFunction() {
        toggleAuth({
            ...auth,
            isAuth: false,
            user: null,
        });
        console.log("Gebruiker is uitgelogd");
        history.push("/");
        localStorage.clear();
    }

    const data = {
        ...auth,
        login: isSignedFunction,
        logout: isSignedOutFunction,
    };

    return (
        <div>
            <AuthContext.Provider value={data}>
                {auth.status === "pending" ?
                    <p>Loading...</p>
                    :
                    children
                }
            </AuthContext.Provider>
        </div>
    )


}

export default AuthContextProvider;

