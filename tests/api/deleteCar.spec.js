import { expect, test } from "@playwright/test";
import APIClient from "../../src/client/APIClient.js";
import { USERS } from "../../src/data/users.js";

test('Delete Car API Test', async () => {
    const apiClient = await APIClient.authenticate(USERS.MILA_M.email, USERS.MILA_M.password);

    const initialResponse = await apiClient.carController.getUserCars();
    expect(initialResponse.data.status).toBe('ok');

    for (const car of initialResponse.data.data) {
        const deleteResponse = await apiClient.carController.deleteCarById(car.id);
        expect(deleteResponse.data.status).toBe('ok');
    }

    const finalResponse = await apiClient.carController.getUserCars();
    expect(finalResponse.data.status).toBe('ok');
    expect(finalResponse.data.data).toHaveLength(0);
    console.log(finalResponse.data);
});