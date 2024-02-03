import {expect, test} from "@playwright/test";
import axios from "axios";
import {USERS} from "../../src/data/users.js";

test('Delete Car API Test', async () => {

    let client;

    client = axios.create({
        baseURL: 'https://qauto.forstudy.space/api'
    });

    const signInResponse = await client.post('/auth/signin', {
        "email": USERS.MILA_M.email,
        "password": USERS.MILA_M.password,
        "remember": false
    });

    const cookie = signInResponse.headers["set-cookie"][0].split(';')[0];
    client = axios.create({
        baseURL: 'https://qauto.forstudy.space/api',
        headers: {
            cookie,
        }
    });

    const initialResponse = await client.get('/cars');
    expect(initialResponse.data.status).toBe('ok');

    for (const car of initialResponse.data.data) {
        const deleteResponse = await client.delete(`/cars/${car.id}`);
        expect(deleteResponse.data.status).toBe('ok');
    }

    const finalResponse = await client.get('/cars');
    expect(finalResponse.data.status).toBe('ok');
    expect(finalResponse.data.data).toHaveLength(0);
    console.log(finalResponse.data)
});

