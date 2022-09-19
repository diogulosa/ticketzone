export function createCookie(name, data, days) {
    var date, expires;
    if (days) {
        date = new Date();
        date.setDate(date.getDate()+days);
        // console.log(date)
        expires = "; expires="+date.toUTCString();
    } else {
        expires = "";
    }
    document.cookie = `${name}=${data}${expires}; path=/;SameSite=None; Secure`;
}

export function deleteCookie(name){
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
}

export function objectIsEmpty(obj){
    return Object.keys(obj).length === 0
}

export function getLastURLSegment(url){
    return url.substring(url.lastIndexOf('/') + 1)
}

export function mdc(a, b){ //maximo divisor comum
    return (b === 0) ? a : mdc(a, a%b) 
}

export function getImageAspectRatio(h, w){
    let r = mdc(h, w)
    return h/r +':'+w/r
}

export function commafy( num ) {
    var str = num.toString().split('.');
    if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
}

export function listenToScroll(){
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop
  
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight
  
    const scrolled = winScroll / height
    return scrolled
  }

  export async function fetchDataById(route, id, next) {
    try {
      let response = await fetch(`${route}/${id}`);
      let data = await response.json();
      if (data.success) {
        if(route === 'events'){
          const {image} = data.event
          var base64Flag = `data:${image.contentType};base64,`;
          var imgStr = arrayBufferToBase64(image.data.data)
          data.event.image = base64Flag + imgStr
          next(data.event)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  export async function fetchData(route, next) {
    try {
      let response = await fetch(`${route}/`);
      let data = await response.json();
      if (data.success) {
        if(route === 'countries') next(data.countries)
        if(route === 'events') next(data.events)
        if(route === 'categories') next(data.categories)
      }
    } catch (error) {
      console.log(error)
    }
  }

  