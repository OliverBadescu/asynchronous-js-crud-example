import { getAllCars,createCar,getCarById,deleteCarById,updateCar } from "./service.js";




export function createHomePage(){
    loadCars();
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

export function createAddCarPage() {
    let container = document.querySelector(".container");

    container.innerHTML = `
    <h1>New Car</h1>
    <div class="error-container"></div>
    <div class="create-container">
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

        <div class="buttons-container">
            <button id="submit" disabled>Create New Car</button>
            <button id="cancel">Cancel</button>
        </div>
    </div>
    `;

    const inputs = {
        make: document.querySelector('#make'),
        model: document.querySelector('#model'),
        year: document.querySelector('#year'),
        km: document.querySelector('#km'),
        price: document.querySelector('#price'),
    };

    const btnSubmit = document.querySelector('#submit');
    const errorContainer = document.querySelector('.error-container');
    const cancelBtn = document.querySelector('#cancel');

    for (const key in inputs) {
        inputs[key].addEventListener('input', () => {
            updateErrors(inputs, errorContainer, btnSubmit);
        });
    }

    btnSubmit.addEventListener('click', async () => {
        const car = {
            marca: inputs.make.value,
            model: inputs.model.value,
            an: inputs.year.value,
            km: inputs.km.value,
            pret: inputs.price.value,
            uzata: document.querySelector('#used').value === "true",
        };

        const result = await createCar(car);
        if (result.success) {
            alert("Car created successfully!");
            createHomePage();
        } else {
            alert("Failed to create car. A car with this make and model already exists.");
        }
    });

    cancelBtn.addEventListener('click', createHomePage);

    updateErrors(inputs, errorContainer, btnSubmit);
}

function updateErrors(inputs, errorContainer, btnSubmit) {
    const errors = validateInputs(inputs);
    renderErrors(errors, errorContainer);
    btnSubmit.disabled = errors.length > 0;
}

function validateInputs(inputs) {
    const errors = [];
    if (inputs.make.value.trim() === '') errors.push('Make is invalid');
    if (inputs.model.value.trim() === '') errors.push('Model is invalid');
    if (inputs.year.value <= 0) errors.push('Year is invalid');
    if (inputs.km.value <= 0) errors.push('Km is invalid');
    if (inputs.price.value <= 0) errors.push('Price is invalid');
    return errors;
}

function renderErrors(errors, errorContainer) {
    errorContainer.innerHTML = errors
        .map((err) => `<p class="error-message">${err}</p>`)
        .join('');
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
            <label for="model">Model</label>
            <input name="model" type="text" id="model" value=${car.model}>
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


    update.addEventListener('click', () =>{

        const make = document.querySelector('#make');
        const model =document.querySelector('#model');
        const year = document.querySelector('#year');
        const km = document.querySelector('#km');
        const price = document.querySelector('#price');
        const used = document.querySelector('#used');

        const carResponse = {

            marca: make.value,
            model: model.value,
            km: km.value, 
            uzata: used.value,
            pret: price.value,
            an: year.value
        };

        updateCar(carResponse, car.id);

        console.log(carResponse);

        alert("Car update sucessfully");
        createHomePage();

    });


    let deleteBtn = document.querySelector('#delete');

    deleteBtn.addEventListener('click', () =>{

        deleteCarById(car.id);
        alert("Car deleted succesfully!");
        createHomePage();
    })

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

function isValid(){
    let err=[];

    let make = document.querySelector('#make');
    let model = document.querySelector('#model');
    let year = document.querySelector('#year');
    let km = document.querySelector('#km');
    let price = document.querySelector('#price');


if( make.value === ''){
    err.push("Make invalid");
} 
if(model.value ===''){
    err.push("Model invalid");
}
if(year.value <= 0){
    err.push("Year invalid");
}
if(km.value <0){
    err.push("Km invalid");
}
if(price.value <= 0){
    err.push("Price invalid");
}

return err;
    

}