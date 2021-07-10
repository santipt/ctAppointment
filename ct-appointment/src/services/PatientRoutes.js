import api from '../API.js'

// -----------------------------------------------------------------
// ----------------------------- GET -------------------------------
// -----------------------------------------------------------------
export async function getAllPatients() {

    return api.get('/patient', {}).then(res => {
      console.log(res.data);
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
    dateOfBirth: dateOfBirth,
    visits: visits,
  }).then(res => {
    console.log(res);
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