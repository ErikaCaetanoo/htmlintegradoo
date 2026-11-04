import express from 'express';
import multer from 'multer';

const router = express.Router();

import AtletaController from '../controllers/AtletaController.js';

const controle = new AtletaController();

const caminhoBase = 'atleta/';

const upload = multer({
    storage: multer.memoryStorage()
});

router.get(
    '/' + caminhoBase + 'add',
    controle.openAdd
);

router.post(
    '/' + caminhoBase + 'add',
    upload.single('foto'),
    controle.add
);

router.get(
    '/' + caminhoBase + 'lst',
    controle.list
);

router.post(
    '/' + caminhoBase + 'lst',
    controle.find
);

router.get(
    '/' + caminhoBase + 'edt/:id',
    controle.openEdt
);

router.post(
    '/' + caminhoBase + 'edt/:id',
    upload.single('foto'),
    controle.edt
);

router.get(
    '/' + caminhoBase + 'del/:id',
    controle.del
);

export default router;