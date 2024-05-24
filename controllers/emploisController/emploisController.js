const { Reservation, Salle, Groupe } = require('../../config/sequelize');
const { Op } = require('sequelize');

const emploisController = {
  verificationEmplois: async (request, response) => {
    try {
      const { day, start, end } = request.body;
      console.log(request.body)
      if (start<0 || !day || end<0) {
        return response.status(400).json({ error: 'Start, end dates, and day are required' });
      }
  
      const reservations = await Reservation.findAll({
        where: {
          [Op.and]: [
            { startIndex: { [Op.gte]: start } },
            { startEnd: { [Op.lte]: end } },
            { day: { [Op.eq]: day } }
          ]
        }
      });
  
      const reservedSalleIds = reservations.map(reservation => reservation.salle);
      const salles = await Salle.findAll({
          where: {
              [Op.and]: [
                  { nom: { [Op.notIn]: reservedSalleIds } },
                  { MREST: { [Op.gt]: 0 } }
              ]
          }
      });
      
      response.status(200).json(salles);
    } catch (error) {
      console.error('Erreur lors de la vérification des emplois:', error);
      response.status(500).send('Erreur lors de la vérification des emplois');
    }
  },
  creerEmplois: async (request, response) => {
    try {
      const {
        startIndex,
        startEnd,
        idSalle,
        idGroupe,
        typeSeance,
        day,
        width
      } = request.body;
  
      if (startIndex<0 || !width || startEnd<0 || !idSalle || !idGroupe || !typeSeance) {
        return response.status(400).json({ error: 'Missing required parameters' });
      }
      const nombreSeance=width/45
      const resultNombre=nombreSeance*0.5
      const salle= await Salle.findByPk(idSalle)
      if (salle) {
        salle.MREST -= resultNombre;
        await salle.save();

    }
      const groupe=await Groupe.findByPk(idGroupe);

     const r= await Reservation.create({
        startIndex: startIndex,
        startEnd: startEnd,
        typeReservation: typeSeance,
        groupe: groupe?.code, // Utiliser idGroupe ici
        salle: salle?.nom,
        day:day,
        width:width
      });
      // Retourner la réservation créée
      response.status(200).json({message:"La reservation est creer avec success"});
    } catch (error) {
      console.error(error);
      response.status(500).send('Error during job scheduling verification');
    }
  },
  getEmplois: async (request, response) => {
    try {
      const { idGroupe } = request.query;
      if (!idGroupe) {
        return response.status(400).json({ error: 'idGroupe is required' });
      }
  
      const groupe = await Groupe.findByPk(idGroupe);
      if (!groupe) {
        return response.status(404).json({ error: 'Groupe not found' });
      }
      const reservations = await Reservation.findAll({
        where: {
          groupe: { [Op.eq]: groupe.code } // Assuming 'groupe' refers to 'idGroupe'
        }
      });
  
      response.status(200).json(reservations);
    } catch (error) {
      console.error('Erreur lors de la vérification des emplois:', error);
      response.status(500).send('Erreur lors de la vérification des emplois');
    }
  },  
};

module.exports = emploisController;



// select * from salles where id not in ( 
// select idSalle from reservation where data_satr es supprimer )



// ------------2--4----------------------

// const result= select * from salles where id in (select * from reservation where data_debut>=date_sata and data_fin < date_fin )

// select * from salles where id not in (result);

