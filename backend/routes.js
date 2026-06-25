import express from "express"
import potionController from "./controller/potion.js"

const router = express.Router()

router.get("/potions", potionController.getPotions)
router.get("/potion/:id", potionController.getPotionById)
router.post("/create-potion", potionController.createPotion)
router.delete("/delete-potion/:id", potionController.deletePotion)
router.put("/update-potion/:id", potionController.updatePotion)

export default router