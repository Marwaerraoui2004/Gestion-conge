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

const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end - start;
    return timeDiff / (1000 * 3600 * 24); 
};

export default function Manager() {
    const conges = useSelector((state) => state.DemandeReducer); 
    const dispatch = useDispatch();
    
    const [selectedMonth, setSelectedMonth] = useState("");
    const [adminActif, setAdminActif] = useState(1);

    const modifierStatut = (id, statut) => {
        dispatch({ type: 'MODIFIER_STATUT_CONGE', payload: { id, statut } });
    };

    const filterCongesByMonth = (month) => {
        if (!month) return conges; 
        return conges.filter((conge) => {
            const congeDate = new Date(conge.dateDebut); 
            return congeDate.getMonth() === month; 
        });
    };

    const QUOTA_CONGES = 25;

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

    const getTotalJoursUtilisesForEmployee = (employeeName) => {
        return filterCongesByMonth(selectedMonth)
            .filter((conge) => conge.nom === employeeName && conge.statut === "Approuvé")
            .reduce((acc, conge) => acc + calculateDays(conge.dateDebut, conge.dateFin), 0);
    };

    return (
        <div>
            <h2>Suivi des Congés</h2>
            
            <label>Choisir l'admin :</label>
            <select onChange={(e) => setAdminActif(Number(e.target.value))} value={adminActif}>
                <option value={1}>Admin 1</option>
                <option value={2}>Admin 2</option>
            </select>

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
                        <th>Jours pris</th>
                        <th>Quota restant</th> 
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filterCongesByMonth(selectedMonth).map((conge) => {
                        const joursPris = conge.statut === "Approuvé" 
                            ? calculateDays(conge.dateDebut, conge.dateFin)
                            : 0; 
                        
                        const totalJoursUtilises = getTotalJoursUtilisesForEmployee(conge.nom);
                        const quotaRestant = QUOTA_CONGES - totalJoursUtilises; 

                        const depasseQuota = totalJoursUtilises > QUOTA_CONGES; 
                        
                        // On vérifie ici si le congé est approuvé et si la durée dépasse 25 jours
                        const statutAfficher = (conge.statut === "Approuvé" && joursPris > QUOTA_CONGES) ? "Reporté" : conge.statut;

                        return (
                            <tr key={conge.id || Math.random()}>
                                <td>{conge.nom}</td>
                                <td>{conge.dateDebut}</td>
                                <td>{conge.dateFin}</td>
                                <td style={{ color: getColor(statutAfficher) }}>
                                    {statutAfficher} 
                                </td>
                                <td>{joursPris} jours</td>
                                <td>{quotaRestant} jours restants</td> 
                                <td>
                                    {depasseQuota && (
                                        <span style={{ color: 'red' }}>Alerte : Quota dépassé!</span>
                                    )}
                                    {conge.managerId === adminActif && (
                                        <>
                                            <button 
                                                onClick={() => modifierStatut(conge.id, "Approuvé")} 
                                                disabled={depasseQuota}
                                            >
                                                Accepter
                                            </button>
                                            <button onClick={() => modifierStatut(conge.id, "Refusé")}>Refuser</button>
                                            <button onClick={() => modifierStatut(conge.id, "Reporté")}>Reporter</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
