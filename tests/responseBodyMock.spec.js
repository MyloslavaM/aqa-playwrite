import { expect, request } from "@playwright/test";
import { test } from "../src/fixtures/myFixture";
import {USERS} from '../src/data/users.js'

test.describe("User", () => {
    test('should visit', async ({profilePage}) => {
        profilePage.page.on('request', (request) => {
            console.log(`Request URL: ${request.url()}`);
        });
        await profilePage.visit();
        await page.route('/api/cars/brands', async (route) => {
            await route.fulfill({body: JSON.stringify(body)})

        })

    });

    test('should be able to modify user data (modify response)', async ({profilePage}) => {
        const body = {
            "status": "ok",
            "data": {
                "userId": 36606,
                "photoFilename": "default-user.png",
                "name": "Malina la la la",
                "lastName": "Martynova"
            },

        }
        await profilePage.page.route('/api/users/profile', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                json: body,
            });

            console.log('Modified API response:', JSON.stringify(body));
        });
        await profilePage.page.reload();
        const profilePageSelector = '.profile_name';
        await profilePage.page.waitForSelector(profilePageSelector)
        const userData = await profilePage.page.textContent(profilePageSelector);

        await expect(profilePage.page.getByText('Malina la la la')).toBeVisible();

    })

    test('should be able to create a car with specific body', async ({userGaragePageWithStorage}) => {

        const {page} = userGaragePageWithStorage
        const addCarData = {
            carBrandId: 1,
            carModelId: 1,
            mileage: 122
        };

        const response = await page.request.post('/api/cars', {
                data: addCarData,
            });

            const responseData = await response.json();

            expect(response.ok()).toBe(true);
            expect(responseData.data).toHaveProperty('id');

            console.log('Car created successfully:', responseData);
            // Add additional assertions if needed
        })

    test('Negative scenario 1 - Missing required data', async ({ userGaragePageWithStorage }) => {
        const {page} = userGaragePageWithStorage
        const addCarData = {
            "carBrandId": 1,
            "carModelId": 1888,
            "mileage": 122
        };

        const response = await page.request.post('/api/cars', {
            data: addCarData,
        });
        const responseData = await response.json();
            expect(response.ok()).toBe(false);


    });

    test('Negative scenario 2 - Unauthorized request', async ({ page }) => {
        const addCarData = {
            carBrandId: 1,
            carModelId: 1,
            mileage: 122
        };


        const response = await page.request.post('/api/cars', {
            data: addCarData,
        });
        const responseData = await response.json();
        expect(response.ok()).toBe(false);

    });
})



