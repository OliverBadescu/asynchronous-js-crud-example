
export  async function getAllCars(){


    try{


        let response= await api(`getAll`);

        let data= await response.json();

        return data;

    }catch(err){
        return { success: false, message: "An error occurred while getting the cars." };

    }
   
}

export async function getCarById(carId) {
    try{

       
        let response= await api(`getById/${carId}`);
        if (response.ok) {
            return await response.json(); 
        } else {
            return { success: false, message: "Failed to fetch car data." };
        }

    }catch(err){
        return { success: false, message: "An error occurred while getting the cars." };

    }

    
}

export async function deleteCarById(carId) {
    try{

       
        let response= await api(`delete/${carId}`, "DELETE");
        let data= await response.json();

        return data;

    }catch(err){
        return { success: false, message: "An error occurred while getting the cars." };

    }

    
}

export async function createCar(car) {


    try{


         let response= await api("add","POST",car);


         if (response.ok) {
            let data = await response.json();
            return { success: true, data }; 
        } else {
            let error = await response.json();
            return { success: false, message: error.message }; 
        }

    }catch(err){

        return { success: false, message: "An error occurred while creating the car." };
    }
    
}

function api(path, method = "GET", body = null) {
    const url = "http://localhost:8080/car/" + path;
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'X-Requested-With': 'XMLHttpRequest',
        }
    }
    if (body != null) {
        options.body = JSON.stringify(body);
    }
    
    return fetch(url, options);
}