const BASE_URL = "http://localhost:8080";

(function () {

    function displayOutput(element, {data}) {
        document.getElementById(element).innerText = JSON.stringify(data, undefined, 2);
    }

    document.getElementById('createButton').addEventListener('click', function () {
        let data = {};
        document.querySelectorAll('#create > input').forEach(el => data[el.name] = el.value);
        console.log(data);
    
        axios.post(BASE_URL + '/create', data)
            .then(res => displayOutput("createOutput", res)
            ).catch(err => console.error(err));
    });

    document.getElementById('readButton').addEventListener('click', function () {
        axios.get(BASE_URL + '/getAll')
            .then(res =>
                document.getElementById('readOutput').innerText = JSON.stringify(res.data)
            ).catch(err => console.error(err));
    });

    document.getElementById('readButtonId').addEventListener('click', function () {
        axios.get(BASE_URL + `/get/${document.getElementById('updateId').value}`)
            .then(res =>
                document.getElementById('readOutputId').innerText = JSON.stringify(res.data)
            ).catch(err => console.error(err));
    });

    document.getElementById('updateButton').addEventListener('click', function () {
        let data = {};
        document.querySelectorAll('#update > input').forEach(el => data[el.name] = el.value);

        console.log(data);
        axios.patch(BASE_URL + `/update/${data.id}?age=${data.oldNess}&name=${data.name}&job=${data.job}`)
            .then(res => displayOutput("updateOutput", res)
            ).catch(err => console.error(err));
    });

    document.getElementById('deleteButton').addEventListener('click', function () {
        axios.delete(`${BASE_URL}/remove/${document.getElementById('deleteInput').value}`)
            .then(res =>
                displayOutput("deleteOutput", res)
            ).catch(err => console.error(err));
    });
})()
