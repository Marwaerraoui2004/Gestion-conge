import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Employes.css';  

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
  const [nom,setNom]=useState("");
  const [dateFin, setDateFin] = useState("");
  const [managerId, setManagerId] = useState(1); 
  const dispatch = useDispatch();

  const conges = useSelector((state) => state.DemandeReducer);

  const demandesEmploye = conges.filter(conge => conge.employeId === employeId);

  const handleAjouter = () => {
    if (!dateDebut || !dateFin) return;

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

    setDateDebut("");
    setDateFin("");
  };

  return (
    <div className="employe-container">
      <h3>Nouvelle Demande de Congé</h3>
      
      <label>Choisir un admin responsable :</label>
      <select onChange={(e) => setManagerId(Number(e.target.value))} value={managerId}>
        <option value={1}>Admin 1</option>
        <option value={2}>Admin 2</option>
      </select>

      <input
        type="date"
        value={dateDebut}
        onChange={(e) => setDateDebut(e.target.value)}
      />
      <input
        type="date"
        value={dateFin}
        onChange={(e) => setDateFin(e.target.value)}
      />
      <button onClick={handleAjouter}>Ajouter Congé</button>

      <div className="demandes-list">
        <h3>Demandes de Congé</h3>
        <table>
          <thead>
            <tr>
              <th>Admin Responsable</th>
              <th>Nom d'employe</th>
              <th>Date Début</th>
              <th>Date Fin</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {demandesEmploye.length > 0 ? (
              demandesEmploye.map((demande) => (
                <tr key={demande.id}>
                  <td>Admin {demande.managerId}</td>
                  <td>Admin {demande.nom}</td>
                  <td>{demande.dateDebut}</td>
                  <td>{demande.dateFin}</td>
                  <td style={{ color: getColor(demande.statut) }}>{demande.statut}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Aucune demande de congé</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employes;
