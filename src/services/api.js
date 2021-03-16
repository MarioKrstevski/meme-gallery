import axios from "axios";
import backend from "../backend/index";

const IMGFLIP_API = "https://api.imgflip.com";
// mojot token kje go deaktiviram za 1 nedela, dokolku sakate na unsplash moze da se napravi acc i ke vi dade vashe client_id da koristite
const PHOTOS_API = "https://api.unsplash.com/photos/?client_id=TcMJwMJQUxE8pHV91hLx5D8TJmk_5cPKPEs1VFQU-Io";

const memesInstance = axios.create({
  baseURL: IMGFLIP_API,
  timeout: 3000,
});

const photosInstance = axios.create({
  baseURL: PHOTOS_API,
  timeout: 3000,
});

const api = {
  async get(url = "", endpoint) {
    if (url === "localhost") {
      return backend(endpoint);
    }
    let result = null;

    if (!url) {
      try {
        const response = await axios.get(url + "/" + endpoint);
        result = response;
      } catch (error) {}
    }

    if (url === "photos") {
      try {
        const response = await photosInstance.get(endpoint);
        result = response;
      } catch (error) {}
    }
    if (url === "memes") {
      try {
        const response = await memesInstance.get(endpoint);
        result = response;
      } catch (error) {}
    }

    return result;
  },
};

export default api;
