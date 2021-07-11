import api from '../API.js'

// All the routes in realtion with the patient

// -----------------------------------------------------------------
// ----------------------------- GET -------------------------------
// -----------------------------------------------------------------
export async function getAllPatients() {

    return api.get('/patient', {}).then(res => {
      //console.log(res.data);
      return res.data
    })
      .catch(err => {
        console.log('error', err)
        throw err;
    })
  }

// -----------------------------------------------------------------
// ----------------------------- POST ------------------------------
// -----------------------------------------------------------------

export async function addNewPatient(firstName, lastName, address, dateOfBirth, visits) {

  return api.post('/patient', {
    firstName: firstName,
    lastName: lastName,
    address: address,
    dateOfBirth: dateOfBirth, // Optional
    visits: visits, // Optional
  }).then(res => {
    console.log(res);
    return res
  })
    .catch(err => {
      console.log('error', err)
      throw err;
    })
}

// -----------------------------------------------------------------
// ----------------------------- PUT -------------------------------
// -----------------------------------------------------------------
export async function updatePatient(updateData) {

  return api.put('/patient/' + updateData._id, updateData).then(res => {
    //console.log(res.data);
    return res.data
  })
    .catch(err => {
      console.log('error', err)
      throw err;
    })
}


// -----------------------------------------------------------------
// ----------------------------- DELETE ----------------------------
// -----------------------------------------------------------------