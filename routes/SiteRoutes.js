import express from 'express';
const router = express.Router();
//Busca o AlunoController
import SiteController from '../controllers/SiteController.js'
const controle = new SiteController();

const caminhobase = 'site/'

router.get('/site', controle.home)
router.get('/site/index.html', controle.home)
router.get('/site/campeonato.html', controle.campeonato)
router.get('/site/login.html', controle.login)
router.get('/site/inscricao.html', controle.inscricao)
router.get('/site/sucesso.html', controle.sucesso)

router.get('/' + caminhobase, controle.home)
router.get('/' + caminhobase + 'login', controle.login)
router.get('/' + caminhobase + 'campeonato', controle.campeonato)
router.get('/' + caminhobase + 'inscricao', controle.inscricao)
router.get('/' + caminhobase + 'sucesso', controle.sucesso)

// Compatibilidade com os links estáticos das páginas públicas
router.get('/index.html', controle.home)
router.get('/login.html', controle.login)
router.get('/campeonato.html', controle.campeonato)
router.get('/inscricao.html', controle.inscricao)
router.get('/sucesso.html', controle.sucesso)

export default router