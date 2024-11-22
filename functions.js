import { getAllCars,createCar,getCarById,deleteCarById } from "./service.js";




export function createHomePage(){

    let container=document.querySelector(".container");

    container.innerHTML=`
    
    
    
    <h1>Cars</h1>
	<button class="add-car">Create New Car</button>
	<table>
		<thead>
			<tr>
				<th>Make</th>
				<th>Model</th>
				<th>Year</th>
                <th>Km</th>
                <th>Price</th>
                <th>Used</th>
			</tr>
		</thead>
		<tbody  class="table-body">

            
			
        </tbody>
	</table>
    
    `


    loadCars();


    let btnAdd = document.querySelector('.add-car');

    btnAdd.addEventListener('click', () =>{

        createAddCarPage();
    });

    let tbody = document.querySelector('.table-body');

    tbody.addEventListener('click', async (event) =>{
        let car = event.target;

        if(car.tagName == "A"){

            const carId = car.getAttribute("data-id"); 
            const carData = await getCar(carId); 
            if (carData) {
                createUpdateDeletePage(carData); 
            } else {
                 alert("Failed to load car details");
            }
        
        }
    })


}

export function createAddCarPage(){

    let container = document.querySelector(".container");

    container.innerHTML = `
    <h1>New Car</h1>
    <div class = "create-container">
        <p>
            <label for="make">Make</label>
            <input name="make" type="text" id="make">
        </p>
        <p>
            <label for="model">Model</label>
            <input name="model" type="text" id="model">
        </p>
        <p>
            <label for="year">Year</label>
            <input name="year" type="number" id="year">
        </p>
        <p>
            <label for="km">Km</label>
            <input name="km" type="number" id="km">
        </p>
        <p>
            <label for="price">Price</label>
            <input name="price" type="number" id="price">
        </p>
        <p>
            <label for="used">Used</label>
            <select name="used" id="used">
                <option value="true">Yes</option>
                <option value="false">No</option>
            </select>
        </p>

        <div class = "buttons-container">
            <button id="submit">Create New Car</button>
            <button id="cancel">Cancel</button>
        </div>
    </div>

    `

    let make = document.querySelector('#make');
    let model = document.querySelector('#model');
    let year = document.querySelector('#year');
    let km = document.querySelector('#km');
    let price = document.querySelector('#price');
    let used = document.querySelector('#used');


    let btnSubmit = document.querySelector('#submit');

    let cancel = document.querySelector('#cancel');

    btnSubmit.addEventListener('click', async() =>{

        if(make.value === ''&& model.value === ''){
                attachErrorMessage();
            }

        const car={
            marca: make.value,
            model: model.value,
            an: year.value,
            km: km.value,
            pret: price.value,
            uzata: used.value === "true",
        };



        const result = await createCar(car);

        if (result.success) {
            alert("Car created successfully!");
            removeErrorMessage();
            make.value = '';
            model.value = '';
            year.value = '';
            km.value = '';
            price.value = '';
            used.value= '';
        } else {
            alert(`Failed to create car, car with this make and model already exists`);
        }
        
    });


    cancel.addEventListener('click', () =>{

        createHomePage();
    });



}

export function createUpdateDeletePage(car){


    let container = document.querySelector(".container");

    container.innerHTML = `
    
    <h1>Update Car</h1>
    <div class = "update-container">
        <p>
            <label for="make">Make</label>
            <input name="make" type="text" id="make" value=${car.marca}>
        </p>
        <p>
            <label for="author">Model</label>
            <input name="author" type="text" id="author" value=${car.model}>
        </p>
        <p>
            <label for="year">Year</label>
            <input name="year" type="text" id="year" value=${car.an}>
        </p>
        <p>
            <label for="km">Km</label>
            <input name="km" type="text" id="km" value=${car.km}>
        </p>
        <p>
            <label for="price">Price</label>
            <input name="price" type="text" id="price" value=${car.pret}>
        </p>
        <p>
            <label for="used">Used</label>
            <input name="used" type="text" id="used" value=${car.uzata}>
        </p>
        <div class = "buttons-container">
        <button id="update-car">Update Car</button>
        <button id="cancel">Cancel</button>
        <button id="delete">Delete Car</button>
        </div>
    </div>

    `

    let cancel = document.querySelector('#cancel');

    cancel.addEventListener('click', () =>{

        createHomePage();
    });

    let update = document.querySelector('#update-car');




    let deleteBtn = document.querySelector('#delete');

    deleteBtn.addEventListener('click', () =>{

        deleteCarById(car.id);
        createHomePage();
    })

}

function createErrorMessage(){

    const message = document.createElement("div");
    message.classList.add("error-message");

    message.innerHTML = `
    
    <h2 class="error">Oooops!</h2>
        <ul class="error">
            <li>Make is required</li>
            <li>Model is required</li>
        </ul>
    `

    return message;

}

function attachErrorMessage(){
    let createBody = document.querySelector(".create-container");
    let firstElem= createBody.firstElementChild;

    createBody.insertBefore(createErrorMessage(),firstElem);
}

function removeErrorMessage(){
    let createBody = document.querySelector(".create-container");
    let errorMessage = createBody.querySelector(".error-message"); 

    if (errorMessage) {
        createBody.removeChild(errorMessage); 
    }
}

function createCard(car) {
    const tr = document.createElement("tr");


    tr.innerHTML = `
        <td><a href="#" data-id="${car.id}" class="car-link">${car.marca}</a></td>
        <td>${car.model}</td>
        <td>${car.an}</td>
        <td>${car.km}</td>
        <td>${car.pret}</td>
        <td>${car.uzata}</td>
    `;


    return tr;
}


function attachCards(cars){
    let tbody=document.querySelector(".table-body");
    cars.map(car=>createCard(car)).forEach(element => {
        tbody.appendChild(element);
    })
}

async function getCar(carId) {
    
    try{
        let carData = await getCarById(carId); 
        return carData;
    }catch(err){
    console.log(err);
    }
}

async function loadCars(){
    try{
        let cars= await getAllCars();
        attachCards(cars);
    }catch(err){
        console.log(err);
    }
    
}

