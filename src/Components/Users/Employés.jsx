import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Employes.css';  

const QUOTA_CONGES = 25;

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

const Employes = ({ employeId }) => {
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [nom, setNom] = useState("");  
  const [managerId, setManagerId] = useState(1); 
  const [messageAlerte, setMessageAlerte] = useState(""); 
  const dispatch = useDispatch();

  const conges = useSelector((state) => state.DemandeReducer);
  const demandesEmploye = conges.filter(conge => conge.employeId === employeId);

  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end - start;
    return timeDiff / (1000 * 3600 * 24); 
  };

  const totalJoursUtilises = demandesEmploye
    .filter(demande => demande.statut === "Approuvé" || demande.statut === "En attente")
    .reduce((acc, demande) => acc + calculateDays(demande.dateDebut, demande.dateFin), 0);

  const joursRestants = QUOTA_CONGES - totalJoursUtilises;

  const handleAjouter = () => {
    if (!dateDebut || !dateFin || new Date(dateFin) <= new Date(dateDebut)) {
      alert("Veuillez vérifier les dates (la date de fin doit être après la date de début).");
      return;
    }

    const joursDemande = calculateDays(dateDebut, dateFin);

    if (joursDemande > joursRestants) {
      setMessageAlerte("Attention! Vous avez dépassé votre quota de congé.");
    } else {
      setMessageAlerte("");
    }

    const nouvelleDemande = {
      id: Date.now(),
      employeId,  
      nom,
      managerId,
      dateDebut,
      dateFin,
      statut: "En attente"
    };

    dispatch({
      type: "AJOUTER_CONGE",
      payload: nouvelleDemande
    });

    setNom("");
    setDateDebut("");
    setDateFin("");
  };

  return (
    <div className="employe-container">
      <h3>Nouvelle Demande de Congé</h3>
      
      <label>Nom de l'employé :</label>
      <input
        type="text"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        placeholder="Nom de l'employé"
      />
      
      <label>Choisir un admin responsable :</label>
      <select onChange={(e) => setManagerId(Number(e.target.value))} value={managerId}>
        <option value={1}>Admin 1</option>
        <option value={2}>Admin 2</option>
      </select>

      <label>Date début :</label>
      <input
        type="date"
        value={dateDebut}
        onChange={(e) => setDateDebut(e.target.value)}
      />

      <label>Date fin :</label>
      <input
        type="date"
        value={dateFin}
        onChange={(e) => setDateFin(e.target.value)}
      />

      <button onClick={handleAjouter}>Ajouter Congé</button>

      {messageAlerte && <div style={{ color: "red" }}>{messageAlerte}</div>}

      <div className="demandes-list">
        <h3>Demandes de Congé</h3>
        <table>
          <thead>
            <tr>
              <th>Admin Responsable</th>
              <th>Nom d'employé</th>
              <th>Date Début</th>
              <th>Date Fin</th>
              <th>Statut</th>
              <th>Jours Restants</th>
            </tr>
          </thead>
          <tbody>
            {demandesEmploye.length > 0 ? (
              demandesEmploye.map((demande) => (
                <tr key={demande.id}>
                  <td>Admin {demande.managerId}</td>
                  <td>{demande.nom}</td>
                  <td>{demande.dateDebut}</td>
                  <td>{demande.dateFin}</td>
                  <td style={{ color: getColor(demande.statut) }}>{demande.statut}</td>
                  <td>
                    <span>{joursRestants} jours restants</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">Aucune demande de congé</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employes;
