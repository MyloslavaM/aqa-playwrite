import { expect, request } from "@playwright/test";
import { test } from "../src/fixtures/myFixture";
import GaragePage from "../src/pageObjects/garagePage/GaragePage";
import {runInNewContext} from "node:vm";
import {STORAGE_STATET_USER_PATH} from "../src/data/constants/storageState.js";

test.describe("User", () => {
    test("User can create car", async ({userGaragePageWithStorage}) => {
        const popup = await userGaragePageWithStorage.openAddCarPopup();
        await popup.fillAndSubmit("Porsche", "Cayenne", "212");
        const {page} = userGaragePageWithStorage;

        const element = page.locator("p", {hasText: "Porsche Cayenne"});
        expect(await element.isVisible());

        await userGaragePageWithStorage.deleteFirstCarFromList();
    });
    test('should be able to create a car  (event listener)', async ({userGaragePageWithStorage}) => {
        const {page} = userGaragePageWithStorage
        page.on('request', (request) => {
            console.log(request.url())
        })

        page.on('request', (request) => {
            console.log(request.url())
        })
        page.on('response', async (response) => {
            try {
                const jsonResponse = await response.json();
                console.log(JSON.stringify(jsonResponse, null, 2));
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        });

        const popup = await userGaragePageWithStorage.openAddCarPopup()
        await popup.fillAndSubmit("BMW", "X6", 12)

        const element = await page.locator('p:has-text("BMW X6")').first();
        await expect(element).toBeVisible();
    });


    test('should be able to create a car (intercept request)', async ({userGaragePageWithStorage}) => {
        const {page} = userGaragePageWithStorage

        await page.route('/api/cars/*', async (route) => {
            if (route.request().url().includes('brands')) {
                const headers = route.request().headers()
                headers["Accept-Encoding"] = "Identity"

                const response = await route.fetch()
                console.log(await response.json())

                await route.continue({headers})
                return
            }
            await route.continue()
        })

        page.on('response', (response) => console.log(response.request().url(), response.request().headers()))

        const popup = await userGaragePageWithStorage.openAddCarPopup()
        await popup.fillAndSubmit("BMW", "X6", 12)

        await expect(page.locator('p', {hasText: `BMW X6`}).first()).toBeVisible()
        await page.pause()
    })

    test('should be able to create a car (modify response)', async ({userGaragePageWithStorage}) => {
        const {page} = userGaragePageWithStorage
        const body = {
            "status": "ok",
            "data": [
                {
                    "id": 1,
                    "title": "Audi Audi Audi Audi AudiAudi  Audi Audi Audi Audi",
                    "logo_filename": "audi.png"
                },
                {
                    "id": 2,
                    "title": "Renault",
                    "logoFilename": "bmw.png"
                },
            ]
        }
        await page.route('/api/cars/brands', async (route) => {
            await route.fulfill({body: JSON.stringify(body)})
        })
        // await page.pause()
        // page.on('console', (data)=> {
        //     console.log( "Console event has happened: ",data.text())
        //     if (data.type() === "error"){
        //         throw new Error("I have broken your FE!!! ahahahah")
        //     }
        // })
        const popup = await userGaragePageWithStorage.openAddCarPopup()
        await popup.fillAndSubmit("BMW", "X6", 12)

        await expect(page.locator('p', {hasText: `BMW X6`}).first()).toBeVisible()
    })
    test('should visit', async ({ profilePage }) => {
        profilePage.page.on('request', (request) => {
            console.log(`Request URL: ${request.url()}`);
        });

        await profilePage.visit();

        const editClick = await profilePage.editProfilePage()
        await editClick.click()

    });

    test.describe('User', () => {

        test.afterAll(async() =>{
            const client = await request.newContext({
                storageState: STORAGE_STATET_USER_PATH
            })
            const userCars = await client.get('/api/cars')
            const body = await userCars.json()
            await Promise.all(
                body.data.map((car)=> client.delete(`/api/cars/${car.id}`))
            )
        })
        test('API should return valid brands', async ({userGaragePageWithStorage}) => {
            const popup = await userGaragePageWithStorage.openAddCarPopup()
            await popup.fillAndSubmit("BMW", "X6", 12)

            const {page} = userGaragePageWithStorage

            const brandRespose = await page.request.get('/api/cars/brands')
            const body = await brandRespose.json()
            expect(body).toEqual({
                "status": "ok",
                "data": [
                    {
                        "id": 1,
                        "title": "Audi",
                        "logoFilename": "audi.png"
                    },
                    {
                        "id": 2,
                        "title": "BMW",
                        "logoFilename": "bmw.png"
                    },
                    {
                        "id": 3,
                        "title": "Ford",
                        "logoFilename": "ford.png"
                    },
                    {
                        "id": 4,
                        "title": "Porsche",
                        "logoFilename": "porsche.png"
                    },
                    {
                        "id": 5,
                        "title": "Fiat",
                        "logoFilename": "fiat.png"
                    }
                ]
            })
        })

        test('API should return user\s cars', async ({userGaragePageWithStorage})=>{
            const {page} = userGaragePageWithStorage

            const userCars = await page.request.get('/api/cars')
            const body = await userCars.json()
            expect(body.status).toBe("ok")
        })

        test('API should NOT return user\s cars', async ({userGaragePageWithStorage})=>{
            const popup = await userGaragePageWithStorage.openAddCarPopup()
            await popup.fillAndSubmit("BMW", "X6", 12)

            const client = await request.newContext()
            const brandsResponce = await client.get('/api/cars')
            const body = await brandsResponce.json()
            expect(body.status).toBe("error")
        })

        test('Visit and Edit Profile Page', async ({profilePage})=> {
            const {page} = profilePage

            const editClick = await profilePage.editProfilePage()
            await editClick.click()
        })
    })
})
