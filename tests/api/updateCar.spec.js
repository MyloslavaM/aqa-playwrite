import {expect, test} from "@playwright/test";
import axios from "axios";
import {USERS} from "../../src/data/users.js";

test('Edit Car API Test', async () => {

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

    const postResponse = await client.post('/cars', {
        carBrandId: 1,
        carModelId: 1,
        mileage: 122,
    });

    expect(postResponse.data.status).toBe('ok');

    const carIdToUpdate = postResponse.data.data.id;

    const putResponse = await client.put(`/cars/${carIdToUpdate}`, {
        carBrandId: 1,
        carModelId: 1,
        mileage: 168223,
    });

    expect(putResponse.data.status).toBe('ok');

    const updatedResponse = await client.get(`/cars/${carIdToUpdate}`);

    expect(updatedResponse.data.status).toBe('ok');
    console.log(updatedResponse.data.data);

});