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

export async function addNewVisit(visitData) {

  return api.post('/visit', visitData).then(res => {
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
export async function updateVisit(updateData) {

  return api.put('/visit/' + updateData._id, updateData).then(res => {
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