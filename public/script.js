function getFormData() {
    const formData = {
        pxid: document.getElementById('pxid').value,
        status: document.getElementById('status').value,
        QueueDate: document.getElementById('queuedate').value,
        type: document.getElementById('type').value,
        isVirtual: document.getElementById('isVirtual').value,
        age: document.getElementById('age').value,
        city: document.getElementById('city').value,
        province: document.getElementById('province').value,
        regionName: document.getElementById('regionName').value,
        Region: document.getElementById('location').value,
    };

    return formData;
}
// Example usage
async function insertToDatabase(data) {
    try {
        const response = await fetch('http://127.0.0.1:6969/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Specify content type as JSON
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to add appointment');
        }

        console.log(response);
    } catch (error) {
        console.error('Error:', error.message);
    }
}
function addAppointment() {
    const data = getFormData();
    console.log(data);
    insertToDatabase(data);
    alert("appointment added")
    // connect to the database
}

// ------------------------------------------EDIT APPOINTMENT---------------------------
function getUpdateFormValues() {
    const appointmentId = document.getElementById('appointmentId').value;
    const pxid = document.getElementById('pxid').value;
    const location = document.getElementById('location').value;
    const status = document.getElementById('status').value;
    const queuedate = document.getElementById('queuedate').value;
    const type = document.getElementById('type').value;
    const isVirtual = document.getElementById('isVirtual').value;
    const age = document.getElementById('age').value;
    const city = document.getElementById('city').value;
    const province = document.getElementById('province').value;
    const regionName = document.getElementById('regionName').value;

    // Do something with the retrieved values, such as sending them in a POST request
    const data = {
        id: appointmentId,
        pxid: pxid,
        Region: location,
        RegionName: regionName,
        Province: province,
        City: city,
        Age: age,
        isVirtual: isVirtual,
        type: type,
        status: status,
        QueueDate: queuedate,
    };
    return data;
}
async function updatePatientByAppointmentId(data) {
    try {
        const response = await fetch('http://127.0.0.1:6969/add', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json', // Specify content type as JSON
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to add appointment');
        }

        console.log(response);
    } catch (error) {
        console.error('Error:', error.message);
    }
}
function updateAppointment() {
    const toUpdateData = getUpdateFormValues();
    console.log(toUpdateData);
    updatePatientByAppointmentId(toUpdateData);
    alert("appointment updated")
}
//------------------------------------ DELETING OF APPOINTMENT-------------------------------------

function deleteAppointment() {
    const appointmentId = document.getElementById('appointmentId').value;

    const data = {
        id: appointmentId,
    };
    deleteAppointmentById(data);
    alert("appointment deleted")
}
async function deleteAppointmentById(data) {
    try {
        const response = await fetch('http://127.0.0.1:6969/add', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json', // Specify content type as JSON
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to add appointment');
        }

        console.log(response);
    } catch (error) {
        console.error('Error:', error.message);
    }
}
