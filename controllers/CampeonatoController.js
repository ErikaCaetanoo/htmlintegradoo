import Campeonato from '../models/campeonato.js';
import Atleta from '../models/atleta.js';

export default class CampeonatoController {

    constructor(caminhoBase = 'campeonato/') {

        this.caminhoBase = caminhoBase;

        // Abrir formulário de cadastro
        this.openAdd = async (req, res) => {

            const categorias = [
                'Infantil',
                'Infantojuvenil',
                'Juvenil',
                'Adulto',
                'Master'
            ];

            const atletas = await Atleta.find({});

            res.render(caminhoBase + 'add', {
                categorias,
                atletas
            });
        };


        // Cadastrar campeonato
        this.add = async (req, res) => {

            await Campeonato.create({
                nomeEve: req.body.nomeEve,
                cidade: req.body.cidade,
                dataEve: req.body.dataEve,
                organizador: req.body.organizador,
                categorias: req.body.categorias,
                atletas: req.body.atletas || []
            });

            res.redirect('/campeonato/lst');
        };


        // Listar campeonatos
        this.list = async (req, res) => {

            const resultado = await Campeonato
                .find({})
                .populate('atletas');

            res.render(caminhoBase + 'lst', {
                Campeonatos: resultado
            });
        };


        // Pesquisar campeonato
        this.find = async (req, res) => {

            const filtro = req.body.filtro;

            const resultado = await Campeonato
                .find({
                    nomeEve: {
                        $regex: filtro,
                        $options: 'i'
                    }
                })
                .populate('atletas');

            res.render(caminhoBase + 'lst', {
                Campeonatos: resultado
            });
        };


        // Abrir edição
        this.openEdt = async (req, res) => {

            const id = req.params.id;

            const campeonato = await Campeonato.findById(id);

            const categorias = [
                'Infantil',
                'Infantojuvenil',
                'Juvenil',
                'Adulto',
                'Master'
            ];

            const atletas = await Atleta.find({});

            res.render(caminhoBase + 'edt', {
                Campeonato: campeonato,
                categorias,
                atletas
            });
        };


        // Editar campeonato
        this.edt = async (req, res) => {

            const id = req.params.id;

            await Campeonato.findByIdAndUpdate(id, {
                nomeEve: req.body.nomeEve,
                cidade: req.body.cidade,
                dataEve: req.body.dataEve,
                organizador: req.body.organizador,
                categorias: req.body.categorias,
                atletas: req.body.atletas || []
            });

            res.redirect('/campeonato/lst');
        };


        // Excluir campeonato
        this.del = async (req, res) => {

            await Campeonato.findByIdAndDelete(req.params.id);

            res.redirect('/campeonato/lst');
        };
    }
}