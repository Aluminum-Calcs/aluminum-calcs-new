

export async function saveDraft_localStorage(values, storage_key) {
  if (!storage_key) {
    console.error('Invalid Storage Key')
    return;
  }
  try {
    localStorage.setItem(storage_key, JSON.stringify(values));
    console.log('Success saving draft to local storage!');
  } catch (error) {
    console.error('Error Saving draft to local storage: ', error);
  }
}