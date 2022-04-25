import {Request, Response, Router} from "express";
import {PrismaClient} from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

/**
 * http://localhost:8999/currencies
 * @get - Get all currencies from the database
 * @post - Create a new currency and save it in the database
 */
router.route('/')
    .get(async (req: Request, res: Response) => {
        try {
            const currencies = await prisma.currency.findMany();
            res.status(200).json(currencies);
        } catch (e) {
            // @ts-ignore
            res.status(500).json({message: e.message});
        }
    })
    .post(async (req: Request, res: Response) => {
        const {name, price} = req.body;
        try {
            const newCurrency = await prisma.currency.create({data: {name, price}});
            res.status(201).json(newCurrency);
        } catch (e) {
            // @ts-ignore
            res.status(500).json({message: e.message});
        }
    })

/**
 * http://localhost:8999/currencies/1
 * @get - Get currency with id 1
 * @put - Update the currency with id 1
 * @delete - Delete the currency with id 1
 */
router.route("/:id")
    .get(async (req: Request, res: Response) => {
        const {id} = req.params;
        try {

            const foundCurrency = await prisma.currency.findFirst({
                where: {id: Number(id)}
            })

            if (!foundCurrency) {
                throw new Error("Currency not found!");
            }

            res.status(200).json(foundCurrency);

        } catch (e) {
            // @ts-ignore
            res.status(404).json({message: e.message})
        }

    })

    .put(async (req: Request, res: Response) => {
        const {id} = req.params;
        const {name, price} = req.body;
        try {

            const updatedCurrency = await prisma.currency.update({
                where: {id: Number(id)},
                data: {
                    name,
                    price,
                }
            })

            res.status(200).json(updatedCurrency);

        } catch (e) {
            // @ts-ignore
            res.status(404).json({message: e.message})
        }

    })
    .delete(async (req: Request, res: Response) => {
        const {id} = req.params;

        try {
            const deletedCurrency = await prisma.currency.delete({
                where: {id: Number(id)}
            })
            res.status(200).json({message: `Currency with id: ${id} successfully deleted!`});
        }catch(e) {
            // @ts-ignore
            res.status(500).json({message: e.message})
        }
    })

export default router;