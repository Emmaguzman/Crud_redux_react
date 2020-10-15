//Up server:: json-server db.json --port 4000

import axios from 'axios';


const clienteAxios=axios.create({
    baseURL:"http://localhost:4000/"
})
export default clienteAxios;