import express from "express";
import {searchUsers} from "../controller/search.controller.js";
import { searchBooks } from "../controllers/search.controller.js";
router.get("/search", searchBooks);


const router = express.Router();

// router.get("/",search);

router.get('/', searchUsers);

export default router;