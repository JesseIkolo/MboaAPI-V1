const axios = require('axios');

async function testLoginApi() {
    try {
        const response = await axios.post('http://localhost:2103/api/users/login', {
            identifier: 'admin@mboaevents.com',
            password: 'Admin123!@#'
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        console.log('✅ Connexion réussie !');
        console.log('Status:', response.status);
        console.log('Réponse:', JSON.stringify(response.data, null, 2));

    } catch (error) {
        console.log('❌ Erreur de connexion');
        if (error.response) {
            console.log('Status:', error.response.status);
            console.log('Réponse:', error.response.data);
        } else {
            console.log('Erreur:', error.message);
        }
    }
}

testLoginApi(); 