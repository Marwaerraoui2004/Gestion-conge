import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import employes from '../FichierJson/Employes.json'; 
import managers from '../FichierJson/Manager.json'; 

export default function Login() {
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        let userExists = false;
        if (role === "manager") {
            userExists = managers.some(
                (manager) => manager.email === email && manager.nom === name
            );
        } else if (role === "employe") {
            userExists = employes.some(
                (employe) => employe.email === email && employe.nom === name
            );
        }

        if (!userExists) {
            alert("Utilisateur non trouvé. Vérifiez vos informations.");
            return;
        }

        // Rediriger selon le rôle
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
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label>Email :</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
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
