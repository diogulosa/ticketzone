import { arrayBufferToBase64 } from "../../utils";

export async function getEvent(dispatch, eventId) {
   
    try {
      dispatch({ type: 'REQUEST_EVENT' });
      let response = await fetch('/events/' + eventId)
      let data = await response.json();
   
      if (data.success) {
        const {image} = data.event
        var base64Flag = `data:${image.contentType};base64,`;
        var imgStr = arrayBufferToBase64(image.data.data)
        data.event.image = base64Flag + imgStr
        dispatch({ type: 'REQUEST_EVENT_SUCCESS', payload: data.event });
        localStorage.setItem('currentEvent', JSON.stringify({event: data.event}));
        return data
      }
   
      dispatch({ type: 'REQUEST_EVENT_ERROR', message: data.message });
      return data;
    } catch (error) {
      dispatch({ type: 'REQUEST_EVENT_ERROR', error: error });
    }
  }
   
  export async function removeEvent(dispatch) {
    dispatch({ type: 'REQUEST_EVENT_DESTROY' });
    localStorage.removeItem('currentEvent');
  }