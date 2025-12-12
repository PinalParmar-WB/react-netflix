export const LOGO = "https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-12-03/consent/87b6a5c0-0104-4e96-a291-092c11350111/019ae4b5-d8fb-7693-90ba-7a61d24a8837/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";
export const USER_AVATAR = "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png";
export const BACKGROUD_IMAGE = "https://assets.nflxext.com/ffe/siteui/vlv3/274d310a-9543-4b32-87f3-147b372abc00/web/IN-en-20251201-TRIFECTA-perspective_baf6d3bc-eece-4a63-bcbb-e0a2f5d9d9ec_medium.jpg";
export const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + process.env.REACT_APP_TMDB_KEY
  }
};
export const POSTER_IMG_URL = "https://image.tmdb.org/t/p/w500/";
export const PREFERRED_LANGUAGES = [
  {identifier : "en", name : "English"},
  {identifier : "guj", name : "Gujarati"},
  {identifier : "hin", name : "Hindi"},
  {identifier : "tam", name : "Tamil"}
]