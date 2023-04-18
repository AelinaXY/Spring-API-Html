"use strict";

(function() {
    const output = document.getElementById("output");

    const address = "http://localhost:8080";

    async function getPeople() {
        try {
            output.innerHTML = "";
            const res = await axios.get(`${address}/getAll`);
            console.log(res);
            res.data.forEach(person => renderPerson(person));
        } catch (e) {
            console.error(e);
        }
    }

    function renderPerson({fullName, oldNess, occupation, id}) {
        const person = document.createElement("div");
        person.classList.add("col");
        const personCard = document.createElement("div");
        personCard.classList.add("card");

        const personBody = document.createElement("div");
        personBody.classList.add("card-body");

        const personName = document.createElement("p");
        personName.innerText = `Name: ${fullName}`;
        personName.classList.add("card-text");
        personBody.appendChild(personName);

        const personId = document.createElement("p");
        personId.innerText = `Id: ${id}`;
        personId.classList.add("card-text");
        personBody.appendChild(personId);

        const personAge = document.createElement("p");
        personAge.innerText = `Age: ${oldNess}`;
        personAge.classList.add("card-text");
        personBody.appendChild(personAge);

        const personOccupation = document.createElement("p");
        personOccupation.innerText = `Occupation: ${occupation}`;
        personOccupation.classList.add("card-text");
        personBody.appendChild(personOccupation);

        const updateBtn = document.createElement("button");
        updateBtn.innerText = "UPDATE";
        updateBtn.classList.add("btn", "btn-primary");
        updateBtn.setAttribute("data-bs-toggle","modal");
        updateBtn.setAttribute("data-bs-target","#updateModal");
        updateBtn.addEventListener('click', () => updatePerson(id));
        personBody.appendChild(updateBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = 'DELETE';
        deleteBtn.classList.add("btn", "btn-danger");
        deleteBtn.addEventListener('click', () => deletePerson(id));
        personBody.appendChild(deleteBtn);
        
        personCard.appendChild(personBody);
        person.appendChild(personCard);

        output.appendChild(person);
    }

    async function deletePerson(id) {
        const res = await axios.delete(`${address}/remove/${id}`);
        getPeople();
    }

    document.getElementById("personForm").addEventListener("submit", async function(e) {
        e.preventDefault();
        const {fullName, oldNess, occupation,} = this;
        
        const newPerson = {
            fullName: fullName.value,
            oldNess: oldNess.value,
            occupation: occupation.value,
            notNiNumber: ""
        }
        this.reset();
        fullName.focus();
        try {
            const res = await axios.post(`${address}/create`, newPerson);
            getPeople();
        } catch(error) {
            console.error(error);
        }
    });

    document.getElementById("updateForm").addEventListener("submit", async function(e) {
        e.preventDefault();
        const {fullName, oldNess, occupation} = this;

        const id = document.getElementById("modalIdLabel").innerHTML;
        this.reset;
        try {
            const res = await axios.patch(`${address}/update/${id}?age=${oldNess.value}&name=${fullName.value}&job=${occupation.value}`);
            getPeople();
        } catch(error) {
            console.error(error);
        }
    });

    function updatePerson(id)
    {
        document.getElementById("modalIdLabel").innerHTML = id;
    }

    getPeople();
    
})();