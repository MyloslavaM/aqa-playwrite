import { expect, test } from "@playwright/test";
import APIClient from "../../src/client/APIClient.js";
import { USERS } from "../../src/data/users.js";

test('Edit Car API Test', async () => {

    const apiClient = await APIClient.authenticate(USERS.MILA_M.email, USERS.MILA_M.password);

    const postResponse = await apiClient.carController.createCar({
        carBrandId: 1,
        carModelId: 1,
        mileage: 122,
    });

    expect(postResponse.data.status).toBe('ok');

    const carIdToUpdate = postResponse.data.data.id;

    const putResponse = await apiClient.carController.updateCarById(carIdToUpdate, {
        carBrandId: 1,
        carModelId: 1,
        mileage: 168223,
    });

    expect(putResponse.data.status).toBe('ok');

    const updatedResponse = await apiClient.carController.getUserCarById(carIdToUpdate);

    expect(updatedResponse.data.status).toBe('ok');
    console.log(updatedResponse.data.data);
});
