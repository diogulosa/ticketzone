export async function loginUser(dispatch, loginPayload) {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginPayload),
    };
   
    try {
      dispatch({ type: 'REQUEST_LOGIN' });
      let response = await fetch('/users/validate', requestOptions);
      let data = await response.json();
   
      if (data.success) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: data });
        localStorage.setItem('currentUser', JSON.stringify({user: data.user}));
        return data
      }
   
      dispatch({ type: 'LOGIN_ERROR', message: data.message });
      return data;
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', error: error });
    }
  }
   
  export async function logout(dispatch) {
    dispatch({ type: 'LOG_OUT' });
    localStorage.removeItem('currentUser');
  }
