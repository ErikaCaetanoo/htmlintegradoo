import Atleta from '../models/atleta.js';

export default class AtletaController {

    constructor(caminhoBase = 'atleta/') {

        this.caminhoBase = caminhoBase;

        // Abrir formulário de cadastro
        this.openAdd = (req, res) => {
            res.render(caminhoBase + 'add');
        };


        // Cadastrar atleta
        this.add = async (req, res) => {

            let foto = null;

            if (req.file) {
                foto = req.file.buffer;
            }

            await Atleta.create({
                nome: req.body.nome,
                dataNasc: req.body.dataNasc,
                equipe: req.body.equipe,
                foto: foto
            });

            res.redirect('/atleta/lst');
        };


        // Listar atletas
        this.list = async (req, res) => {

            const resultado = await Atleta.find({});

            res.render(caminhoBase + 'lst', {
                Atletas: resultado
            });
        };


        // Pesquisar atleta
        this.find = async (req, res) => {

            const filtro = req.body.filtro;

            const resultado = await Atleta.find({
                nome: {
                    $regex: filtro,
                    $options: 'i'
                }
            });

            res.render(caminhoBase + 'lst', {
                Atletas: resultado
            });
        };


        // Abrir edição
        this.openEdt = async (req, res) => {

            const atleta = await Atleta.findById(req.params.id);

            res.render(caminhoBase + 'edt', {
                Atleta: atleta
            });
        };


        // Editar atleta
        this.edt = async (req, res) => {

            const dados = {
                nome: req.body.nome,
                dataNasc: req.body.dataNasc,
                equipe: req.body.equipe
            };

            // Só substitui a foto se uma nova foi enviada
            if (req.file) {
                dados.foto = req.file.buffer;
            }

            await Atleta.findByIdAndUpdate(
                req.params.id,
                dados
            );

            res.redirect('/atleta/lst');
        };


        // Excluir atleta
        this.del = async (req, res) => {

            await Atleta.findByIdAndDelete(req.params.id);

            res.redirect('/atleta/lst');
        };
    }
}