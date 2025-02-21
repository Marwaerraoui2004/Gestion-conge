import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './Employes.css';  

const Employes = ({ managerId, employeId }) => {
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const dispatch = useDispatch();

  const conges = useSelector((state) => state.DemandeReducer);

  const demandesEmploye = conges.filter(conge => conge.employeId === employeId);

  const handleAjouter = () => {
    if (!dateDebut || !dateFin) return;

    const nouvelleDemande = {
      id: Date.now(),
      employeId: employeId,  
      managerId: parseInt(managerId),
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
              <th>Date Début</th>
              <th>Date Fin</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {demandesEmploye.length > 0 ? (
              demandesEmploye.map((demande) => (
                <tr key={demande.id}>
                  <td>{demande.dateDebut}</td>
                  <td>{demande.dateFin}</td>
                  <td>{demande.statut}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">Aucune demande de congé</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employes;
