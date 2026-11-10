import Campeonato from '../models/campeonato.js';
import Atleta from '../models/atleta.js';

export default class SiteController {
 
    constructor() {
        this.home = async (req, res) => {
          const campeonatos = await Campeonato
            .find({})
            .sort({ dataEve: 1 })
            .limit(50);

          res.render('site/index', { campeonatos });
        };

        this.login = (req, res) => {
          res.render('site/login');
        };

        this.campeonato = async (req, res) => {
          let campeonato;

          if (req.params.id) {
            campeonato = await Campeonato
              .findById(req.params.id)
              .populate('atletas');
          } else {
            campeonato = await Campeonato
              .findOne({ 'atletas.0': { $exists: true } })
              .sort({ dataEve: 1 })
              .populate('atletas');

            if (!campeonato) {
              campeonato = await Campeonato
                .findOne({})
                .sort({ dataEve: 1 })
                .populate('atletas');
            }
          }

          if (!campeonato) {
            return res.status(404).send('Campeonato não encontrado.');
          }

          res.render('site/campeonato', { campeonato });
        };

        this.inscricao = async (req, res) => {
          const campeonatos = await Campeonato.find({}).sort({ dataEve: 1 });
          res.render('site/inscricao', {
            campeonatos,
            campeonatoSelecionado: req.query.campeonato || ''
          });
        };

        this.registrar = async (req, res) => {
          const campeonato = await Campeonato.findById(req.body.campeonato);

          if (!campeonato) {
            return res.status(400).send('Selecione um campeonato válido.');
          }

          const atleta = await Atleta.create({
            nome: req.body.nome,
            dataNasc: req.body.nascimento,
            equipe: req.body.equipe,
            categoria: req.body.categoria,
            foto: req.file?.buffer
          });

          campeonato.atletas.addToSet(atleta._id);
          await campeonato.save();

          res.redirect(`/site/campeonato/${campeonato._id}#atletas`);
        };

        this.sucesso = (req, res) => {
          res.render('site/sucesso');
        };
    }
}