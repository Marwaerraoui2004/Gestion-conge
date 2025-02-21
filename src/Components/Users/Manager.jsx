import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import './Manager.css';
const getColor = (statut) => {
    switch (statut) {
        case "Approuvé":
            return "green";
        case "Refusé":
            return "red";
        case "Reporté":
            return "orange";
        default:
            return "black";
    }
};

export default function Manager() {
    const conges = useSelector((state) => state.DemandeReducer); 
    const dispatch = useDispatch();
    const [selectedMonth, setSelectedMonth] = useState("");

    const modifierStatut = (id, statut) => {
        dispatch({ type: 'MODIFIER_STATUT_CONGE', payload: { id, statut } });
    };

    const filterCongesByMonth = (month) => {
        if (!month) return conges; 
        return conges.filter((conge) => {
            const congeDate = new Date(conge.dateDebut); 
            const congeMonth = congeDate.getMonth();
            return congeMonth === month; 
        });
    };

    const months = [
        { value: 0, label: "Janvier" },
        { value: 1, label: "Février" },
        { value: 2, label: "Mars" },
        { value: 3, label: "Avril" },
        { value: 4, label: "Mai" },
        { value: 5, label: "Juin" },
        { value: 6, label: "Juillet" },
        { value: 7, label: "Août" },
        { value: 8, label: "Septembre" },
        { value: 9, label: "Octobre" },
        { value: 10, label: "Novembre" },
        { value: 11, label: "Décembre" },
    ];

    return (
        <div>
            <h2>Suivi des Congés</h2>
            
            <select onChange={(e) => setSelectedMonth(Number(e.target.value))} value={selectedMonth}>
                <option value="">Tous les mois</option>
                {months.map((month) => (
                    <option key={month.value} value={month.value}>
                        {month.label}
                    </option>
                ))}
            </select>

            <table border="1">
                <thead>
                    <tr>
                        <th>Employé</th>
                        <th>Date début</th>
                        <th>Date fin</th>
                        <th>Statut</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filterCongesByMonth(selectedMonth).map((conge) => (
                        <tr key={conge.id}>
                            <td>{conge.employeId}</td>
                            <td>{conge.dateDebut}</td>
                            <td>{conge.dateFin}</td>
                            <td style={{ color: getColor(conge.statut) }}>{conge.statut}</td>
                            <td>
                                <button onClick={() => modifierStatut(conge.id, "Approuvé")}>Accepter</button>
                                <button onClick={() => modifierStatut(conge.id, "Refusé")}>Refuser</button>
                                <button onClick={() => modifierStatut(conge.id, "Reporté")}>Reporter</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
