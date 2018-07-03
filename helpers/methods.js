export default {
  setCookie: (name,value,days) => {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
  },
  getCookie: (name) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  },
  eraseCookie: (name) => {   
    document.cookie = name+'=; Max-Age=-99999999;';  
  },
  range: (start, edge, step) => {
    // If only one number was passed in make it the edge and 0 the start.
    if (arguments.length == 1) {
      edge = start;
      start = 0;
    }
   
    // Validate the edge and step numbers.
    edge = edge || 0;
    step = step || 1;
   
    // Create the array of numbers, stopping befor the edge.
    for (var ret = []; (edge - start) * step > 0; start += step) {
      ret.push(start);
    }
    return ret;
  }
}