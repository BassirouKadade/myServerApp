const express=require('express')
const emploisRoute=express.Router()
const {getEmplois, creerEmplois,getEmploisDay,
    deleteReservationSeanceupdate,
    getEmploisSalle,deleteReservationSeance,getTotalGroupeSalleFormateur,
    reservationFormateurUpdateSeance,
    reservationFormateurUpdateSeanceValid,
    reservationSalleUpdateSeance,
    reservationSalleUpdateSeanceValid,
    getEmploisPrime,
    getEmploisFormateurCentrePrime,
    getEmploisSallePrime,
    deleteReservationSeanceupdateAndDelete,
    reinitialisationEspaceEmploisFormateur,
    getEmploisAllOFDatabase,getInfoEtablissement,
    getTotaleMasseHoraire,getEmploisFormateurCentre,verificationEmplois} = require('../controllers/emploisController/emploisController');

emploisRoute.post('/verification-disponibilite-emplois', verificationEmplois);
emploisRoute.post('/creer-emplois', creerEmplois);
emploisRoute.get('/get-emplois', getEmplois);
emploisRoute.get('/get-Totale-Masse-Horaire', getTotaleMasseHoraire);
emploisRoute.get('/get-emplois-salle', getEmploisSalle);
emploisRoute.get('/get-emplois-formateur', getEmploisFormateurCentre);
emploisRoute.delete('/delete-reservation-seance', deleteReservationSeance);
emploisRoute.get('/get-total-groupe-salle-formateur', getTotalGroupeSalleFormateur);
emploisRoute.get('/get-emplois-day', getEmploisDay);
emploisRoute.delete('/delete-update-reservation-seance', deleteReservationSeanceupdate);
emploisRoute.get('/reservation-formateur-update-seance', reservationFormateurUpdateSeance);
emploisRoute.post('/reservation-formateur-update-seance-valid', reservationFormateurUpdateSeanceValid);
emploisRoute.get('/reservation-salle-update-seance', reservationSalleUpdateSeance);
emploisRoute.post('/reservation-salle-update-seance-valid', reservationSalleUpdateSeanceValid);

emploisRoute.delete('/delete-update-reservation-seance-and-delete', deleteReservationSeanceupdateAndDelete);
emploisRoute.get('/get-info-etabliseement-directeur', getInfoEtablissement);
emploisRoute.get('/reinitialisationEspaceEmploisFormateur', reinitialisationEspaceEmploisFormateur);



emploisRoute.get('/get-emplois-of-database',getEmploisAllOFDatabase);


emploisRoute.get('/get-emplois-groupe-prime', getEmploisPrime);
emploisRoute.get('/get-emplois-salle-prime', getEmploisSallePrime);
emploisRoute.get('/get-emplois-formateur-prime', getEmploisFormateurCentrePrime);


module.exports=emploisRoute