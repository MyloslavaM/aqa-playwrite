import axios from "axios";
import {USERS} from "../../src/data/users.js";
import {expect, test} from "@playwright/test";
import {negativeFixtures} from "./../api/garage/fixtures/createCar.fixtures.js";

test.describe("Cars", () => {
    let client;
    let brands;

    test.beforeAll(async () => {
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

        const response = await client.get('/cars/brands');
        brands = response.data.data;
    });

    test.afterAll(async () => {
        const userCars = await client.get('/cars');
        await Promise.all(
            userCars.data.data.map((car) => client.delete(`/cars/${car.id}`))
        );
    });

    test('Create car', async () => {
        await Promise.all(brands.map(async (brand) => {
            const modelsResponse = await client.get(`/cars/models?carBrandId=${brand.id}`);
            const models = modelsResponse.data.data;

            for (const model of models) {
                const createCarReqBody = {
                    "carBrandId": brand.id,
                    "carModelId": model.id,
                    "mileage": Math.floor(Math.random() * 100)
                };

                const createCarResponse = await client.post('/cars', createCarReqBody);
                expect(createCarResponse.status, "Status code should be valid").toBe(201);
            }
        }));
    });

    test.describe("Negative Cases", () => {
        negativeFixtures.forEach(({ title, inputData, expectedData }) => {
            test(title, async () => {
                for (const brand of brands) {
                    const modelsResponse = await client.get(`/cars/models?carBrandId=${brand.id}`);
                    const models = modelsResponse.data.data;

                    for (const model of models) {
                        const createCarReqBody = {
                            ...inputData,
                        };

                        try {
                            const createCarResponse = await client.post('/cars', createCarReqBody);

                            expect(createCarResponse.status).toBe(201);
                            console.log('Unexpectedly added car:', createCarResponse.data);
                        } catch (error) {
                            if (error.response) {
                                expect(error.response.status).toBe(expectedData.statusCode);
                                expect(error.response.data).toEqual(expectedData.data);
                                console.error('Expected error received:', error.response?.data || error.message);
                            } else {
                                console.error('Unexpected error:', error.message);
                            }
                        }
                    }
                }
            });
        });
    });




});

