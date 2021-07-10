import api from '../API.js'

// -----------------------------------------------------------------
// ----------------------------- GET -------------------------------
// -----------------------------------------------------------------
export async function getAVisit(visitId) {

  return api.get('/visit/' + visitId, {}).then(res => {
    //console.log(res);
    return res.data;
  })
    .catch(err => {
      console.log('error', err)
      throw err;
    })
}

// -----------------------------------------------------------------
// ----------------------------- POST ------------------------------
// -----------------------------------------------------------------

export async function addNewVisit(reasonOfVisit, consult, patient, dateOfVisit, prescribedMedication) {

  return api.post('/visit', {
    reasonOfVisit: reasonOfVisit,
    consult: consult,
    patient: patient,
    dateOfVisit: dateOfVisit,
    prescribedMedication: prescribedMedication,
  }).then(res => {
    //console.log(res.data);
    return res.data
  })
    .catch(err => {
      console.log('error', err)
      throw err;
    })
}

// -----------------------------------------------------------------
// ----------------------------- PUT -------------------------------
// -----------------------------------------------------------------


// -----------------------------------------------------------------
// ----------------------------- DELETE ----------------------------
// -----------------------------------------------------------------