import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; 

export default function Login() {
    const [role, setRole] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (role === "manager") {
            navigate("/manager");
        } else if (role === "employe") {
            navigate("/employe");
        } else {
            alert("Veuillez sélectionner un rôle !");
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <h2>Connexion</h2>

                <div>
                    <label>Nom Complet :</label>
                    <input type="text" required />
                </div>

                <div>
                    <label>Email :</label>
                    <input type="email" required />
                </div>

                <div className="radio-group">
                    <label>Rôle :</label>
                    <label>
                        <input
                            type="radio"
                            name="choix"
                            value="manager"
                            onChange={(e) => setRole(e.target.value)}
                        />
                        Manager
                    </label>
                    
                    <label>
                        <input
                            type="radio"
                            name="choix"
                            value="employe"
                            onChange={(e) => setRole(e.target.value)}
                        />
                        Employé
                    </label>
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    );
}