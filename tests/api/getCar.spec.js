import { expect, test } from "@playwright/test";
import APIClient from "../../src/client/APIClient.js";
import { USERS } from "../../src/data/users.js";

test('Create and GET Car API Test', async () => {
    const apiClient = await APIClient.authenticate(USERS.MILA_M.email, USERS.MILA_M.password);

    const postResponse = await apiClient.carController.createCar({
        carBrandId: 1,
        carModelId: 1,
        mileage: 122,
    });

    expect(postResponse.data.status).toBe('ok');

    const updatedResponse = await apiClient.carController.getUserCars();

    expect(updatedResponse.data.status).toBe('ok');

    const carId = postResponse.data.data.id;

    const specificCarResponse = await apiClient.carController.getUserCarById(carId);

    expect(specificCarResponse.data.status).toBe('ok');
    console.log(specificCarResponse.data.data);
});