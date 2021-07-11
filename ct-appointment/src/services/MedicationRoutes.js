import api from '../API.js'

// -----------------------------------------------------------------
// ----------------------------- GET -------------------------------
// -----------------------------------------------------------------
export async function getAMedication(medicationId) {

  return api.get('/medication/' + medicationId, {}).then(res => {
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

export async function addNewMedication(name, dose, packageSize) {

  return api.post('/medication', {
    name: name,
    dose: dose,
    packageSize: packageSize
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
export async function deleteMedication(medicationId) {

  return api.delete('/medication/' + medicationId).then(res => {
    console.log(res.data);
    return res.data
  })
    .catch(err => {
      console.log('error', err)
      throw err;
    })
}