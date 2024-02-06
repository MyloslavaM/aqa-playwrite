import {USERS} from "../../src/data/users.js";
import {expect, test} from "@playwright/test";
import {negativeFixtures} from "./../api/garage/fixtures/createCar.fixtures.js";
import APIClient from '../../src/client/APIClient.js'

test.describe("Cars", () => {
    let apiClient;
    let brands;

    test.beforeAll(async () => {

        apiClient = await APIClient.authenticate(USERS.MILA_M.email, USERS.MILA_M.password);

        const response = await apiClient.carController.getBrands();
        brands = response.data.data;
    });

    test.afterAll(async () => {
        const userCars = await apiClient.carController.getUserCars();
        await Promise.all(
            userCars.data.data.map((car) => apiClient.carController.deleteCarById(car.id))
        );
    });

    test('Create car', async () => {
        await Promise.all(brands.map(async (brand) => {
            const modelsResponse = await apiClient.carController.getModelsByBrandId(brand.id);
            const models = modelsResponse.data.data;

            for (const model of models) {
                const createCarReqBody = {
                    "carBrandId": brand.id,
                    "carModelId": model.id,
                    "mileage": Math.floor(Math.random() * 100)
                };
                const createCarResponse = await apiClient.carController.createCar(createCarReqBody);
                console.log(createCarResponse.data.data)
                expect(createCarResponse.status, "Status code should be valid").toBe(201);

            }
        }));
    });

    test.describe("Negative Case Mileage is required", () => {
        const mileageMissingFixture = negativeFixtures.find(fixture => fixture.title === "should return error message when mileage is missing");

        test(mileageMissingFixture.title, async () => {
            for (const brand of brands) {
                const modelsResponse = await apiClient.carController.getModelsByBrandId(brand.id);
                const models = modelsResponse.data.data;

                for (const model of models) {
                    const createCarReqBody = {
                        "carBrandId": brand.id,
                        "carModelId": model.id,
                    };

                    const createCarResponse = await apiClient.carController.createCar(createCarReqBody);
                    expect(createCarResponse.status, "Status code should be valid").toBe(mileageMissingFixture.expectedData.statusCode);
                    expect(createCarResponse.data, "Response body should be valid").toEqual(mileageMissingFixture.expectedData.data);
                    expect(createCarResponse.data.message).toEqual('Mileage is required');
                }
            }
        });
    });

    test.describe("Negative Case brandId is missing", () => {
        const brandIdMissingFixture = negativeFixtures.find(fixture => fixture.title === "should return error message when brandId is missing");

        test(brandIdMissingFixture.title, async () => {
            for (const brand of brands) {
                const modelsResponse = await apiClient.carController.getModelsByBrandId(brand.id);
                const models = modelsResponse.data.data;

                for (const model of models) {
                    const createCarReqBody = {
                        "carModelId": model.id,
                        "mileage": Math.floor(Math.random() * 100),
                    };

                    const createCarResponse = await apiClient.carController.createCar(createCarReqBody);
                    expect(createCarResponse.status, "Status code should be valid").toBe(brandIdMissingFixture.expectedData.statusCode);
                    expect(createCarResponse.data, "Response body should be valid").toEqual(brandIdMissingFixture.expectedData.data);
                    expect(createCarResponse.data.message).toEqual('Car brand id is required');
                }
            }
        });
    });

    test.describe("Negative Case modelId is missing", () => {
        const modelIdMissingFixture = negativeFixtures.find(fixture => fixture.title === "should return error message when modelId is missing");

        test(modelIdMissingFixture.title, async () => {
            for (const brand of brands) {
                const modelsResponse = await apiClient.carController.getModelsByBrandId(brand.id);
                const models = modelsResponse.data.data;

                for (const model of models) {
                    const createCarReqBody = {
                        "carBrandId": brand.id,
                        "mileage": Math.floor(Math.random() * 100),
                    };

                    const createCarResponse = await apiClient.carController.createCar(createCarReqBody);
                    expect(createCarResponse.status, "Status code should be valid").toBe(modelIdMissingFixture.expectedData.statusCode);
                    expect(createCarResponse.data, "Response body should be valid").toEqual(modelIdMissingFixture.expectedData.data);
                    expect(createCarResponse.data.message).toEqual('Car model id is required');
                }
            }
        });
    });

    test.describe("Negative Case brandId is not a number", () => {
        const brandIdNotANumberFixture = negativeFixtures.find(fixture => fixture.title === "should return error message when brandId is not a number");

        test(brandIdNotANumberFixture.title, async () => {
            for (const brand of brands) {
                const modelsResponse = await apiClient.carController.getModelsByBrandId(brand.id);
                const models = modelsResponse.data.data;

                for (const model of models) {
                    const createCarReqBody = {
                        "carBrandId": "invalid",
                        "carModelId": model.id,
                        "mileage": Math.floor(Math.random() * 100),
                    };

                    const createCarResponse = await apiClient.carController.createCar(createCarReqBody);
                    expect(createCarResponse.status, "Status code should be valid").toBe(brandIdNotANumberFixture.expectedData.statusCode);
                    expect(createCarResponse.data, "Response body should be valid").toEqual(brandIdNotANumberFixture.expectedData.data);
                    expect(createCarResponse.data.message).toEqual('Invalid car brand type');
                }
            }
        });
    });

    test.describe("Negative Case modelId is not a number", () => {
        const modelIdNotANumberFixture = negativeFixtures.find(fixture => fixture.title === "should return error message when modelId is not a number");

        test(modelIdNotANumberFixture.title, async () => {
            for (const brand of brands) {
                const modelsResponse = await apiClient.carController.getModelsByBrandId(brand.id);
                const models = modelsResponse.data.data;

                for (const model of models) {
                    const createCarReqBody = {
                        "carBrandId": brand.id,

                        "carModelId": "invalid",
                        "mileage": Math.floor(Math.random() * 100),
                    };

                    const createCarResponse = await apiClient.carController.createCar(createCarReqBody);
                    expect(createCarResponse.status, "Status code should be valid").toBe(modelIdNotANumberFixture.expectedData.statusCode);
                    expect(createCarResponse.data, "Response body should be valid").toEqual(modelIdNotANumberFixture.expectedData.data);
                    expect(createCarResponse.data.message).toEqual('Invalid car model type');
                }
            }
        });
    });

});

